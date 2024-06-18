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
import { getAllUsers } from "@/lib/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { deleteUserAdmin } from "@/lib/mutations";
import { toast } from "sonner";
import { queryClient } from "@/routes/__root";

const PAGE_SIZE = 10;

const UserTab = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useAuth();
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllUsers,
    queryKey: [QUERY_KEYS.USERS],
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteUserAdmin,
    mutationKey: [MUTATION_KEYS.DELETE_USER],
  });

  if (isError) {
    return <div>Error, something went wrong.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalUsers = data?.length || 0;
  const totalPages = Math.ceil(totalUsers / PAGE_SIZE);

  const currentUsers = data?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleDelete = (userId: number) => {
    const promise = mutateAsync(
      {
        userId,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.USERS],
          });
        },
      }
    );

    toast.promise(promise, {
      loading: "Deleting user...",
      error: "Error, something went wrong",
      success: "Successfully deleted",
    });
  };
  return (
    <div>
      <Table>
        <TableCaption>All Users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[100px]">Username</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers?.map((u) => (
            <TableRow key={u.id}>
              <TableCell className="font-medium">{u.id}</TableCell>
              <TableCell className="font-medium">{u.username}</TableCell>
              <TableCell className="font-medium flex gap-2">
                {user?.username === u.username ? (
                  <div>You</div>
                ) : (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleDelete(u.id);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                )}
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

export default UserTab;
