
import { Button } from "@/components/ui/button";
import { usePet } from "@/contexts/PetContext";
import { PawPrint, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PetCard from "@/components/PetCard";

const PetsPage = () => {
  const { pets } = usePet();
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Pets</h1>
        <Button onClick={() => navigate("/pets/new")} className="bg-pet-orange hover:bg-pet-orange/90">
          <Plus className="mr-2 h-4 w-4" /> Add Pet
        </Button>
      </div>
      
      {pets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 space-y-4">
          <div className="bg-primary/10 mx-auto w-16 h-16 rounded-full flex items-center justify-center">
            <PawPrint className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">No pets added yet</h2>
          <p className="text-muted-foreground">
            Add your pets to start managing their care
          </p>
          <Button 
            onClick={() => navigate("/pets/new")}
            className="mt-2 bg-pet-orange hover:bg-pet-orange/90"
          >
            <PawPrint className="mr-2 h-4 w-4" /> Add Your First Pet
          </Button>
        </div>
      )}
    </div>
  );
};

export default PetsPage;
