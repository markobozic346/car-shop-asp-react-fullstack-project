import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getMyFavorites } from "@/lib/queries";
import { cn } from "@/lib/utils";
import CarCard from "@/components/cars/CarCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import SearchCars from "./components/SearchCars";
import { Route } from "@/routes/favorites";

const PAGE_SIZE = 10;

const FavoritesPage = () => {
  const { search } = Route.useSearch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: favorites,
    isLoading,
    isError,
  } = useQuery({
    queryFn: getMyFavorites,
    queryKey: [QUERY_KEYS.FAVORITES],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const filteredFavorites = favorites?.filter((car) =>
    car.make.toLowerCase().includes(search.toLowerCase())
  );

  const totalFavorites = filteredFavorites?.length || 0;
  const totalPages = Math.ceil(totalFavorites / PAGE_SIZE);

  const currentFavorites = filteredFavorites?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const noFavorites = currentFavorites?.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <h1 className={cn("text-3xl font-semibold")}>Favorites</h1>
      <p className={cn("text-lg text-muted-foreground")}>
        Welcome to the favorites, here you can see all your favorite cars.
      </p>

      <SearchCars />

      {noFavorites && <p className="text-center">No favorites found</p>}
      {currentFavorites?.map((car) => (
        <CarCard key={car.id} car={car} isFavorite hasFavorite />
      ))}

      {!noFavorites && (
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

export default FavoritesPage;
