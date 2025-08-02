package handler

import "github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"

type CarRequest struct {
	Car        repo.CreateCarParams
	CarDetails repo.CreateCarDetailsParams
}
