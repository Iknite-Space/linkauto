package handler

import (
	"database/sql"
	"fmt"
	"mime/multipart"
	"net/http"
	"strconv"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/Iknite-Space/c4-project-boilerplate/api/service/cloudinary"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx/v5/pgtype"
)

type CarHandler struct {
	store      store.Store
	cloudinary *cloudinary.Client
}

func NewCarHandler(store store.Store, cloudinary *cloudinary.Client) *CarHandler {
	return &CarHandler{
		store:      store,
		cloudinary: cloudinary,
	}
}

func (h *CarHandler) UploadCar(c *gin.Context) {
	// Parse multipart form data (10 MB max)
	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form data"})
		return
	}

	// ----------- Upload single files ----------
	catFile, catHeader, err := c.Request.FormFile("cat_doc")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve cat_doc"})
		return
	}
	defer func() {
		if err := catFile.Close(); err != nil {
			fmt.Println("warning: failed to close cat_doc file:", err)
		}
	}()
	catURL, err := h.cloudinary.UploadFile(catFile, catHeader, "car-cat")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload cat_doc: " + err.Error()})
		return
	}

	visiteFile, visiteHeader, err := c.Request.FormFile("visite_technique_doc")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve visite_technique_doc"})
		return
	}
	defer func() {
		if err := visiteFile.Close(); err != nil {
			fmt.Println("warning: failed to close visite_technique_doc file:", err)
		}
	}()
	visiteURL, err := h.cloudinary.UploadFile(visiteFile, visiteHeader, "visite_technique_doc")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload visite_technique_doc: " + err.Error()})
		return
	}

	insFile, insHeader, err := c.Request.FormFile("insurance_doc")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve insurance_doc"})
		return
	}
	defer func() {
		if err := insFile.Close(); err != nil {
			fmt.Println("warning: failed to close insurance_doc file:", err)
		}
	}()
	insURL, err := h.cloudinary.UploadFile(insFile, insHeader, "insurance_doc")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload insurance_doc: " + err.Error()})
		return
	}

	// ----------- Upload multiple gallery images ------------
	files := c.Request.MultipartForm.File["car_gallery"]
	var galleryUrls []string

	for i, fileHeader := range files {
		err := func(i int, fh *multipart.FileHeader) error {
			file, err := fh.Open()
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Failed to open car_gallery[%d]: %v", i, err)})
				return err
			}
			defer func() {
				if err := file.Close(); err != nil {
					fmt.Printf("warning: failed to close car_gallery[%d]: %v\n", i, err)
				}
			}()

			url, err := h.cloudinary.UploadFile(file, fh, "car_gallery")
			if err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Failed to upload car_gallery[%d]: %v", i, err)})
				return err
			}
			galleryUrls = append(galleryUrls, url)
			return nil
		}(i, fileHeader)

		if err != nil {
			return
		}
	}

	// ----------- Parse the rest of form fields manually ------------
	var req CarRequest
	req.Car.OwnerUuid = c.PostForm("owner_uuid")
	req.Car.PickupLocation = c.PostForm("pickup_location")
	req.Car.DropoffLocation = c.PostForm("dropoff_location")

	req.CarDetails.Name = c.PostForm("name")
	req.CarDetails.Model = c.PostForm("model")
	req.CarDetails.EnergyType = c.PostForm("energy_type")
	req.CarDetails.TransmissionType = c.PostForm("transmission_type")
	req.CarDetails.Brand = c.PostForm("brand")
	req.CarDetails.Color = c.PostForm("color")
	req.CarDetails.ChassisNo = c.PostForm("chassis_no")
	req.CarDetails.Vin = c.PostForm("vin")
	req.CarDetails.CatDoc = catURL
	req.CarDetails.VisiteTechniqueDoc = visiteURL
	req.CarDetails.InsuranceDoc = insURL

	if noSeatsStr := c.PostForm("no_seats"); noSeatsStr != "" {
		if noSeats, err := strconv.Atoi(noSeatsStr); err == nil {
			tmp := int32(noSeats)
			req.CarDetails.NoSeats = &tmp
		}
	}

	if priceStr := c.PostForm("price_per_day"); priceStr != "" {
		var price pgtype.Numeric
		if err := price.Scan(priceStr); err == nil {
			req.CarDetails.PricePerDay = price
		}
	}

	// ---------- Begin Transaction ----------
	q, tx, err := h.store.Begin(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to begin transaction"})
		return
	}
	defer func() {
		if err := tx.Rollback(c); err != nil && err != sql.ErrTxDone {
			fmt.Println("warning: failed to rollback transaction:", err)
		}
	}()

	car_uuid, err := q.CreateCar(c, req.Car)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to add car", "details": err.Error()})
		return
	}

	req.CarDetails.CarUuid = car_uuid
	if err := q.CreateCarDetails(c, req.CarDetails); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to add car details", "details": err.Error()})
		return
	}

	for _, imgURL := range galleryUrls {
		if err := q.UploadCarImage(c, repo.UploadCarImageParams{
			CarUuid: car_uuid,
			Image:   imgURL,
		}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save gallery image", "details": err.Error()})
			return
		}
	}

	if err := tx.Commit(c); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to commit transaction", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Car uploaded successfully and awaiting admin approval"})
}

func (h *CarHandler) CarListings(c *gin.Context) {
	// Step 1: Get all approved car listings
	carRows, err := h.store.Do().GetCarListings(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var listings []CarListingsResponse

	// Step 2: For each car, fetch its first two images
	for _, car := range carRows {
		images, err := h.store.Do().GetCarListingImages(c, car.Uuid)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// Extract image strings from the result
		var imageUrls []string
		imageUrls = append(imageUrls, images...)

		listings = append(listings, CarListingsResponse{
			Uuid:             car.Uuid,
			Name:             car.Name,
			TransmissionType: car.TransmissionType,
			NoSeats:          car.NoSeats,
			EnergyType:       car.EnergyType,
			Brand:            car.Brand,
			PricePerDay:      car.PricePerDay,
			Images:           imageUrls,
		})
	}

	// Step 3: Return the listings
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"cars":    listings,
	})
}

func (h *CarHandler) CarDetails(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	//get the car details
	cardetails, err := h.store.Do().GetCarDetails(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	carimages, err := h.store.Do().GetCarImages(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":      true,
		"cardetails":   cardetails,
		"carimageurls": carimages,
	})

}

func (h *CarHandler) GetCarPendingVer(c *gin.Context) {
	// Fetch all cars pending verification
	cars, err := h.store.Do().GetCarPendingVerifications(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pending car verifications: " + err.Error()})
		return
	}

	if len(cars) == 0 {
		c.JSON(http.StatusOK, gin.H{"message": "No cars pending verification"})


func (h *CarHandler) GetCarVerificationDocs(c *gin.Context) {
	carUuid := c.Param("car_uuid")
	if carUuid == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "car_uuid is required"})
		return
	}

	//fetch the car verification docs
	carVerDocs, err := h.store.Do().GetCarVerificationDetails(c, carUuid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve car verification documents: " + err.Error()})

		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,

		"cars":    cars,
	})
}

		"docs":    carVerDocs,
	})
}	

