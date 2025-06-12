-- users table
CREATE TABLE "user" (
    uuid VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    fname TEXT NOT NULL,
    lname TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    gender TEXT CHECK (gender IN ('male', 'female')),
    phone TEXT NOT NULL,
    zip_code TEXT,
    city TEXT NOT NULL,
    street TEXT,
    region TEXT NOT NULL,
    photo_url TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'car_owner', 'customer', 'driver')),
    account_status TEXT NOT NULL DEFAULT 'pending' CHECK (account_status IN ('pending', 'active','blocked')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- verification table
CREATE TABLE verification (
    uuid VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    user_uuid VARCHAR(36) NOT NULL UNIQUE REFERENCES "user"(uuid),
    verification_type TEXT NOT NULL CHECK (verification_type IN ('passport', 'id_card', 'driver_licence')),
    ver_doc1_url TEXT NOT NULL,
    ver_doc2_url TEXT NOT NULL
);

-- car table
CREATE TABLE car (
    uuid VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    owner_uuid VARCHAR(36) NOT NULL REFERENCES "user"(uuid),
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'rented', 'unavailable')),
    pickup_location TEXT,
    dropoff_location TEXT
);

-- carDetails table
CREATE TABLE car_details (
    uuid VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    car_uuid VARCHAR(36) NOT NULL UNIQUE REFERENCES car(uuid),
    name TEXT NOT NULL,
    model TEXT NOT NULL,
    date_of_first_use DATE NOT NULL,
    energy_type TEXT NOT NULL CHECK (energy_type IN ('fuel', 'gas', 'electric')),
    transmission_type TEXT NOT NULL CHECK (transmission_type IN ('manual', 'automatic','hybrid')),
    brand TEXT NOT NULL,
    no_seats INT,
    color TEXT NOT NULL,
    chassis_no TEXT NOT NULL,
    vin TEXT NOT NULL,
    price_per_day NUMERIC(10, 2) NOT NULL,
    cat_doc TEXT,
    visite_technique_doc TEXT,
    insurance_doc TEXT,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- reservation table
CREATE TABLE reservation (
    uuid VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    car_uuid VARCHAR(36) REFERENCES car(uuid),
    customer_uuid VARCHAR(36) NOT NULL REFERENCES "user"(uuid),
    start_date DATE,
    end_date DATE,
    rental_amount NUMERIC(10, 2),
    penalty_amount NUMERIC(10, 2) DEFAULT 0,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- car gallery
CREATE TABLE car_gallery (
    uuid VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    car_uuid VARCHAR(36) NOT NULL REFERENCES car(uuid),
    image TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- payment table
CREATE TABLE payment (
    uuid VARCHAR(36) PRIMARY KEY DEFAULT gen_random_uuid()::varchar(36),
    rental_uuid VARCHAR(36) REFERENCES reservation(uuid),
    amount_paid NUMERIC(10, 2),
    payment_method TEXT NOT NULL CHECK (payment_method IN ('momo', 'bank', 'card', 'cash', 'other')),
    reference TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    date_paid TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
