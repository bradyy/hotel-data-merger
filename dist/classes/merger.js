"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelMerger = void 0;
const utils_1 = require("../utils");
class HotelMerger {
    static mergeNames(hotel1, hotel2) {
        return utils_1.Utils.getLongerString(hotel1.name, hotel2.name).trim();
    }
    static mergeDescriptions(hotel1, hotel2) {
        return utils_1.Utils.getLongerString(hotel1.description, hotel2.description).trim();
    }
    static mergeBookingConditions(hotel1, hotel2) {
        return utils_1.Utils.createUniqueArray(hotel1.booking_conditions || [], hotel2.booking_conditions || []);
    }
    static mergeLocations(hotel1, hotel2) {
        const newHotelLocation = hotel2.location;
        const location = {
            address: utils_1.Utils.getLongerString(hotel1.location.address, newHotelLocation.address),
            city: utils_1.Utils.getLongerString(hotel1.location.city, newHotelLocation.city),
            country: utils_1.Utils.getLongerString(hotel1.location.country, newHotelLocation.country),
            lat: hotel1.location.lat || newHotelLocation.lat,
            lng: hotel1.location.lng || newHotelLocation.lng,
        };
        return location;
    }
    static mergeAmenities(hotel1, hotel2) {
        const newAmenities = hotel2.amenities;
        const amenities = {
            general: utils_1.Utils.createUniqueArray(utils_1.Utils.removeWhitespaceArray(hotel1.amenities.general || []), utils_1.Utils.removeWhitespaceArray(newAmenities.general || [])),
            room: utils_1.Utils.createUniqueArray(utils_1.Utils.removeWhitespaceArray(hotel1.amenities.room || []), utils_1.Utils.removeWhitespaceArray(newAmenities.room || [])),
        };
        amenities.general = amenities.general.filter((amenity) => !amenities.room.includes(amenity));
        return amenities;
    }
    static mergeImages(hotel1, hotel2) {
        const imageKeys = utils_1.Utils.createUniqueArray(Object.keys(hotel1.images), Object.keys(hotel2.images));
        const images = {};
        imageKeys.forEach((type) => {
            const currentHotelImageForType = hotel1.images[type] || [];
            const newHotelImageForType = hotel2.images[type] || [];
            images[type] = [...currentHotelImageForType, ...newHotelImageForType];
            const uniqueImageLinks = utils_1.Utils.createUniqueArray(currentHotelImageForType.map((image) => image.link), newHotelImageForType.map((image) => image.link));
            images[type] = images[type].filter((image) => uniqueImageLinks.includes(image.link));
        });
        return images;
    }
}
exports.HotelMerger = HotelMerger;
