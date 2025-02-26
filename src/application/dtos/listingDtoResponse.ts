class listingDtoResponse {
  id: string;
  title: string;
  description: string | null;
  costPerNight: number;
  locationType: string;
  numOfBeds: number;
  photoThumbnail: string | null;
  isFeatured: boolean;
  latitude: number | null;
  longitude: number | null;
  closedForBookings: boolean;
  host: {
    id: string;
    username: string;
    email: string;
  };
  createdAt: Date;

  constructor(
    id: string,
    title: string,
    description: string | null,
    costPerNight: number,
    locationType: string,
    numOfBeds: number,
    photoThumbnail: string | null,
    isFeatured: boolean,
    latitude: number | null,
    longitude: number | null,
    closedForBookings: boolean,
    host: { id: string; username: string; email: string },
    createdAt: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.costPerNight = costPerNight;
    this.locationType = locationType;
    this.numOfBeds = numOfBeds;
    this.photoThumbnail = photoThumbnail;
    this.isFeatured = isFeatured;
    this.latitude = latitude;
    this.longitude = longitude;
    this.closedForBookings = closedForBookings;
    this.host = host;
    this.createdAt = createdAt;
  }
}

export default listingDtoResponse;
