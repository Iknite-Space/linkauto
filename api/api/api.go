package api

import (
	"fmt"
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/db/repo"
	"github.com/Iknite-Space/c4-project-boilerplate/api/db/store"
	"github.com/Iknite-Space/c4-project-boilerplate/api/service/campay"
	"github.com/Iknite-Space/c4-project-boilerplate/api/service/cloudinary"
	"github.com/gin-gonic/gin"
)

type MessageHandler struct {
	querier    store.Store
	campay     *campay.Client
	cloudinary *cloudinary.Client
}

func NewMessageHandler(querier store.Store, campay *campay.Client, cloudinary *cloudinary.Client) *MessageHandler {
	return &MessageHandler{
		querier:    querier,
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

	r.GET("//healthcheck", h.handleHealthcheck)
	r.POST("/register", h.handleCreateUser)
	r.POST("/login", h.handleLogin)
	r.POST("/user-verification", h.handleUploadVerificationDocs)
	r.GET("/users/pending-verification", h.handleGetUsersPendingVerification)
	r.GET("/user-verification/:user_uuid", h.handleGetSingleUserVerification)
	r.PATCH("/user-verification", h.handleUpdateUserVerificationStatus)

	return r
}

func (h *MessageHandler) handleHealthcheck(c *gin.Context) {
	c.String(http.StatusOK, "ok")
}

func (h *MessageHandler) handleCreateUser(c *gin.Context) {
	var req repo.CreateUserParams

	//confirm the submitted request body
	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//insert the new user to db
	email, err := h.querier.Do().CreateUser(c, req)
	if err != nil {
		fmt.Println("CreateUser error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"email":   email,
	})
}

type loginParam struct {
	Email string `json:"email"`
}

func (h *MessageHandler) handleLogin(c *gin.Context) {
	var req loginParam

	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	user, err := h.querier.Do().GetUserByEmail(c, req.Email)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"user":    user,
	})
}

// upload verification documents
func (h *MessageHandler) handleUploadVerificationDocs(c *gin.Context) {
	//check if user already submitted verification document
	existing, err := h.querier.Do().GetVerificationByUserUuid(c, c.PostForm("user_uuid"))
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
	if err := h.querier.Do().UploadVerificationDocs(c, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload verification documents: " + err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Verification documents uploaded successfully",
	})
}

// get users pending verification
func (h *MessageHandler) handleGetUsersPendingVerification(c *gin.Context) {
	users, err := h.querier.Do().GetUsersPendingVerification(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve users pending verification: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"users":   users,
	})
}

// get single user verification details
func (h *MessageHandler) handleGetSingleUserVerification(c *gin.Context) {
	userUuid := c.Param("user_uuid")
	if userUuid == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user_uuid is required"})
		return
	}

	user, err := h.querier.Do().GetUserVerificationDetails(c, userUuid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user verification: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"user":    user,
	})
}

// update user verification status
func (h *MessageHandler) handleUpdateUserVerificationStatus(c *gin.Context) {
	var req repo.UpdateUserVerificationStatusParams

	//confirm the submitted request body
	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	//fetch the current user
	currentUser, err := h.querier.Do().GetUserByUuid(c, req.Uuid)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch user: " + err.Error()})
		return
	}

	//only allow update if current user is pending verification
	if currentUser.AccountStatus != "pending" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User is not in pending verification status, current account status: " + currentUser.AccountStatus})
		return
	}

	//proceed to update the user verification status
	if err := h.querier.Do().UpdateUserVerificationStatus(c, req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user verification status: " + err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "User verification status updated successfully",
	})
}
