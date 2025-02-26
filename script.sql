-- Create the database
CREATE DATABASE Airlock;

-- Connect to the database
USE Airlock;

-- Table Amenity (Amenities)
CREATE TABLE Amenity (
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
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when user is created
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp when user is last updated
);

-- Indexes for User table
CREATE INDEX idx_user_email ON User(email);
CREATE INDEX idx_user_username ON User(username);

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
    FOREIGN KEY (hostId) REFERENCES User(id) ON DELETE CASCADE, -- Ensure hostId is a valid User
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the listing was created
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Timestamp when the listing was last updated
);

-- Index for Listing table
CREATE INDEX idx_listing_hostId ON Listing(hostId);

-- Table Listing_Amenity (Many-to-Many Relationship)
CREATE TABLE Listing_Amenity (
    listingId CHAR(36) NOT NULL, -- Foreign key referencing Listing
    amenityId CHAR(36) NOT NULL, -- Foreign key referencing Amenity

    -- Composite primary key ensures a listing can't have duplicate amenities
    PRIMARY KEY (listingId, amenityId),

    -- Foreign key constraint for listingId
    FOREIGN KEY (listingId) REFERENCES Listing(id) ON DELETE CASCADE,

    -- Foreign key constraint for amenityId
    FOREIGN KEY (amenityId) REFERENCES Amenity(id) ON DELETE CASCADE
);

-- Table Favorites (Users can favorite listings)
CREATE TABLE Favorites (
    userId CHAR(36) NOT NULL, -- Foreign key referencing User
    listingId CHAR(36) NOT NULL, -- Foreign key referencing Listing
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp when the favorite was created
    
    -- Composite primary key ensures a user can only favorite a listing once
    PRIMARY KEY (userId, listingId),

    -- Foreign key constraint for userId
    FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,

    -- Foreign key constraint for listingId
    FOREIGN KEY (listingId) REFERENCES Listing(id) ON DELETE CASCADE
);
