import { BaseHotel } from "./suppliers/base";
import { AcmeHotel } from "./suppliers/acme";
import { PaperfliesHotel } from "./suppliers/paperflies";
import { PatagoniaHotel } from "./suppliers/patagonia";
import { Hotel } from "./dto/hotel.dto";
import { HotelMerger } from "./merger";

interface HotelSuppliers {
    [key: string]: {
        url: string;
        create: new (data: any) => BaseHotel;
    }
}

export class HotelService {
    private hotels: Record<string, Hotel> = {};

    private suppliers: HotelSuppliers = {
        acme: {
            url: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/acme',
            create: AcmeHotel
        },
        patagonia: {
            url: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/patagonia',
            create: PatagoniaHotel
        },
        paperflies: {
            url: 'https://5f2be0b4ffc88500167b85a0.mockapi.io/suppliers/paperflies',
            create: PaperfliesHotel
        }
    }

    private async fetchSupplierData(url: string): Promise<any[]> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error();
            }
            const data = await response.json();
            return data || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public async fetchData() {
        try {
            for (const supplierKey in this.suppliers) {
                const supplier = this.suppliers[supplierKey];
                const data = await this.fetchSupplierData(supplier.url);

                data.forEach((hotelData) => {
                    const hotel = new supplier.create(hotelData);
                    const hotelId = hotel.getUniqueId();

                    const parsedHotel = this.transformToHotel(hotel);

                    if (this.hotels[hotelId]) {
                        this.hotels[hotelId] = this.mergeHotels(this.hotels[hotelId], parsedHotel);
                    } else {
                        this.hotels[hotelId] = parsedHotel;
                    }
                })
            }

            return Object.values(this.hotels);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    private transformToHotel(supplier: BaseHotel): Hotel {
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

    private mergeHotels(prevHotel: Hotel, currentHotel: Hotel) {
        const newHotel = {
            ...prevHotel,
            name: HotelMerger.mergeNames(prevHotel, currentHotel) || '',
            location: HotelMerger.mergeLocations(prevHotel, currentHotel),
            description: HotelMerger.mergeDescriptions(prevHotel, currentHotel) || '',
            amenities: HotelMerger.mergeAmenities(prevHotel, currentHotel),
            images: HotelMerger.mergeImages(prevHotel, currentHotel),
            booking_conditions: HotelMerger.mergeBookingConditions(prevHotel, currentHotel),
        }

        return newHotel
    }
}