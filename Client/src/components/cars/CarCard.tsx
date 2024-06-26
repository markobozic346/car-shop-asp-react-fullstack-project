import { MUTATION_KEYS, QUERY_KEYS } from "@/lib/constants";
import { getCarBodyType } from "@/lib/queries";
import { Car } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { deleteCar, toggleFavoriteCar } from "@/lib/mutations";
import { toast } from "sonner";
import { queryClient } from "@/routes/__root";
import { useState } from "react";
import EditCarModal from "../modals/EditCarModal";
import { Heart } from "lucide-react";

type Props = {
  car: Car;
  className?: string;
  hasActions?: boolean;
  hasFavorite?: boolean;
  isFavorite?: boolean;
};

const CarCard = ({
  car,
  className,
  hasActions = false,
  hasFavorite = false,
  isFavorite = false,
}: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.CAR_BODY, car.id],
    queryFn: () => {
      return getCarBodyType({ carBodyId: car.carBodyId });
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteCar,
    mutationKey: [MUTATION_KEYS.DELETE_CAR],
  });

  const { mutateAsync: toggleFavorite } = useMutation({
    mutationFn: toggleFavoriteCar,
    mutationKey: [MUTATION_KEYS.TOGGLE_FAVORITE],
  });

  const handleDelete = () => {
    const promise = mutateAsync(
      {
        carId: car.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.MY_CARS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CARS],
          });
        },
      }
    );

    toast.promise(promise, {
      loading: "Deleting car...",
      success: "Car deleted successfully",
      error: "Error, something went wrong",
    });
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setEditModalOpen(open);
  };

  const handleToggleFavorite = () => {
    const promise = toggleFavorite(
      {
        car,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.FAVORITES],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CARS],
          });
        },
      }
    );

    toast.promise(promise, {
      loading: "Toggling favorite...",
      success: "Favorite toggled successfully",
      error: "Error, something went wrong",
    });
  };

  return (
    <div
      className={cn(
        "rounded-xl md:h-[200px] md:flex-row flex-col w-full border justify-between border-gray-600/20 p-4 flex gap-6",
        className
      )}
    >
      <img src="placeholder.jpg" className="h-full" />
      <div className="flex-1">
        <h1 className="text-2xl font-bold">
          {car.make} {car.model}
        </h1>

        <div className="mt-10">
          <p className="text-xl font-medium">{car.price}</p>
          <p className="text-xs text-gray-500">+ dodatni troskovi kupovine</p>
        </div>
        <div className="flex gap-2 items-center text-sm mt-2">
          <p>Godiste</p>
          <p>{car.year}</p>
        </div>
        {data?.type && (
          <div className="flex gap-2 items-center text-sm mt-2">
            <p>Karoserija</p>
            <p>{data?.type}</p>
          </div>
        )}
      </div>
      <div className="flex items-end justify-center gap-2">
        {hasActions ? (
          <div className="flex flex-col gap-2 items-center">
            <Button
              variant="outline"
              className="w-[200px]"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              className="w-[200px]"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Button className="w-[200px]">Pozovi</Button>
        )}
        {hasFavorite && (
          <>
            <Heart
              onClick={handleToggleFavorite}
              className={cn("size-8", {
                "fill-red-400 stroke-transparent": isFavorite,
              })}
            />
          </>
        )}
      </div>
      <EditCarModal
        car={car}
        open={editModalOpen}
        onOpenChange={handleOpenChange}
      />
    </div>
  );
};

export default CarCard;
