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

func (h *ReservationHandler) Status(c *gin.Context) {
	//d571df3b-4b29-4a51-beef-f51088350912
	ref := c.Param("ref")
	if ref == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ref must not be null"})
		return
	}
	status, err := h.campay.TransactionStatus(ref)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"status":  status,
	})
}
