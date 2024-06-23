import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useMutation } from "@tanstack/react-query";
import { updateCarBodyTypeAdmin } from "@/lib/mutations";
import { MUTATION_KEYS, QUERY_KEYS } from "@/lib/constants";
import { CarBody } from "@/lib/types";
import { toast } from "sonner";
import { queryClient } from "@/routes/__root";

type Props = {
  bodyType: CarBody;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const EditCarBodyTypeAdminModal = ({ bodyType, open, onOpenChange }: Props) => {
  const [editedType, setEditedType] = useState(bodyType.type);

  const { mutateAsync } = useMutation({
    mutationFn: updateCarBodyTypeAdmin,
    mutationKey: [MUTATION_KEYS.UPDATE_CAR_BODY],
  });

  const handleTypeUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedType(e.target.value);
  };

  const handleUpdate = () => {
    const promise = mutateAsync(
      {
        carBodyType: {
          id: bodyType.id,
          type: editedType,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CAR_BODY],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEYS.CAR_BODIES],
          });

          onOpenChange(false);
        },
      }
    );

    toast.promise(promise, {
      loading: "Updating car body...",
      success: "Car body type updated successfully",
      error: "Error, something went wrong",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <h3>Edit car</h3>
        </DialogHeader>
        <DialogDescription>Editing {bodyType.type}</DialogDescription>

        <div>
          <Label>
            Type
            <Input type="text" onChange={handleTypeUpdate} value={editedType} />
          </Label>
        </div>

        <Button onClick={handleUpdate}>Update</Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditCarBodyTypeAdminModal;
