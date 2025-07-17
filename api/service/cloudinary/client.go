package cloudinary

import (
	"bytes"
	"encoding/json"
	"errors"
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
	defer file.Close()
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

	writer.Close()

	//make new request
	resp, err := http.Post(c.Client.BaseURL+"/upload", writer.FormDataContentType(), body)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", errors.New("cloudinary upload failed: " + resp.Status)
	}

	var response Response
	if err := json.NewDecoder(resp.Body).Decode(&response); err != nil {
		return "", err
	}

	return response.SecureURL, nil
}
