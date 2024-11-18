import { HotelAmenities } from "./amenities.dto";
import { HotelImages } from "./images.dto";
import { HotelLocation } from "./location.dto";

export interface Hotel {
    id: string;
    destination_id: number;
    name: string;
    description: string;
    booking_conditions: string[];
    amenities: HotelAmenities;
    images: HotelImages;
    location: HotelLocation;
}