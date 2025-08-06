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
