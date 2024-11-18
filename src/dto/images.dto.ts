export interface HotelImage {
    link: string;
    description: string;
}

export interface HotelImages {
    rooms: HotelImage[];
    amenities: HotelImage[];
    site: HotelImage[];
}