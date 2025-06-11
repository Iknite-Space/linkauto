CREATE TABLE "car" (
    "uuid" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    "owner_uuid" VARCHAR(36) NOT NULL,
    "pickup_location" VARCHAR(36) NOT NULL,
    "dropoff_location" VARCHAR(36) NOT NULL,
    "status" TEXT CHECK ("status" IN ('available', 'booked', 'unavailable')),
    FOREIGN KEY ("owner_uuid") REFERENCES "users"("uuid") ON DELETE CASCADE
);
