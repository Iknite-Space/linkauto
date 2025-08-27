package api

import (
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/api/handler"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/Iknite-Space/c4-project-boilerplate/api/service/campay"
	"github.com/Iknite-Space/c4-project-boilerplate/api/service/cloudinary"
	"github.com/gin-gonic/gin"
)

type MessageHandler struct {
	store      store.Store
	campay     *campay.Client
	cloudinary *cloudinary.Client
}

func NewMessageHandler(store store.Store, campay *campay.Client, cloudinary *cloudinary.Client) *MessageHandler {
	return &MessageHandler{
		store:      store,
		campay:     campay,
		cloudinary: cloudinary,
	}
}

func (h *MessageHandler) WireHttpHandler() http.Handler {

	r := gin.Default()
	r.Use(gin.CustomRecovery(func(c *gin.Context, _ any) {
		c.String(http.StatusInternalServerError, "Internal Server Error: panic")
		c.AbortWithStatus(http.StatusInternalServerError)
	}))

	authHandler := handler.NewAuthHandler(h.store)
	verHandler := handler.NewVerHandler(h.store, h.cloudinary)
	userHandler := handler.NewUserHandler(h.store)
	carHandler := handler.NewCarHandler(h.store, h.cloudinary)
	reservationHandler := handler.NewResHandler(h.store, h.campay)

	//routes
	r.GET("//healthcheck", h.handleHealthcheck)
	r.POST("/register", authHandler.Register)
	r.POST("/login", authHandler.Login)
	r.POST("/user-verification", verHandler.UploadUserVerificationDocs)
	r.GET("/users/pending-verification", userHandler.GetUserPendingVer)
	r.GET("/user-verification/:user_uuid", userHandler.GetSingleUserVerification)
	r.PATCH("/user-verification", userHandler.UpdateUserVerificationStatus)
	r.GET("/all-users", userHandler.GetActiveUsers)

	r.POST("/car", carHandler.UploadCar)
	r.GET("/carlistings", carHandler.CarListings)
	r.GET("/cardetails/:id", carHandler.CarDetails)

	r.GET("/cars/pending-verification", carHandler.GetCarPendingVer)

	r.GET("/car-verification/:car_uuid", carHandler.GetCarVerificationDocs)
	r.PATCH("/car-verification", carHandler.UpdateUserVerificationStatus)
	r.GET("/uploaded-cars", carHandler.GetAllOwnerCars)

	//reservation
	r.POST("/reservation", reservationHandler.CreateReservation)
	r.GET("/reservation/:ref", reservationHandler.Status)
	//all payments irrespective of user role
	r.GET("/payments", userHandler.AllPayments)
	r.GET("/customer-reservations/:customer_uuid", reservationHandler.CustomerReservations)
	//payment
	r.GET("/customer-payments/:customer_uuid", reservationHandler.CustomerPaymentDetails)
	//admin
	r.GET("/reservations", reservationHandler.Reservations)
	r.PATCH("/make-admin", userHandler.MakeAdmin)

	return r
}

func (h *MessageHandler) handleHealthcheck(c *gin.Context) {
	c.String(http.StatusOK, "ok")
}
