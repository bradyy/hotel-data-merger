import { HotelAmenities } from "../dto/amenities.dto"
import { HotelImages } from "../dto/images.dto"
import { HotelLocation } from "../dto/location.dto"
import { Utils } from "../utils"
import { BaseHotel } from "./base"


export class AcmeHotel implements BaseHotel {
    Id: string
    DestinationId: string
    Name: string
    Latitude: number | null
    Longitude: number | null
    Address: string
    City: string
    Country: string
    PostalCode: string
    Description: string
    Facilities: string[]

    constructor(data: any) {
        this.Id = data.Id
        this.DestinationId = data.DestinationId
        this.Name = data.Name
        this.Latitude = data.Latitude
        this.Longitude = data.Longitude
        this.Address = data.Address
        this.City = data.City
        this.Country = data.Country
        this.PostalCode = data.PostalCode
        this.Description = data.Description
        this.Facilities = data.Facilities
    }

    getUniqueId() {
        return `${this.Id}-${this.DestinationId}`
    }

    getId() {
        return this.Id
    }

    getDestinationId() {
        return this.DestinationId
    }

    getName() {
        return this.Name
    }

    getDescription() {
        return Utils.trimString(this.Description)
    }

    getBookingConditions() {
        return []
    }

    getAmenities() {
        return {
            general: this.Facilities ? this.Facilities.map((amenity) => Utils.trimString(Utils.splitCamelCase(amenity)).toLowerCase()) : [],
        } as HotelAmenities
    }

    getLocation() {
        return {
            lat: Utils.parseCoords(this.Latitude),
            lng: Utils.parseCoords(this.Longitude),
            address: `${Utils.trimString(this.Address)} ${Utils.trimString(this.PostalCode)}`,
            city: Utils.trimString(this.City),
            country: Utils.trimString(this.Country),
        } as HotelLocation
    }

    getImages(): HotelImages {
        return {
            rooms: [],
            amenities: [],
            site: [],
        }
    }
}