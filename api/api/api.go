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

	//routes
	r.GET("//healthcheck", h.handleHealthcheck)
	r.POST("/register", authHandler.Register)
	r.POST("/login", authHandler.Login)
	r.POST("/user-verification", verHandler.UploadUserVerificationDocs)
	r.GET("/users/pending-verification", userHandler.GetUserPendingVer)
	r.GET("/user-verification/:user_uuid", userHandler.GetSingleUserVerification)
	r.PATCH("/user-verification", userHandler.UpdateUserVerificationStatus)

	r.POST("/car", carHandler.UploadCar)
	r.GET("/carlistings", carHandler.CarListings)
	r.GET("/cardetails/:id", carHandler.CarDetails)
	r.GET("/cars/pending-verification", carHandler.GetCarPendingVer)

	return r
}

func (h *MessageHandler) handleHealthcheck(c *gin.Context) {
	c.String(http.StatusOK, "ok")
}
