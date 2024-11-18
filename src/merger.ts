import { Hotel } from "./dto/hotel.dto"
import { HotelImages } from "./dto/images.dto"
import { HotelLocation } from "./dto/location.dto"
import { Utils } from "./utils"

export class HotelMerger {
    static mergeNames(hotel1: Hotel, hotel2: Hotel): string {
        return Utils.getLongerString(hotel1.name, hotel2.name).trim()
    }

    static mergeDescriptions(hotel1: Hotel, hotel2: Hotel): string {
        return Utils.getLongerString(hotel1.description, hotel2.description).trim()
    }

    static mergeBookingConditions(hotel1: Hotel, hotel2: Hotel): string[] {
        return Utils.createUniqueArray(hotel1.booking_conditions || [], hotel2.booking_conditions || [])
    }

    static mergeLocations(hotel1: Hotel, hotel2: Hotel): HotelLocation {
        const newHotelLocation = hotel2.location

        const location = {
            address: Utils.getLongerString(hotel1.location.address, newHotelLocation.address),
            city: Utils.getLongerString(hotel1.location.city, newHotelLocation.city),
            country: Utils.getLongerString(hotel1.location.country, newHotelLocation.country),
            lat: hotel1.location.lat || newHotelLocation.lat,
            lng: hotel1.location.lng || newHotelLocation.lng,
        }

        return location
    }

    static mergeAmenities(hotel1: Hotel, hotel2: Hotel) {
        const newAmenities = hotel2.amenities

        const amenities = {
            general: Utils.createUniqueArray(Utils.removeWhitespaceArray(hotel1.amenities.general || []), Utils.removeWhitespaceArray(newAmenities.general || [])),
            room: Utils.createUniqueArray(Utils.removeWhitespaceArray(hotel1.amenities.room || []), Utils.removeWhitespaceArray(newAmenities.room || [])),
        }

        amenities.general = amenities.general.filter((amenity: string) => !amenities.room.includes(amenity))

        return amenities
    }

    static mergeImages(hotel1: Hotel, hotel2: Hotel) {
        const imageKeys = Utils.createUniqueArray(Object.keys(hotel1.images), Object.keys(hotel2.images))

        const images = {} as HotelImages

        imageKeys.forEach((type: keyof HotelImages) => {
            const currentHotelImageForType = hotel1.images[type] || []

            const newHotelImageForType = hotel2.images[type] || []

            images[type] = [...currentHotelImageForType, ...newHotelImageForType]

            const uniqueImageLinks = Utils.createUniqueArray(
                currentHotelImageForType.map((image) => image.link),
                newHotelImageForType.map((image) => image.link)
            )

            images[type] = images[type].filter((image) => uniqueImageLinks.includes(image.link))
        })

        return images
    }
}