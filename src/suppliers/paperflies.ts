
import { HotelAmenities } from "../dto/amenities.dto";
import { HotelImages } from "../dto/images.dto";
import { HotelLocation } from "../dto/location.dto";
import { Utils } from "../utils";
import { BaseHotel } from "./base";

interface PaperfliesImages {
    rooms: { link: string, caption: string }[]
    site: { link: string, caption: string }[]
}

interface PaperfliesLocation {
    address: string
    country: string
}

export class PaperfliesHotel implements BaseHotel {
    hotel_id: string
    destination_id: string
    hotel_name: string
    location: PaperfliesLocation
    details: string
    amenities: HotelAmenities
    images: PaperfliesImages
    booking_conditions: string[]

    constructor(data: any) {
        this.hotel_id = data.hotel_id;
        this.destination_id = data.destination_id;
        this.hotel_name = data.hotel_name;
        this.location = data.location;
        this.details = data.details;
        this.amenities = data.amenities;
        this.images = data.images;
        this.booking_conditions = data.booking_conditions;
    }

    getUniqueId() {
        return `${this.hotel_id}-${this.destination_id}`
    }

    getId() {
        return this.hotel_id
    }

    getDestinationId() {
        return this.destination_id
    }

    getName() {
        return Utils.trimString(this.hotel_name)
    }

    getDescription() {
        return Utils.trimString(this.details)
    }

    getBookingConditions() {
        return this.booking_conditions
    }

    getAmenities() {
        return this.amenities
    }

    getLocation() {
        return {
            address: Utils.trimString(this.location.address),
            country: Utils.trimString(this.location.country)
        } as HotelLocation
    }

    getImages() {
        const roomImages = this.images.rooms || []
        const siteImages = this.images.site || []

        return {
            rooms: roomImages.map((image) => ({ link: image.link, description: image.caption })),
            site: siteImages.map((image) => ({ link: image.link, description: image.caption }))
        } as HotelImages
    }
}