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

-- name: GetCarListings :many
SELECT c.uuid,cd.name,cd.transmission_type,cd.no_seats,cd.energy_type,cd.brand,cd.price_per_day FROM car c
JOIN car_details cd ON c.uuid = cd.car_uuid
JOIN reservation r ON c.uuid = r.car_uuid
-- WHERE c.visibility = 'approved' AND r.status NOT IN ('completed')
ORDER BY cd.date_added;

-- name: GetCarListingImages :many
SELECT image FROM car_gallery WHERE car_uuid = $1
LIMIT 2; 

-- name: GetCarDetails :one
SELECT c.uuid,c.pickup_location,r.status,c.dropoff_location,cd.name,
cd.model,cd.energy_type,cd.transmission_type,cd.brand,cd.no_seats,
cd.color,cd.chassis_no,cd.vin,cd.price_per_day FROM car c
JOIN car_details cd ON c.uuid = cd.car_uuid
JOIN reservation r ON c.uuid = r.car_uuid
WHERE c.uuid = $1;

-- name: GetCarImages :many
SELECT image FROM car_gallery WHERE car_uuid = $1;

-- name: GetCarPendingVerifications :many
SELECT 
  CONCAT(u.fname, ' ', u.lname) AS owner_name,
  c.uuid,
  c.visibility,
  cd.name
FROM "user" u
JOIN car c ON u.uuid::TEXT = c.owner_uuid
JOIN car_details cd ON c.uuid = cd.car_uuid
WHERE c.visibility = 'pending';

-- name: GetCarVerificationDetails :one
SELECT 
  u.uuid AS user_uuid,
  CONCAT(u.fname, ' ', u.lname) AS name,
  u.gender,
  cd.cat_doc,
  cd.visite_technique_doc,
  cd.insurance_doc
FROM "car" c
JOIN "user" u ON u.uuid = c.owner_uuid
JOIN car_details cd ON c.uuid = cd.car_uuid
WHERE c.uuid = $1;

-- name: UpdateCarVerificationStatus :exec
UPDATE car SET visibility = $1 WHERE uuid = $2;

-- name: CreateReservation :one
INSERT INTO reservation (car_uuid,customer_uuid,start_date,end_date,pickup_time,dropoff_time,rental_amount
) VALUES ($1, $2, $3, $4, $5, $6, $7)
RETURNING uuid;

-- name: CreatePayment :one
INSERT INTO payment (rental_uuid,amount_paid,payment_method,reference
) VALUES ($1, $2, $3, $4)
RETURNING uuid;

-- name: UpdateReservationStatus :exec
UPDATE reservation
SET status = $2
WHERE uuid = $1;
-- name: UpdatePaymentStatus :exec
UPDATE payment
SET status = $2
WHERE uuid = $1;

-- name: DeleteReservation :exec
DELETE FROM reservation WHERE uuid = $1;

-- name: DeletePayment :exec
DELETE FROM payment WHERE uuid = $1;

-- name: GetCustomerReservationDetails :many
SELECT 
CONCAT(owner.fname, ' ', owner.lname) AS owner_name,
CONCAT(customer.fname, ' ', customer.lname) AS customer_name,
customer.uuid AS user_uuid,
cd.name AS car_name,
r.start_date,
r.end_date,
r.rental_amount,
r.status
FROM reservation r
JOIN car c ON c.uuid = r.car_uuid
JOIN car_details cd ON cd.car_uuid = c.uuid
JOIN "user" owner ON owner.uuid = c.owner_uuid
JOIN "user" customer ON customer.uuid = r.customer_uuid
WHERE r.customer_uuid = $1;

-- name: GetCustomerPaymentDetails :many
SELECT 
  CONCAT(customer.fname, ' ', customer.lname) AS customer_name,
  customer.uuid AS user_uuid,
  p.amount_paid,
  p.payment_method,
  p.reference,
  p.date_paid,
  p.status AS payment_status,
  cd.name AS car_name
FROM payment p
JOIN reservation r ON r.uuid = p.rental_uuid
JOIN car c ON c.uuid = r.car_uuid
JOIN "user" customer ON customer.uuid = r.customer_uuid
LEFT JOIN car_details cd ON cd.car_uuid = c.uuid
WHERE customer.uuid = $1;

-- name: GetAllUploadedCars :many 
SELECT name,model,visibility,status,pickup_location,dropoff_location,price_per_day,date_added
FROM car c
JOIN car_details cd ON c.uuid = cd.car_uuid
JOIN "user" u ON u.uuid = c.owner_uuid
WHERE u.uuid = $1;

-- name: GetAllPayments :many
SELECT 
  CONCAT(customer.fname, ' ', customer.lname) AS customer_name,
  customer.uuid AS user_uuid,
  p.amount_paid,
  p.payment_method,
  p.reference,
  p.date_paid,
  p.status AS payment_status,
  cd.name AS car_name
FROM payment p
JOIN reservation r ON r.uuid = p.rental_uuid
JOIN car c ON c.uuid = r.car_uuid
JOIN "user" customer ON customer.uuid = r.customer_uuid
LEFT JOIN car_details cd ON cd.car_uuid = c.uuid
ORDER BY p.date_paid DESC;

-- name: GetCarOwnerPayments :many
SELECT 
  CONCAT(customer.fname, ' ', customer.lname) AS customer_name,
  customer.uuid AS customer_uuid,
  owner.uuid AS owner_uuid,
  CONCAT(owner.fname, ' ', owner.lname) AS owner_name,
  p.amount_paid,
  p.payment_method,
  p.reference,
  p.date_paid,
  p.status AS payment_status,
  cd.name AS car_name
FROM payment p
JOIN reservation r ON r.uuid = p.rental_uuid
JOIN car c ON c.uuid = r.car_uuid
JOIN "user" customer ON customer.uuid = r.customer_uuid   -- the one renting
JOIN "user" owner ON owner.uuid = c.owner_uuid            -- the one who uploaded
LEFT JOIN car_details cd ON cd.car_uuid = c.uuid
WHERE owner.uuid = $1
ORDER BY p.date_paid DESC;


-- name: GetReservations :many
SELECT
CONCAT(owner.fname, ' ', owner.lname) AS owner_name,
CONCAT(customer.fname, ' ', customer.lname) AS customer_name,
r.status,
r.created_at AS date_created
FROM reservation r
JOIN car c ON c.uuid = r.car_uuid
JOIN "user" owner ON owner.uuid = c.owner_uuid
JOIN "user" customer ON customer.uuid = r.customer_uuid;

-- name: MakeAdmin :exec
UPDATE
"user"
SET role = 'admin'
WHERE email = 'brandonichami@gmail.com';
