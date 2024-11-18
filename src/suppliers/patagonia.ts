import { HotelAmenities } from "../dto/amenities.dto"
import { HotelImages } from "../dto/images.dto"
import { HotelLocation } from "../dto/location.dto"
import { Utils } from "../utils"
import { BaseHotel } from "./base"

interface PatagoniaImages {
    room: { url: string, description: string }[]
    amenities: { url: string, description: string }[]
}

export class PatagoniaHotel implements BaseHotel {
    id: string
    destination: string
    name: string
    lat: number
    lng: number
    address: string | null
    info: string | null
    amenities: string[] | null
    images: PatagoniaImages

    constructor(data: any) {
        this.id = data.id
        this.destination = data.destination
        this.name = data.name
        this.lat = data.lat
        this.lng = data.lng
        this.address = data.address
        this.info = data.info
        this.amenities = data.amenities
        this.images = data.images
    }

    getUniqueId() {
        return `${this.id}-${this.destination}`
    }

    getId() {
        return this.id
    }

    getDestinationId() {
        return this.destination
    }

    getName() {
        return this.name
    }

    getDescription() {
        return this.info ?? ''
    }

    getBookingConditions() {
        return []
    }

    getAmenities() {
        return {
            general: this.amenities ? this.amenities.map((amenity) => amenity.toLowerCase()) : [],
        } as HotelAmenities
    }

    getLocation() {
        return {
            lat: Utils.parseCoords(this.lat),
            lng: Utils.parseCoords(this.lng),
            address: this.address ?? '',
        } as HotelLocation
    }

    getImages() {
        const roomImages = this.images.room || []
        const amenitiesImages = this.images.amenities || []

        return {
            rooms: roomImages.map((item) => ({ link: item.url, description: item.description })),
            amenities: amenitiesImages.map((item) => ({ link: item.url, description: item.description })),
        } as HotelImages
    }
}