import CarCard from "@/components/cars/CarCard";
import { QUERY_KEYS } from "@/lib/constants";
import { getAllCars } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

const CarsForSale = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.CARS],
    queryFn: getAllCars,
  });

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col gap-4">
      {data?.map((car) => <CarCard key={car.id} car={car} />)}
    </div>
  );
};

export default CarsForSale;
