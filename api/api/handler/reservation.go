package handler

import (
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/Iknite-Space/c4-project-boilerplate/api/service/campay"
	"github.com/gin-gonic/gin"
)

type ReservationHandler struct {
	store  store.Store
	campay *campay.Client
}

func NewResHandler(store store.Store, campay *campay.Client) *ReservationHandler {
	return &ReservationHandler{
		store:  store,
		campay: campay,
	}
}

// create a new reservation
func (h *ReservationHandler) CreateReservation(c *gin.Context) {
	ref, err := h.campay.RequestPayment("653595434", "100", "test")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"ref":     ref,
	})
}
