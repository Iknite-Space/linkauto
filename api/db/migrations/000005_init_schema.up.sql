-- Add pickup_time and dropoff_time to reservation table
ALTER TABLE reservation
ADD COLUMN pickup_time TIME,
ADD COLUMN dropoff_time TIME;
