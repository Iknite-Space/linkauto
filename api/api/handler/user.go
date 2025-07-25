package handler

import (
	"fmt"
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/gin-gonic/gin"
)

type UserHandler struct {
	store store.Store
}

func NewUserHandler(store store.Store) *UserHandler {
	return &UserHandler{
		store: store,
	}
}

func (h *UserHandler) GetUserPendingVer(c *gin.Context) {
	users, err := h.store.Do().GetUsersPendingVerification(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve users pending verification: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"users":   users,
	})
}

func (h *UserHandler) GetSingleUserVerification(c *gin.Context) {
	userUuid := c.Param("user_uuid")
	if userUuid == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user_uuid is required"})
		return
	}

	user, err := h.store.Do().GetUserVerificationDetails(c, userUuid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user verification: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"user":    user,
	})
}

func (h *UserHandler) UpdateUserVerificationStatus(c *gin.Context) {
	var req repo.UpdateUserVerificationStatusParams

	//confirm the submitted request body
	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//fetch the current user
	currentUser, err := h.store.Do().GetUserByUuid(c, req.Uuid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user: " + err.Error()})
		fmt.Println("Error fetching user:", err)
		return
	}

	//only allow update if current user is pending verification
	if currentUser.AccountStatus != "pending" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"message": "User is not in pending verification status, current account status: " + currentUser.AccountStatus,
		})
		return
	}

	//proceed to update the user verification status
	if err := h.store.Do().UpdateUserVerificationStatus(c, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user verification status: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "User verification status updated successfully",
	})
}
