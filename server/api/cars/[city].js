import cars from "@/data/cars.json";

export default defineEventHandler((event) => {
    const {city} = event.context.params;
    const {make, minPrice, maxPrice} = getQuery(event);
    let filteredCars = cars;
    
    filteredCars = filteredCars.filter((car)=> {
        return car.city.toLowerCase() === city.toLowerCase();
    });
    
    if(make) {
        filteredCars = filteredCars.filter((car)=> {
            return car.make.toLowerCase() === make.toLowerCase();
        });
    }

    if(minPrice && minPrice!==undefined) {
        filteredCars = filteredCars.filter((car)=> {
            return car.price >= parseInt(minPrice);
        });
    }

    if(maxPrice && minPrice!==undefined) {
        filteredCars = filteredCars.filter((car)=> {
            return car.price <= parseInt(maxPrice);
        });
    }
    return filteredCars;
});