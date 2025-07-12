-- add the visibility column to the car table
ALTER TABLE car ADD COLUMN visibility TEXT DEFAULT 'pending' CHECK (visibility IN ('pending', 'approved', 'rejected'));

-- remove the date of first use column from car_details table
ALTER TABLE car_details DROP COLUMN date_of_first_use;