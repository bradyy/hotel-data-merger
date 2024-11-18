"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperfliesHotel = void 0;
const utils_1 = require("../../utils");
class PaperfliesHotel {
    constructor(data) {
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
        return `${this.hotel_id}-${this.destination_id}`;
    }
    getId() {
        return this.hotel_id;
    }
    getDestinationId() {
        return this.destination_id;
    }
    getName() {
        return utils_1.Utils.trimString(this.hotel_name);
    }
    getDescription() {
        return utils_1.Utils.trimString(this.details);
    }
    getBookingConditions() {
        return this.booking_conditions;
    }
    getAmenities() {
        return this.amenities;
    }
    getLocation() {
        return {
            address: utils_1.Utils.trimString(this.location.address),
            country: utils_1.Utils.trimString(this.location.country)
        };
    }
    getImages() {
        const roomImages = this.images.rooms || [];
        const siteImages = this.images.site || [];
        return {
            rooms: roomImages.map((image) => ({ link: image.link, description: image.caption })),
            site: siteImages.map((image) => ({ link: image.link, description: image.caption }))
        };
    }
}
exports.PaperfliesHotel = PaperfliesHotel;
