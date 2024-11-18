"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcmeHotel = void 0;
const utils_1 = require("../../utils");
class AcmeHotel {
    constructor(data) {
        this.Id = data.Id;
        this.DestinationId = data.DestinationId;
        this.Name = data.Name;
        this.Latitude = data.Latitude;
        this.Longitude = data.Longitude;
        this.Address = data.Address;
        this.City = data.City;
        this.Country = data.Country;
        this.PostalCode = data.PostalCode;
        this.Description = data.Description;
        this.Facilities = data.Facilities;
    }
    getUniqueId() {
        return `${this.Id}-${this.DestinationId}`;
    }
    getId() {
        return this.Id;
    }
    getDestinationId() {
        return this.DestinationId;
    }
    getName() {
        return this.Name;
    }
    getDescription() {
        return utils_1.Utils.trimString(this.Description);
    }
    getBookingConditions() {
        return [];
    }
    getAmenities() {
        return {
            general: this.Facilities ? this.Facilities.map((amenity) => utils_1.Utils.trimString(utils_1.Utils.splitCamelCase(amenity)).toLowerCase()) : [],
        };
    }
    getLocation() {
        return {
            lat: utils_1.Utils.parseCoords(this.Latitude),
            lng: utils_1.Utils.parseCoords(this.Longitude),
            address: `${utils_1.Utils.trimString(this.Address)} ${utils_1.Utils.trimString(this.PostalCode)}`,
            city: utils_1.Utils.trimString(this.City),
            country: utils_1.Utils.trimString(this.Country),
        };
    }
    getImages() {
        return {
            rooms: [],
            amenities: [],
            site: [],
        };
    }
}
exports.AcmeHotel = AcmeHotel;
