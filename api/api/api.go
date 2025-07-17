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
	// r.POST("/message", h.handleCreateMessage)
	// r.GET("/message/:id", h.handleGetMessage)
	// r.DELETE("/message/:id", h.handleDeleteMessage)
	// r.GET("/thread/:id/messages", h.handleGetThreadMessages)

	return r
}

func (h *MessageHandler) handleHealthcheck(c *gin.Context) {
	c.String(http.StatusOK, "ok")
}

// func (h *MessageHandler) handleCreateMessage(c *gin.Context) {
// 	var req repo.CreateMessageParams
// 	err := c.ShouldBindBodyWithJSON(&req)
// 	if err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	message, err := h.querier.Do().CreateMessage(c, req)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, message)
// }

// func (h *MessageHandler) handleGetMessage(c *gin.Context) {
// 	id := c.Param("id")
// 	if id == "" {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "id is required"})
// 		return
// 	}

// 	message, err := h.querier.Do().GetMessageByID(c, id)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, message)
// }

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
	//parse multipart form data
	if err := c.Request.ParseMultipartForm(10 << 20); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to parse form data"})
		return
	}

	//retrive the file from the form data
	file1, header, err := c.Request.FormFile("ver_doc1-url")
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
	uploadURL1, err := h.cloudinary.UploadFile(file1, header, "user_verification")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload ver_doc1: " + err.Error()})
		return
	}
	uploadURL2, err := h.cloudinary.UploadFile(file2, fileHeader, "user_verification")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to upload ver_doc2: " + err.Error()})
		return
	}

	//format the upload verification params
	req := repo.UploadVerificationDocsParams{
		UserUuid:         c.GetString("user_uuid"),
		VerificationType: c.GetString("verification_type"),
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
