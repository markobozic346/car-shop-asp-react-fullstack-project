import { useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllCarBodyTypes } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import EditCarBodyTypeAdminModal from "@/components/modals/EditCarBodyTypeAdminModal";
import { CarBody } from "@/lib/types";
import { QUERY_KEYS } from "@/lib/constants";
import { Route } from "@/routes/admin";

const PAGE_SIZE = 10;

const CarBodiesTab = () => {
  const { search } = Route.useSearch();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryFn: getAllCarBodyTypes,
    queryKey: [QUERY_KEYS.CAR_BODIES],
  });

  if (isError) {
    return <div>Error, something went wrong</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Apply client-side search filtering
  const filteredCarBodies = data?.filter((carBody) =>
    carBody.type.toLowerCase().includes(search.toLowerCase())
  );

  const totalCarBodies = filteredCarBodies?.length || 0;
  const totalPages = Math.ceil(totalCarBodies / PAGE_SIZE);

  const currentCarBodies = filteredCarBodies?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handlePaginationClick = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  return (
    <div>
      {currentCarBodies?.length === 0 ? (
        <div className="flex justify-center mt-8 text-lg font-medium">
          No results found.
        </div>
      ) : (
        <>
          <Table>
            <TableCaption>All Car Bodies</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="w-[100px]">Type</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCarBodies?.map((carBody) => (
                <TableRow key={carBody.id}>
                  <TableCell className="font-medium">{carBody.id}</TableCell>
                  <TableCell className="font-medium">{carBody.type}</TableCell>
                  <TableCell className="font-medium flex gap-2">
                    <EditCarBodyAdmin carBody={carBody} />
                    <Button variant="destructive" disabled>
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
                      handlePaginationClick(Math.max(currentPage - 1, 1))
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={() => handlePaginationClick(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      handlePaginationClick(
                        Math.min(currentPage + 1, totalPages)
                      )
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

const EditCarBodyAdmin = ({ carBody }: { carBody: CarBody }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleEditCarBodyType = () => {
    setOpenModal(true);
  };

  const handleOpenModalChange = (open: boolean) => {
    setOpenModal(open);
  };

  return (
    <>
      <Button variant="outline" onClick={handleEditCarBodyType}>
        Edit
      </Button>
      <EditCarBodyTypeAdminModal
        key={carBody.id}
        bodyType={carBody}
        open={openModal}
        onOpenChange={handleOpenModalChange}
      />
    </>
  );
};

export default CarBodiesTab;
