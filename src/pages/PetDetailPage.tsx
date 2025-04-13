
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePet } from "@/contexts/PetContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Edit, Trash2 } from "lucide-react";
import PetIcon from "@/components/PetIcon";
import ReminderCard from "@/components/ReminderCard";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPetById, getRemindersByPetId, getPetRemindersForToday, deletePet } = usePet();
  
  const pet = getPetById(id || "");
  
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
  
  const allReminders = getRemindersByPetId(pet.id);
  const todayReminders = getPetRemindersForToday(pet.id);
  
  const handleDelete = () => {
    deletePet(pet.id);
    toast({
      title: "Pet removed",
      description: `${pet.name} has been removed from your pets`
    });
    navigate("/pets");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/pets")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">{pet.name}</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate(`/pets/edit/${pet.id}`)} title="Edit Pet">
            <Edit className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" className="text-destructive" title="Delete Pet">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete {pet.name} and all associated reminders.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Pet Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-primary/10 p-4 rounded-lg flex justify-center">
              <div className="bg-background rounded-full p-3">
                <PetIcon petType={pet.type} size={64} className="text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span className="font-medium capitalize">{pet.type}</span>
              </div>
              
              {pet.breed && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Breed:</span>
                  <span className="font-medium">{pet.breed}</span>
                </div>
              )}
              
              {pet.age !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Age:</span>
                  <span className="font-medium">{pet.age} {pet.age === 1 ? 'year' : 'years'}</span>
                </div>
              )}
              
              {pet.weight !== undefined && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="font-medium">{pet.weight} kg</span>
                </div>
              )}
              
              {pet.lastVetVisit && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Vet Visit:</span>
                  <span className="font-medium">{format(pet.lastVetVisit, 'MMM d, yyyy')}</span>
                </div>
              )}
              
              {pet.nextVetVisit && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Vet Visit:</span>
                  <span className="font-medium">{format(pet.nextVetVisit, 'MMM d, yyyy')}</span>
                </div>
              )}
            </div>
            
            {pet.notes && (
              <div className="border-t pt-3 mt-3">
                <span className="text-muted-foreground block mb-1">Notes:</span>
                <p>{pet.notes}</p>
              </div>
            )}
            
            <Button 
              onClick={() => navigate("/reminders/new")}
              className="w-full mt-4 bg-pet-teal hover:bg-pet-teal/90"
            >
              Add Reminder for {pet.name}
            </Button>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Today's Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayReminders.length > 0 ? (
              <div className="space-y-3">
                {todayReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No reminders for today</p>
                <Button 
                  onClick={() => navigate("/reminders/new")}
                  className="mt-4 bg-pet-teal hover:bg-pet-teal/90"
                >
                  Add Reminder
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>All Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            {allReminders.length > 0 ? (
              <div className="space-y-3">
                {allReminders.map((reminder) => (
                  <ReminderCard key={reminder.id} reminder={reminder} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No reminders for {pet.name}</p>
                <Button 
                  onClick={() => navigate("/reminders/new")}
                  className="mt-4 bg-pet-teal hover:bg-pet-teal/90"
                >
                  Add First Reminder
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PetDetailPage;
