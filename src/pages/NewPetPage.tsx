
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const NewPetPage = () => {
  const navigate = useNavigate();
  const { addPet } = usePet();
  
  const [name, setName] = useState("");
  const [type, setType] = useState<PetType>("dog");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState<number | undefined>(undefined);
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState("");
  
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
    
    addPet({
      name,
      type,
      breed: breed || undefined,
      age,
      weight,
      notes: notes || undefined
    });
    
    toast({
      title: "Pet added",
      description: `${name} has been added to your pets`
    });
    
    navigate("/pets");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/pets")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Add New Pet</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-2">
                <PetIcon petType={type} size={18} className="text-primary" />
              </div>
              <span>{name || "New Pet"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/pets")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pet-orange hover:bg-pet-orange/90">
              Save Pet
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewPetPage;
