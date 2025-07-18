-- name: CreateUser :one
INSERT INTO "user" (fname,lname,email,gender,phone,zip_code,city,street,region,role)
VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)
RETURNING email;

-- name: GetUserByEmail :one
SELECT Uuid,email,lname,role,account_status FROM "user" WHERE email = $1;

-- name: UploadVerificationDocs :exec
INSERT INTO verification (user_uuid, verification_type, ver_doc1_url,ver_doc2_url)
VALUES ($1, $2, $3, $4);

-- name: GetVerificationByUserUuid :one
SELECT * FROM verification WHERE user_uuid = $1 LIMIT 1;

-- name: GetUsersPendingVerification :many
SELECT Uuid, CONCAT(fname, ' ', lname) AS name, account_status AS status, email,role FROM "user"
WHERE account_status = 'pending';