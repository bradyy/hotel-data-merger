"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = require("./classes/service");
const parseArrayArg = (arg) => {
    if (!arg || arg === 'none')
        return [];
    return arg.split(',');
};
const args = process.argv.slice(2);
const hotelIds = parseArrayArg(args[0]);
const destinationIds = parseArrayArg(args[1]);
const hotelService = new service_1.HotelService();
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
