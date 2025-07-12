package campay

type PaymentResponse struct {
	Reference string `json:"reference"`
}

type Reference struct {
	Status string `json:"status"`
}
