import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Route } from "@/routes";
import { QUERY_KEYS } from "@/lib/constants";
import CarCard from "@/components/cars/CarCard";
import { getAllCars, getAllCarsPaginated, getMyFavorites } from "@/lib/queries";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const PAGE_SIZE = 5;

const CarsForSale = () => {
  const { search, page } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { isAuth } = useAuth();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS.CARS, page],
    queryFn: () => {
      return getAllCarsPaginated({
        page: parseInt(page),
        pageSize: PAGE_SIZE,
        search,
      });
    },
  });

  const { data: favorites } = useQuery({
    queryKey: [QUERY_KEYS.FAVORITES],
    queryFn: getMyFavorites,
    enabled: isAuth,
  });

  useEffect(() => {
    refetch();
  }, [search]);

  const { data: allCars } = useQuery({
    queryKey: [QUERY_KEYS.CARS],
    queryFn: getAllCars,
  });

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalCars = allCars?.length || 0;
  const totalPages = Math.ceil(totalCars / PAGE_SIZE);

  const currentCars = data || [];

  return (
    <div className="flex flex-col gap-4 mt-10">
      {currentCars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          hasFavorite={isAuth}
          isFavorite={Boolean(favorites?.find((f) => f.carId === car.id))}
        />
      ))}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => {
                navigate({
                  search: {
                    search,
                    page: Math.max(parseInt(page) - 1, 1),
                  },
                });
              }}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => {
                  navigate({
                    search: {
                      search,
                      page: index + 1,
                    },
                  });
                }}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => {
                navigate({
                  search: {
                    search,
                    page: Math.min(parseInt(page) + 1, totalPages),
                  },
                });
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CarsForSale;
