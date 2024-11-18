import { HotelService } from "./service";

const parseArrayArg = (arg: string): string[] => {
    if (!arg || arg === 'none') return [];
    return arg.split(',')
};

const args = process.argv.slice(2);

const hotelIds = parseArrayArg(args[0]);
const destinationIds = parseArrayArg(args[1]);

const hotelService = new HotelService();

hotelService.fetchData()
    .then(hotels => {
        const filteredHotels = hotels.filter(hotel => {
            const matchesHotelId = hotelIds.length === 0 || hotelIds.includes(hotel.id);
            const matchesDestId = destinationIds.length === 0 || destinationIds.includes(hotel.destination_id.toString());
            return matchesHotelId && matchesDestId;
        });

        console.log(JSON.stringify(filteredHotels, null, 2));
    })
    .catch(error => {
        console.error('Error:', error);
    });