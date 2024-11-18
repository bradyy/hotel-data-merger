import { HotelAmenities } from "../dto/amenities.dto"
import { HotelImages } from "../dto/images.dto"
import { HotelLocation } from "../dto/location.dto"

export interface BaseHotel {
    getUniqueId(): string
    getId(): string
    getDestinationId(): string
    getName(): string
    getDescription(): string
    getBookingConditions(): string[]
    getAmenities(): HotelAmenities
    getImages(): HotelImages
    getLocation(): HotelLocation
}

