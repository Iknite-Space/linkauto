-- name: CreateUser :one
INSERT INTO "user" (fname,lname,email,gender,phone,zip_code,city,street,region,role)
VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9,$10)
RETURNING email;

-- name: GetUserByUuid :one
SELECT Uuid,account_status FROM "user" WHERE uuid = $1;

-- name: GetUserByEmail :one
SELECT Uuid,email,lname,role,account_status FROM "user" WHERE email = $1;

-- name: UploadVerificationDocs :exec
INSERT INTO verification (user_uuid, verification_type, ver_doc1_url,ver_doc2_url)
VALUES ($1, $2, $3, $4);

-- name: GetVerificationByUserUuid :one
SELECT * FROM verification WHERE user_uuid = $1 LIMIT 1;

-- name: GetUsersPendingVerification :many
SELECT 
  u.uuid,
  CONCAT(u.fname, ' ', u.lname) AS name,
  u.account_status AS status,
  u.email,
  u.role
FROM "user" u
INNER JOIN verification v ON v.user_uuid = u.uuid
WHERE u.account_status = 'pending';

-- name: GetUserVerificationDetails :one
SELECT 
    u.uuid AS user_uuid,
    CONCAT(u.fname, ' ', u.lname) AS name,
    u.gender,
    v.verification_type,
    v.ver_doc1_url,
    v.ver_doc2_url
FROM "user" u
JOIN verification v ON u.uuid = v.user_uuid
WHERE u.uuid = $1;

-- name: UpdateUserVerificationStatus :exec
UPDATE "user"
SET account_status = $1
WHERE uuid = $2;

-- name: CreateCar :one
INSERT INTO "car" (owner_uuid,pickup_location,dropoff_location)
VALUES($1,$2,$3)
RETURNING uuid;

-- name: CreateCarDetails :exec
INSERT INTO "car_details" (car_uuid,name,model,energy_type,transmission_type,brand,no_seats,color,chassis_no,vin,price_per_day,cat_doc,visite_technique_doc,insurance_doc)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);

-- name: UploadCarImage :exec
INSERT INTO "car_gallery" (car_uuid,image)
VALUES ($1,$2);