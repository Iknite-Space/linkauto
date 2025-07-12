package cloudinary

import "github.com/Iknite-Space/c4-project-boilerplate/api/client"

type Client struct {
	Client *client.Client
}

func New(baseURL string) *Client {
	return &Client{
		Client: client.NewClient(baseURL),
	}
}
