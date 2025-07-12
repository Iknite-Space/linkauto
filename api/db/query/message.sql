-- name: CreateUser :one
INSERT INTO "user" (fname,lname,email,gender,phone,zip_code,city,street,region,role)
VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)
RETURNING email;
