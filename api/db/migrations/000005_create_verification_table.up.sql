CREATE TABLE "verification" (
    "uuid" VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    "user_uuid" VARCHAR(36) NOT NULL,
    "verification_type" TEXT CHECK ("verification_type" IN ('passport', 'license', 'national_id')),
    "ver_doc1" TEXT,
    "ver_doc2" TEXT,
    FOREIGN KEY ("user_uuid") REFERENCES users("uuid") ON DELETE CASCADE
);
