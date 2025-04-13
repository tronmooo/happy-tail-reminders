
import { Pet } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import PetIcon from "./PetIcon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { usePet } from "@/contexts/PetContext";

interface PetCardProps {
  pet: Pet;
}

const PetCard = ({ pet }: PetCardProps) => {
  const navigate = useNavigate();
  const { deletePet } = usePet();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  return (
    <>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
        <CardHeader className="p-4 bg-gradient-to-r from-primary/20 to-accent/10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white rounded-full">
                <PetIcon petType={pet.type} className="text-primary" />
              </div>
              <h3 className="font-semibold text-lg">{pet.name}</h3>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(`/pets/edit/${pet.id}`)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-destructive"
                onClick={() => setShowDeleteAlert(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {pet.breed && (
              <div>
                <p className="text-muted-foreground">Breed</p>
                <p>{pet.breed}</p>
              </div>
            )}
            {pet.age !== undefined && (
              <div>
                <p className="text-muted-foreground">Age</p>
                <p>{pet.age} {pet.age === 1 ? "year" : "years"}</p>
              </div>
            )}
            {pet.weight !== undefined && (
              <div>
                <p className="text-muted-foreground">Weight</p>
                <p>{pet.weight} lbs</p>
              </div>
            )}
          </div>
          {pet.notes && (
            <div className="mt-2">
              <p className="text-muted-foreground text-sm">Notes</p>
              <p className="text-sm">{pet.notes}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-muted/30 p-3">
          <Button
            variant="outline" 
            className="w-full"
            onClick={() => navigate(`/pets/${pet.id}`)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {pet.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete {pet.name} and all of their reminders.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deletePet(pet.id)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PetCard;
