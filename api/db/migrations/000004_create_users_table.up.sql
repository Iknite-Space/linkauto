CREATE TABLE "users" (
    "uuid" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT UNIQUE NOT NULL,
    "gender" TEXT CHECK ("gender" IN ('male', 'female')),
    "phone" VARCHAR(36),
    "zip_code" VARCHAR(36),
    "city" TEXT,
    "street" VARCHAR(36),
    "region" TEXT CHECK ("region" IN ('north', 'south', 'east', 'west')),
    "profile_photo" TEXT,
    "role" TEXT CHECK ("role" IN ('user', 'admin', 'staff')),
    "account_status" TEXT CHECK ("account_status" IN ('active', 'inactive', 'banned')),
    "created_at" TIMESTAMP DEFAULT now()
);
