import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllCars, getCarBodyType, getMyFavorites } from "@/lib/queries";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import EditCarAdminModal from "@/components/modals/EditCarAdminModal";
import { Car } from "@/lib/types";
import { QUERY_KEYS, MUTATION_KEYS } from "@/lib/constants";
import { toast } from "sonner";
import { queryClient } from "@/routes/__root";
import { deleteCarAdmin, deleteFavoriteCarAdmin } from "@/lib/mutations";
import { Route } from "@/routes/admin";

const PAGE_SIZE = 10;

const FavoritesTab = () => {
  const { search } = Route.useSearch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: carsData,
    isLoading: carsLoading,
    isError: carsError,
  } = useQuery({
    queryKey: [QUERY_KEYS.FAVORITES],
    queryFn: getMyFavorites,
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteFavoriteCarAdmin,
    mutationKey: [MUTATION_KEYS.DELETE_FAVORITE],
  });

  if (carsError) {
    return <div>Error, something went wrong</div>;
  }

  if (carsLoading) {
    return <div>Loading...</div>;
  }

  // Client-side search filtering
  const filteredCars = carsData?.filter(
    (car) =>
      car.make.toLowerCase().includes(search.toLowerCase()) ||
      car.model.toLowerCase().includes(search.toLowerCase())
  );

  const totalCars = filteredCars?.length || 0;
  const totalPages = Math.ceil(totalCars / PAGE_SIZE);

  const currentCars = filteredCars?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleDelete = ({ carId }: { carId: number }) => {
    const promise = mutateAsync(
      {
        carId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.FAVORITES],
          });
        },
      }
    );

    toast.promise(promise, {
      loading: "Deleting user saved car...",
      error: "Error, something went wrong",
      success: "Saved car deleted successfully",
    });
  };

  return (
    <div>
      {currentCars?.length === 0 ? (
        <div className="flex justify-center mt-8 text-lg font-medium">
          No results found.
        </div>
      ) : (
        <>
          <Table>
            <TableCaption>All Cars</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[100px]">Make</TableHead>
                <TableHead>Model</TableHead>
                <TableHead className="w-[100px]">Price</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="text-right">Car Body</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCars?.map((car) => (
                <TableRow key={car.id}>
                  <TableCell className="font-medium">{car.id}</TableCell>
                  <TableCell className="font-medium">{car.make}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell className="font-medium">{car.price}</TableCell>
                  <TableCell>{car.year}</TableCell>
                  <CarBodyCell carBodyId={car.carBodyId} carId={car.id} />
                  <TableCell className="font-medium flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => {
                        if (!car.favoriteId) return;

                        handleDelete({ carId: car.favoriteId });
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
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
        </>
      )}
    </div>
  );
};

const CarBodyCell = ({
  carBodyId,
  carId,
}: {
  carBodyId: number;
  carId: number;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.CAR_BODY, carId],
    queryFn: () => getCarBodyType({ carBodyId }),
  });

  if (isError) {
    return <div>Error, something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <TableCell className="text-right">{data?.type}</TableCell>;
};

export default FavoritesTab;
