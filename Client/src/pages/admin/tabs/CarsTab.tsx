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
import { MUTATION_KEYS, QUERY_KEYS } from "@/lib/constants";
import { getAllCars, getCarBodyType } from "@/lib/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { deleteCarAdmin } from "@/lib/mutations";
import { toast } from "sonner";
import { queryClient } from "@/routes/__root";
import EditCarAdminModal from "@/components/modals/EditCarAdminModal";
import { Car } from "@/lib/types";

const PAGE_SIZE = 10;

const CarsTab = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERY_KEYS.CARS],
    queryFn: getAllCars,
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteCarAdmin,
    mutationKey: [MUTATION_KEYS.DELETE_CAR],
  });

  if (isError) {
    return <div>Error, something went wrong</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalCars = data?.length || 0;
  const totalPages = Math.ceil(totalCars / PAGE_SIZE);

  const currentCars = data?.slice(
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
            queryKey: [QUERY_KEYS.CARS],
          });
        },
      }
    );

    toast.promise(promise, {
      loading: "Deleting user car...",
      error: "Error, something went wrong",
      success: "Car deleted successfully",
    });
  };

  return (
    <div>
      <Table>
        <TableCaption>All Cars</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[100px]">Make</TableHead>
            <TableHead>Model</TableHead>
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
              <TableCell>{car.year}</TableCell>
              <CarBodyCell carBodyId={car.carBodyId} carId={car.id} />
              <TableCell className="font-medium flex gap-2">
                <EditCarAdmin car={car} />
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete({ carId: car.id });
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              //   disabled={currentPage === 1}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => setCurrentPage(index + 1)}
                // active={index + 1 === currentPage}
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
              //   disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
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

const EditCarAdmin = ({ car }: { car: Car }) => {
  const [isEditOpen, setEditOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setEditOpen(open);
  };

  const handleEdit = () => {
    setEditOpen(true);
  };
  return (
    <>
      <Button variant="outline" onClick={handleEdit}>
        Edit
      </Button>
      <EditCarAdminModal
        car={car}
        open={isEditOpen}
        onOpenChange={handleOpenChange}
      />
    </>
  );
};
export default CarsTab;
