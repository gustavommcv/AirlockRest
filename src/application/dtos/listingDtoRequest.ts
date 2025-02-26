export class listingDtoRequest {
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
  hostId: string;

  constructor(
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
    hostId: string
  ) {
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
    this.hostId = hostId;
  }
}
