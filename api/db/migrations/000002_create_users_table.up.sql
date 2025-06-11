CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY,
    "email" TEXT UNIQUE NOT NULL,
    "username" TEXT,
    "phone_number" TEXT,
    "created_at" TIMESTAMP DEFAULT now()
);