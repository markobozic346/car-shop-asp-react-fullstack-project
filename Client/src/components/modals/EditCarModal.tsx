import { Car } from "@/lib/types";

import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation, useQuery } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "@/lib/constants";
import { getAllCarBodyTypes } from "@/lib/queries";
import { useState } from "react";
import { Button } from "../ui/button";
import { updateCar } from "@/lib/mutations";
import { toast } from "sonner";
import { queryClient } from "@/routes/__root";

type Props = {
  car: Car;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditCarModal = ({ car, open, onOpenChange }: Props) => {
  const [editedCar, setEditedCar] = useState(car);

  const { data: carBodies, isLoading: isLoadingCarBodies } = useQuery({
    queryKey: [QUERY_KEYS.CAR_BODIES],
    queryFn: getAllCarBodyTypes,
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateCar,
    mutationKey: [MUTATION_KEYS.UPDATE_CAR],
  });

  const currentBody = carBodies?.find((body) => body.id === car.carBodyId);

  const handleEditCarBody = (body: string) => {
    setEditedCar((prev) => ({ ...prev, carBodyId: parseInt(body) }));
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCar((prev) => ({ ...prev, make: e.target.value }));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCar((prev) => ({ ...prev, model: e.target.value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCar((prev) => ({ ...prev, price: parseInt(e.target.value) }));
  };
  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCar((prev) => ({ ...prev, year: parseInt(e.target.value) }));
  };

  const handleUpdate = () => {
    if (
      !editedCar.make ||
      !editedCar.model ||
      !editedCar.year ||
      !editedCar.carBodyId
    ) {
      toast.error("All fields are required");
      return;
    }

    if (editedCar.year < 1900 || editedCar.year > 2024) {
      toast.error("Year is not valid, must be > 1900 and < 2024");
      return;
    }

    const promise = mutateAsync(
      {
        car: editedCar,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CARS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.MY_CARS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CAR_BODY, car.id],
          });

          onOpenChange(false);
        },
      }
    );

    toast.promise(promise, {
      loading: "Updating car...",
      success: "Car updated successfully",
      error: "Error, something went wrong",
    });
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h3>Edit car</h3>
        </DialogHeader>
        <DialogDescription>
          Editing {car.make} {car.model}
        </DialogDescription>

        <div>
          <Label>
            Make
            <Input
              type="text"
              onChange={handleMakeChange}
              value={editedCar.make}
            />
          </Label>
          <Label>
            Model
            <Input
              type="text"
              onChange={handleModelChange}
              value={editedCar.model}
            />
          </Label>
          <Label>
            Price
            <Input
              type="number"
              min={0}
              max={9999999}
              onChange={handlePriceChange}
              value={editedCar.price}
            />
          </Label>
          <Label>
            Year
            <Input
              type="number"
              min={1900}
              max={2024}
              onChange={handleYearChange}
              value={editedCar.year}
            />
          </Label>
          <Label>
            Model
            <Select
              onValueChange={handleEditCarBody}
              disabled={isLoadingCarBodies}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={currentBody?.type} />
              </SelectTrigger>
              <SelectContent>
                {carBodies?.map((body) => (
                  <SelectItem key={body.id} value={body.id.toString()}>
                    {body.type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Label>
        </div>

        <Button onClick={handleUpdate}>Update</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditCarModal;
