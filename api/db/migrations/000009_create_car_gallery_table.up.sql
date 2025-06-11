CREATE TABLE "car_gallery" (
    "uuid" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    "car_uuid" VARCHAR(36) NOT NULL,
    "image" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP DEFAULT now(),
    FOREIGN KEY ("car_uuid") REFERENCES "car" ("uuid") ON DELETE CASCADE
);
