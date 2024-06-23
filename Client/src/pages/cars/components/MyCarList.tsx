import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyCars } from "@/lib/queries";
import { QUERY_KEYS } from "@/lib/constants";
import CarCard from "@/components/cars/CarCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { Route } from "@/routes/cars";

const PAGE_SIZE = 10;

const MyCarList = () => {
  const { search } = Route.useSearch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: cars,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.MY_CARS],
    queryFn: getMyCars,
  });

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const filteredCars = cars?.filter((car) =>
    car.make.toLowerCase().includes(search.toLowerCase())
  );

  const totalCars = filteredCars?.length || 0;
  const totalPages = Math.ceil(totalCars / PAGE_SIZE);

  const currentCars = filteredCars?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const noCars = currentCars?.length === 0;
  return (
    <div className="flex flex-col gap-4 mt-10">
      {currentCars?.map((car) => (
        <CarCard hasActions={true} key={car.id} car={car} />
      ))}

      {noCars && <p className="text-center ">No cars found</p>}
      {!noCars && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default MyCarList;
