package handler

import (
	"fmt"
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/Iknite-Space/c4-project-boilerplate/api/service/cloudinary"
	"github.com/gin-gonic/gin"
)

type VerHandler struct {
	store      store.Store
	cloudinary *cloudinary.Client
}

func NewVerHandler(store store.Store, cloudinary *cloudinary.Client) *VerHandler {
	return &VerHandler{
		store:      store,
		cloudinary: cloudinary,
	}
}

func (h *VerHandler) UploadUserVerificationDocs(c *gin.Context) {
	//check if user already submitted verification document
	existing, err := h.store.Do().GetVerificationByUserUuid(c, c.PostForm("user_uuid"))
	if err == nil && existing.UserUuid != "" {
		c.JSON(http.StatusConflict, gin.H{
			"success": false,
			"error":   "Verification documents have already been submitted for this user",
		})
		return
	}

	//parse multipart form data
	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form data"})
		return
	}

	//retrive the file from the form data
	file1, header, err := c.Request.FormFile("ver_doc1_url")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve ver_doc1"})
		return
	}
	defer func() {
		if err := file1.Close(); err != nil {
			// Log or ignore if non-critical
			fmt.Println("warning: failed to close file1:", err)
		}
	}()

	file2, fileHeader, err := c.Request.FormFile("ver_doc2_url")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to retrieve ver_doc2"})
		return
	}
	defer func() {
		if err := file2.Close(); err != nil {
			fmt.Println("warning: failed to close file2:", err)
		}
	}()

	//upload the file to cloudinary
	uploadURL1, err := h.cloudinary.UploadFile(file1, header, "user-verification")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload ver_doc1: " + err.Error()})
		fmt.Println("UploadFile error:", err.Error())
		return
	}
	uploadURL2, err := h.cloudinary.UploadFile(file2, fileHeader, "user-verification")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload ver_doc2: " + err.Error()})
		return
	}

	//format the upload verification params
	req := repo.UploadVerificationDocsParams{
		UserUuid:         c.PostForm("user_uuid"),
		VerificationType: c.PostForm("verification_type"),
		VerDoc1Url:       uploadURL1,
		VerDoc2Url:       uploadURL2,
	}

	//insert the verification docs to db
	if err := h.store.Do().UploadVerificationDocs(c, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload verification documents: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Verification documents uploaded successfully",
	})
}
