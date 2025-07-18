package cloudinary

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/client"
)

type Client struct {
	Client *client.Client
}

func New(baseURL string) *Client {
	return &Client{
		Client: client.NewClient(baseURL),
	}
}

func (c *Client) UploadFile(file multipart.File, fileHeader *multipart.FileHeader, uploadPreset string) (string, error) {
	defer func() {
		if err := file.Close(); err != nil {
			fmt.Println("warning: failed to close uploaded file:", err)
		}
	}()

	body := &bytes.Buffer{}
	writer := multipart.NewWriter(body)

	// file field
	part, err := writer.CreateFormFile("file", fileHeader.Filename)
	if err != nil {
		return "", err
	}
	if _, err := io.Copy(part, file); err != nil {
		return "", err
	}

	// upload preset field
	if err := writer.WriteField("upload_preset", uploadPreset); err != nil {
		return "", err
	}

	if err := writer.Close(); err != nil {
		return "", err
	}

	//make new request
	resp, err := http.Post(c.Client.BaseURL+"/image/upload", writer.FormDataContentType(), body)
	if err != nil {
		return "", err
	}
	defer func() {
		if err := resp.Body.Close(); err != nil {
			fmt.Println("warning: failed to close response body:", err)
		}
	}()

	if resp.StatusCode != http.StatusOK {
		bodyBytes, _ := io.ReadAll(resp.Body)
		return "", fmt.Errorf("cloudinary upload failed: %s — %s", resp.Status, string(bodyBytes))
	}

	var response Response
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return "", err
	}

	return response.SecureURL, nil
}
