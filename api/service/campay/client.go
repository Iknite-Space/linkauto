package campay

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Iknite-Space/c4-project-boilerplate/api/client"
)

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

func (c *Client) RequestPayment(number, amount, description string) (string, error) {
	//format the request body
	paymentRequest := PaymentRequest{
		Amount:      amount,
		Currency:    "XAF",
		From:        "237" + number,
		Description: description,
	}

	//encode/convert the go request struct into json format
	reqBody, err := json.Marshal(paymentRequest)
	if err != nil {
		return "", err
	}
	//post request
	req, err := http.NewRequest("POST", c.Client.BaseURL+"/collect/", bytes.NewBuffer(reqBody))
	if err != nil {
		return "", err
	}

	// Use standard http.Client
	httpClient := &http.Client{}

	//set the headers
	req.Header.Set("Authorization", "Token "+c.Token)
	req.Header.Set("Content-Type", "application/json")

	//execute the request
	resp, err := httpClient.Do(req)
	if err != nil {
		return "", err
	}
	defer func() {
		if err := resp.Body.Close(); err != nil {
			fmt.Println("warning: failed to close response body:", err)
		}
	}()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("failed to initiate payment: %s", resp.Status)
	}

	var res PaymentResponse
	if err := json.NewDecoder(resp.Body).Decode(&res); err != nil {
		return "", err
	}

	return res.Reference, nil
}
