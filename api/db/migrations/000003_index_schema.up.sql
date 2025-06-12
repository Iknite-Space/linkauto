-- index on user table 
CREATE INDEX idx_users_email ON "user"(email);
CREATE INDEX idx_users_role ON "user"(role);

-- index on car table
CREATE INDEX idx_cars_owner_uuid ON car(owner_uuid);

-- index on reservation table
CREATE INDEX idx_reservations_customer_uuid ON reservation(customer_uuid);

