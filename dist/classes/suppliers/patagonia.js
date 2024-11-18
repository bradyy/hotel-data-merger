"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatagoniaHotel = void 0;
const utils_1 = require("../../utils");
class PatagoniaHotel {
    constructor(data) {
        this.id = data.id;
        this.destination = data.destination;
        this.name = data.name;
        this.lat = data.lat;
        this.lng = data.lng;
        this.address = data.address;
        this.info = data.info;
        this.amenities = data.amenities;
        this.images = data.images;
    }
    getUniqueId() {
        return `${this.id}-${this.destination}`;
    }
    getId() {
        return this.id;
    }
    getDestinationId() {
        return this.destination;
    }
    getName() {
        return this.name;
    }
    getDescription() {
        var _a;
        return (_a = this.info) !== null && _a !== void 0 ? _a : '';
    }
    getBookingConditions() {
        return [];
    }
    getAmenities() {
        return {
            general: this.amenities ? this.amenities.map((amenity) => amenity.toLowerCase()) : [],
        };
    }
    getLocation() {
        var _a;
        return {
            lat: utils_1.Utils.parseCoords(this.lat),
            lng: utils_1.Utils.parseCoords(this.lng),
            address: (_a = this.address) !== null && _a !== void 0 ? _a : '',
        };
    }
    getImages() {
        const roomImages = this.images.room || [];
        const amenitiesImages = this.images.amenities || [];
        return {
            rooms: roomImages.map((item) => ({ link: item.url, description: item.description })),
            amenities: amenitiesImages.map((item) => ({ link: item.url, description: item.description })),
        };
    }
}
exports.PatagoniaHotel = PatagoniaHotel;
