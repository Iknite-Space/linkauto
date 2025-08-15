package handler

import (
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/jackc/pgx/v5/pgtype"
)

type CarRequest struct {
	Car        repo.CreateCarParams
	CarDetails repo.CreateCarDetailsParams
}

type CarListingsResponse struct {
	Uuid             string         `json:"id"`
	Name             string         `json:"name"`
	TransmissionType string         `json:"transmission"`
	NoSeats          *int32         `json:"no_seats"`
	EnergyType       string         `json:"energy_type"`
	Brand            string         `json:"brand"`
	PricePerDay      pgtype.Numeric `json:"pricePerDay"`
	Images           []string       `json:"images"`
}

// reservation request
type CreateReservationParamsJSON struct {
	CarUuid      *string `json:"car_uuid"`
	CustomerUuid string  `json:"customer_uuid"`
	StartDate    string  `json:"start_date"`   // YYYY-MM-DD
	EndDate      string  `json:"end_date"`     // YYYY-MM-DD
	PickupTime   string  `json:"pickup_time"`  // HH:MM:SS
	DropoffTime  string  `json:"dropoff_time"` // HH:MM:SS
	RentalAmount float64 `json:"rental_amount"`
}

type CreatePaymentParamsJSON struct {
	RentalUuid    *string `json:"rental_uuid"`
	AmountPaid    float64 `json:"amount_paid"`
	PaymentMethod string  `json:"payment_method"`
	Reference     string  `json:"reference"`
	Status        string  `json:"status"`
}

type ReservationRequestJSON struct {
	Phone              string                      `json:"phone"`
	Amount             string                      `json:"amount"`
	Description        string                      `json:"description"`
	ReservationDetails CreateReservationParamsJSON `json:"reservationDetails"`
	PaymentDetails     CreatePaymentParamsJSON     `json:"paymentDetails"`
}
