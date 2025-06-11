CREATE TABLE "payment" (
    "uuid" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    "rental_uuid" VARCHAR(36) NOT NULL,
    "amount_paid" NUMERIC NOT NULL,
    "payment_method" TEXT NOT NULL CHECK ("payment_method" IN ('credit_card', 'debit_card', 'paypal', 'cash', 'bank_transfer')), 
    "reference" TEXT,
    "status" TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    "date_paid" TIMESTAMP DEFAULT now(),
    FOREIGN KEY ("rental_uuid") REFERENCES "reservation" ("uuid") ON DELETE CASCADE
);
