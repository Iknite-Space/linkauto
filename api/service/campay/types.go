package campay

type PaymentRequest struct {
	Amount      string `json:"amount"`
	Currency    string `json:"currency"`
	From        string `json:"from"`
	Description string `json:"description"`
}
type PaymentResponse struct {
	Reference string `json:"reference"`
}

type Reference struct {
	Status string `json:"status"`
}
