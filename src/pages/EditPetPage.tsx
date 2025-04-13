
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PetType } from "@/types";
import { usePet } from "@/contexts/PetContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PetIcon from "@/components/PetIcon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

const EditPetPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getPet, updatePet } = usePet();
  
  // Get pet from context
  const pet = getPet(id || "");
  
  // State for basic pet info
  const [name, setName] = useState("");
  const [type, setType] = useState<PetType>("dog");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "unknown">("unknown");
  
  // State for medical info
  const [lastVetVisit, setLastVetVisit] = useState("");
  const [nextVetVisit, setNextVetVisit] = useState("");
  const [allergies, setAllergies] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  
  // Load pet data when component mounts
  useEffect(() => {
    if (pet) {
      setName(pet.name);
      setType(pet.type);
      setBreed(pet.breed || "");
      setAge(pet.age);
      setWeight(pet.weight);
      setNotes(pet.notes || "");
      setGender(pet.gender || "unknown");
      
      // Format dates for input fields
      if (pet.lastVetVisit) {
        setLastVetVisit(format(new Date(pet.lastVetVisit), "yyyy-MM-dd"));
      }
      if (pet.nextVetVisit) {
        setNextVetVisit(format(new Date(pet.nextVetVisit), "yyyy-MM-dd"));
      }
      
      setAllergies((pet.allergies || []).join(", "));
      setDietaryRestrictions((pet.dietaryRestrictions || []).join(", "));
    }
  }, [pet]);
  
  if (!pet) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/pets")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Pet Not Found</h1>
        </div>
        <Card>
          <CardContent className="py-8 text-center">
            <p>Sorry, we couldn't find this pet in your records.</p>
            <Button onClick={() => navigate("/pets")} className="mt-4">
              Return to Pets
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your pet",
        variant: "destructive"
      });
      return;
    }
    
    const updatedPet = {
      ...pet,
      name,
      type,
      breed: breed || undefined,
      age,
      weight,
      notes: notes || undefined,
      gender: gender as "male" | "female" | "unknown",
      lastVetVisit: lastVetVisit ? new Date(lastVetVisit) : undefined,
      nextVetVisit: nextVetVisit ? new Date(nextVetVisit) : undefined,
      allergies: allergies ? allergies.split(",").map(item => item.trim()) : undefined,
      dietaryRestrictions: dietaryRestrictions ? dietaryRestrictions.split(",").map(item => item.trim()) : undefined
    };
    
    updatePet(updatedPet);
    
    toast({
      title: "Pet updated",
      description: `${name}'s information has been updated successfully`
    });
    
    navigate(`/pets/${pet.id}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(`/pets/${pet.id}`)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Edit {pet.name}</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <PetIcon petType={type} size={18} className="text-primary" />
              </div>
              <span>{name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="space-y-4">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="medical">Medical Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Pet Name *</Label>
                  <Input 
                    id="name" 
                    placeholder="e.g., Buddy, Whiskers"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Pet Type</Label>
                  <Select value={type} onValueChange={(value) => setType(value as PetType)}>
                    <SelectTrigger id="type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dog">Dog</SelectItem>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="bird">Bird</SelectItem>
                      <SelectItem value="fish">Fish</SelectItem>
                      <SelectItem value="rabbit">Rabbit</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={(value) => setGender(value as "male" | "female" | "unknown")}>
                    <SelectTrigger id="gender">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="breed">Breed (Optional)</Label>
                  <Input 
                    id="breed" 
                    placeholder="e.g., Labrador, Persian"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age in Years (Optional)</Label>
                    <Input 
                      id="age" 
                      type="number"
                      placeholder="e.g., 3"
                      value={age === undefined ? "" : age}
                      onChange={(e) => setAge(e.target.value ? Number(e.target.value) : undefined)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight in kg (Optional)</Label>
                    <Input 
                      id="weight" 
                      type="number"
                      placeholder="e.g., 12.5"
                      value={weight === undefined ? "" : weight}
                      onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : undefined)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Add any additional notes about your pet here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="medical" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="lastVetVisit">Last Vet Visit</Label>
                    <Input 
                      id="lastVetVisit" 
                      type="date"
                      value={lastVetVisit}
                      onChange={(e) => setLastVetVisit(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="nextVetVisit">Next Vet Visit</Label>
                    <Input 
                      id="nextVetVisit" 
                      type="date"
                      value={nextVetVisit}
                      onChange={(e) => setNextVetVisit(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies (comma separated)</Label>
                  <Input 
                    id="allergies" 
                    placeholder="e.g., Chicken, Peanut butter"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">Dietary Restrictions (comma separated)</Label>
                  <Input 
                    id="dietaryRestrictions" 
                    placeholder="e.g., Grain-free, Low fat"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate(`/pets/${pet.id}`)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pet-orange hover:bg-pet-orange/90">
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default EditPetPage;
