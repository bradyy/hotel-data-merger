"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelService = void 0;
const acme_1 = require("./suppliers/acme");
const paperflies_1 = require("./suppliers/paperflies");
const patagonia_1 = require("./suppliers/patagonia");
const merger_1 = require("./merger");
class HotelService {
    constructor() {
        this.hotels = {};
        this.suppliers = {
            acme: {
                hotels: [],
                url: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme',
                create: acme_1.AcmeHotel
            },
            patagonia: {
                hotels: [],
                url: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia',
                create: patagonia_1.PatagoniaHotel
            },
            paperflies: {
                hotels: [],
                url: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies',
                create: paperflies_1.PaperfliesHotel
            }
        };
    }
    fetchSupplierData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = yield response.json();
                return data || [];
            }
            catch (error) {
                console.error(`Error fetching data from ${url}:`, error);
                return [];
            }
        });
    }
    fetchData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const supplierKey in this.suppliers) {
                    const supplier = this.suppliers[supplierKey];
                    const data = yield this.fetchSupplierData(supplier.url);
                    data.forEach((hotelData) => {
                        const hotel = new supplier.create(hotelData);
                        const hotelId = hotel.getUniqueId();
                        if (this.hotels[hotelId]) {
                            this.hotels[hotelId] = this.mergeHotels(this.hotels[hotelId], this.transformToHotel(hotel));
                        }
                        else {
                            this.hotels[hotelId] = this.transformToHotel(hotel);
                        }
                    });
                }
                return Object.values(this.hotels);
            }
            catch (error) {
                console.error('Error in fetchData:', error);
                return [];
            }
        });
    }
    transformToHotel(supplier) {
        return {
            id: supplier.getId(),
            destination_id: Number(supplier.getDestinationId()),
            name: supplier.getName(),
            location: supplier.getLocation(),
            description: supplier.getDescription(),
            amenities: supplier.getAmenities(),
            images: supplier.getImages(),
            booking_conditions: supplier.getBookingConditions(),
        };
    }
    mergeHotels(prevHotel, currentHotel) {
        const newHotel = Object.assign(Object.assign({}, prevHotel), { name: merger_1.HotelMerger.mergeNames(prevHotel, currentHotel) || '', location: merger_1.HotelMerger.mergeLocations(prevHotel, currentHotel), description: merger_1.HotelMerger.mergeDescriptions(prevHotel, currentHotel) || '', amenities: merger_1.HotelMerger.mergeAmenities(prevHotel, currentHotel), images: merger_1.HotelMerger.mergeImages(prevHotel, currentHotel), booking_conditions: merger_1.HotelMerger.mergeBookingConditions(prevHotel, currentHotel) });
        return newHotel;
    }
}
exports.HotelService = HotelService;
