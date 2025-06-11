CREATE TABLE "reservation" (
    "uuid" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    "carowner_uuid" VARCHAR(36) NOT NULL,
    "customer_uuid" VARCHAR(36) NOT NULL,
    "start_date" TIMESTAMP NOT NULL,
    "end_date" TIMESTAMP NOT NULL,
    "rental_amount" NUMERIC NOT NULL,
    "penalty_amount" NUMERIC DEFAULT 0,
    "status" TEXT CHECK ("status" IN ('pending', 'confirmed', 'cancelled', 'completed')) NOT NULL,
    "created_at" TIMESTAMP DEFAULT now(),
    FOREIGN KEY ("carowner_uuid") REFERENCES "users" ("uuid") ON DELETE CASCADE,
    FOREIGN KEY ("customer_uuid") REFERENCES "users" ("uuid") ON DELETE CASCADE
);
