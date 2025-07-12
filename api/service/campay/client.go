package campay

import "github.com/Iknite-Space/c4-project-boilerplate/api/client"

type Client struct {
	Token  string
	Client *client.Client
}

func New(baseURL, token string) *Client {
	return &Client{
		Token:  token,
		Client: client.NewClient(baseURL),
	}
}
