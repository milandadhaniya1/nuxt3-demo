import cars from "@/data/cars.json";
import city from "@/data/city.json";
import makes from "@/data/makes.json";
import listings from "@/data/listings.json";

export const useCars = () => {
  return {
    cars,
    city,
    makes,
    listings,
  };
};
