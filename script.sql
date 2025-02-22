-- Create the database
CREATE DATABASE Airlock;

-- Connect to the database
USE Airlock;

-- Table Amenitie (Amenities)
CREATE TABLE Amenitie (
    id CHAR(36) PRIMARY KEY, -- Unique identifier for the amenity (UUID should be generated in backend or during insertion)
    category VARCHAR(30) NOT NULL, -- Category of the amenity (ex: "Space Survival", "Outdoors")
    name VARCHAR(30) NOT NULL -- Name of the amenity (ex: "SOS button", "Meteor showers")
);

-- Table User
CREATE TABLE User (
    id CHAR(36) PRIMARY KEY, -- Unique identifier for the user (UUID should be generated in backend or during insertion)
    username VARCHAR(50) UNIQUE NOT NULL, -- Username (must be unique)
    email VARCHAR(100) UNIQUE NOT NULL, -- Email (must be unique)
    password VARCHAR(255) NOT NULL, -- Hashed password for security
    role ENUM('host', 'guest') NOT NULL, -- Role defines if the user can create listings
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp when user is created
);

-- Table Listing (Listings)
CREATE TABLE Listing (
    id CHAR(36) PRIMARY KEY, -- Unique identifier for the listing (UUID should be generated in backend or during insertion)
    title VARCHAR(50) NOT NULL, -- Title of the listing
    description VARCHAR(500), -- Description of the listing
    costPerNight DECIMAL(10, 2) NOT NULL, -- Cost per night
    locationType VARCHAR(30) NOT NULL, -- Type of location (ex: "Campsite", "Space Ship")
    numOfBeds INTEGER NOT NULL, -- Number of beds
    photoThumbnail VARCHAR(150), -- URL of the photo thumbnail
    isFeatured BOOLEAN DEFAULT FALSE, -- Whether the listing is featured
    latitude DECIMAL(9, 6), -- Latitude of the location
    longitude DECIMAL(9, 6), -- Longitude of the location
    closedForBookings BOOLEAN DEFAULT FALSE, -- Whether the listing is closed for bookings
    hostId CHAR(36) NOT NULL, -- User who created the listing
    FOREIGN KEY (hostId) REFERENCES User(id) ON DELETE CASCADE -- Ensure hostId is a valid User
);

-- Table Listing_Amenities (Many-to-Many Relationship)
CREATE TABLE Listing_Amenities (
    listingId CHAR(36) NOT NULL, -- Foreign key referencing Listing
    amenitieId CHAR(36) NOT NULL, -- Foreign key referencing Amenitie

    -- Composite primary key ensures a listing can't have duplicate amenities
    PRIMARY KEY (listingId, amenitieId),

    -- Foreign key constraint for listingId
    FOREIGN KEY (listingId) REFERENCES Listing(id) ON DELETE CASCADE,

    -- Foreign key constraint for amenitieId
    FOREIGN KEY (amenitieId) REFERENCES Amenitie(id) ON DELETE CASCADE
);

-- Table Favorites (Users can favorite listings)
CREATE TABLE Favorites (
    userId CHAR(36) NOT NULL, -- Foreign key referencing User
    listingId CHAR(36) NOT NULL, -- Foreign key referencing Listing
    
    -- Composite primary key ensures a user can only favorite a listing once
    PRIMARY KEY (userId, listingId),

    -- Foreign key constraint for userId
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,

    -- Foreign key constraint for listingId
    FOREIGN KEY (listingId) REFERENCES Listing(id) ON DELETE CASCADE
);
