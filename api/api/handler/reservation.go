package handler

import (
	"context"
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/Iknite-Space/c4-project-boilerplate/api/helpers"
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
	var req ReservationRequestJSON
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body"})
		return
	}

	//parse start and end date
	startDate, err := time.Parse("2006-01-02", req.ReservationDetails.StartDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid start date format"})
		return
	}
	endDate, err := time.Parse("2006-01-02", req.ReservationDetails.EndDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid end date format"})
		return
	}
	pickupPg, err := helpers.ParsePgTimeString(req.ReservationDetails.PickupTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	dropoffPg, err := helpers.ParsePgTimeString(req.ReservationDetails.PickupTime)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	rentalAmount, err := helpers.FloatToPgNumeric(req.ReservationDetails.RentalAmount)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid rental amount"})
		return
	}

	//insert reservation details
	reservationParams := repo.CreateReservationParams{
		CarUuid:      req.ReservationDetails.CarUuid,
		CustomerUuid: req.ReservationDetails.CustomerUuid,
		StartDate:    startDate,
		EndDate:      endDate,
		PickupTime:   pickupPg,
		DropoffTime:  dropoffPg,
		RentalAmount: rentalAmount,
	}

	// begin transaction
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

	// Create reservation
	reservationUuid, err := q.CreateReservation(c, reservationParams)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create reservation", "details": err.Error()})
		return
	}
	// //now initiate the campay payment
	ref, err := h.campay.RequestPayment(req.Phone, req.Amount, req.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to initiate payment", "details": err.Error()})
		return
	}

	//format payment param
	pamentParam := repo.CreatePaymentParams{
		RentalUuid:    &reservationUuid,
		AmountPaid:    rentalAmount,
		PaymentMethod: req.PaymentDetails.PaymentMethod,
		Reference:     ref,
	}

	//initial payment creation
	payment_uuid, err := q.CreatePayment(c, pamentParam)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create payment", "details": err.Error()})
		return
	}
	//commit transaction before starting async process
	if err := tx.Commit(c); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to commit transaction", "details": err.Error()})
		return
	}
	//respond to frontend immediately
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"ref":     ref,
	})

	//async go routine to check payment status
	//and update reservation/payment status or delete the reservation if payment fails
	go func() {
		maxWait := 1 * time.Minute          // maximum wait time for payment confirmation of 2 minutes
		checkInterval := 10 * time.Second   // check every 10 seconds
		deadline := time.Now().Add(maxWait) // set deadline for payment confirmation

		for time.Now().Before(deadline) {
			status, err := h.campay.TransactionStatus(ref)
			if err != nil {
				fmt.Println("error checking payment status:", err)
				time.Sleep(checkInterval)
				continue
			}

			ctx := context.Background()

			switch status {
			case "SUCCESSFUL":
				// update reservation and payment status to confirmed
				if err := h.store.Do().UpdateReservationStatus(ctx, repo.UpdateReservationStatusParams{
					Uuid:   reservationUuid,
					Status: "completed",
				}); err != nil {
					fmt.Println("error updating reservation status:", err)
				}
				if err := h.store.Do().UpdatePaymentStatus(ctx, repo.UpdatePaymentStatusParams{
					Uuid:   payment_uuid,
					Status: "completed",
				}); err != nil {
					fmt.Println("error updating payment status:", err)
				}
				return

			case "FAILED":
				// update the reservation and payment to cancelled/failed
				if err := h.store.Do().UpdateReservationStatus(ctx, repo.UpdateReservationStatusParams{
					Uuid:   reservationUuid,
					Status: "cancelled",
				}); err != nil {
					fmt.Println("error updating reservation status:", err)
				}
				if err := h.store.Do().UpdatePaymentStatus(ctx, repo.UpdatePaymentStatusParams{
					Uuid:   payment_uuid,
					Status: "failed",
				}); err != nil {
					fmt.Println("error updating payment status:", err)
				}
				fmt.Println("payment failed, reservation and payment updated to cancelled/failed")
				return
			}

			time.Sleep(checkInterval) // wait before next check
		}

		//timeout reached, delete reservation and payment
		ctx := context.Background()
		// update the reservation and payment to cancelled/failed
		if err := h.store.Do().UpdateReservationStatus(ctx, repo.UpdateReservationStatusParams{
			Uuid:   reservationUuid,
			Status: "cancelled",
		}); err != nil {
			fmt.Println("error updating reservation status:", err)
		}
		if err := h.store.Do().UpdatePaymentStatus(ctx, repo.UpdatePaymentStatusParams{
			Uuid:   payment_uuid,
			Status: "failed",
		}); err != nil {
			fmt.Println("error updating payment status:", err)
		}
		//prin
		fmt.Println("payment confirmation timeout reached, reservation and payment deleted")
	}()

}

// transaction status handler
func (h *ReservationHandler) Status(c *gin.Context) {
	ref := c.Param("ref")
	if ref == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Reference is required"})
		return
	}

	status, err := h.campay.TransactionStatus(ref)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check payment status", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"status":  status,
	})
}

func (h *ReservationHandler) CustomerReservations(c *gin.Context) {
	customerUuid := c.Param("customer_uuid")
	if customerUuid == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer UUID is required"})
		return
	}

	reservations, err := h.store.Do().GetCustomerReservationDetails(c, customerUuid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch reservations", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":       true,
		"reservations":  reservations,
	})
}

func (h *ReservationHandler) CustomerPaymentDetails(c *gin.Context) {
	customerUuid := c.Param("customer_uuid")
	if customerUuid == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer UUID is required"})
		return
	}

	payments, err := h.store.Do().GetCustomerPaymentDetails(c, customerUuid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch payment details", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success":  true,
		"payments": payments,
	})
}
