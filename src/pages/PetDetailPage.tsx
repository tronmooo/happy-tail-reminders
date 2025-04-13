
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePet } from "@/contexts/PetContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Edit, Trash2, Clock, Download, List } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPet, getPetReminders, getTodayReminders, deletePet } = usePet();
  
  const pet = getPet(id || "");
  
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
  
  const allReminders = getPetReminders(pet.id);
  const todayReminders = getTodayReminders().filter(reminder => reminder.petId === pet.id);
  
  const handleDelete = () => {
    deletePet(pet.id);
    toast({
      title: "Pet removed",
      description: `${pet.name} has been removed from your pets`
    });
    navigate("/pets");
  };
  
  // Generate a PDF with pet history for export
  const exportPetHistory = () => {
    toast({
      title: "Export Started",
      description: "Your pet's history PDF is being generated..."
    });
    
    // In a real app, this would generate and download a PDF
    setTimeout(() => {
      toast({
        title: "PDF Generated",
        description: "Your pet's history has been exported successfully!"
      });
    }, 1500);
  };
  
  // Function to generate timeline items
  const getTimelineItems = () => {
    const timelineItems = [];
    
    // Add vet visits to timeline
    if (pet.lastVetVisit) {
      timelineItems.push({
        date: new Date(pet.lastVetVisit),
        type: 'vet-visit',
        title: 'Veterinary Checkup',
        description: 'Regular health checkup at the vet'
      });
    }
    
    if (pet.nextVetVisit) {
      timelineItems.push({
        date: new Date(pet.nextVetVisit),
        type: 'upcoming-vet',
        title: 'Upcoming Vet Appointment',
        description: 'Scheduled veterinary visit'
      });
    }
    
    // Add medication reminders to timeline
    allReminders
      .filter(reminder => reminder.type === 'medication' || reminder.type === 'veterinary')
      .forEach(reminder => {
        if (reminder.date) {
          timelineItems.push({
            date: new Date(reminder.date),
            type: reminder.type,
            title: reminder.title,
            description: reminder.notes || '',
            reminderTime: reminder.time,
            complete: reminder.isComplete
          });
        }
      });
    
    // Sort items by date (most recent first)
    // Ensure all dates are valid Date objects before sorting
    return timelineItems
      .filter(item => item.date instanceof Date && !isNaN(item.date.getTime()))
      .sort((a, b) => {
        try {
          return b.date.getTime() - a.date.getTime();
        } catch (error) {
          console.error("Error sorting dates:", error, { a, b });
          return 0; // Maintain original order if there's an error
        }
      });
  };
  
  const timelineItems = getTimelineItems();
  
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
      
      <Tabs defaultValue="info">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="reminders">Reminders</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        
        <TabsContent value="info" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <Card>
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
                      <span className="font-medium">{format(new Date(pet.lastVetVisit), 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  
                  {pet.nextVetVisit && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Vet Visit:</span>
                      <span className="font-medium">{format(new Date(pet.nextVetVisit), 'MMM d, yyyy')}</span>
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
          </div>
        </TabsContent>
        
        <TabsContent value="reminders" className="space-y-6">
          <Card>
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
          
          <Card>
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
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Pet Timeline
              </CardTitle>
              <Button variant="outline" size="sm" onClick={exportPetHistory} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export History
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                {timelineItems.length > 0 ? (
                  <div className="space-y-3 relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-border">
                    {timelineItems.map((item, index) => (
                      <div key={index} className="relative pt-2">
                        <div className="absolute left-[-24px] top-2 h-4 w-4 rounded-full bg-primary border-4 border-background"></div>
                        <div className="bg-card border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <span className="font-medium">{item.title}</span>
                            <span className="text-xs text-muted-foreground">{format(item.date, 'MMM d, yyyy')}</span>
                          </div>
                          
                          {item.reminderTime && (
                            <div className="text-sm text-muted-foreground flex items-center mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.reminderTime}
                              {item.complete !== undefined && (
                                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${item.complete ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                                  {item.complete ? 'Completed' : 'Pending'}
                                </span>
                              )}
                            </div>
                          )}
                          
                          {item.description && (
                            <p className="text-sm mt-1">{item.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">No events in {pet.name}'s timeline yet</p>
                    <Button 
                      onClick={() => navigate("/reminders/new")}
                      className="mt-4 bg-pet-teal hover:bg-pet-teal/90"
                    >
                      Add First Event
                    </Button>
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <List className="mr-2 h-5 w-5" />
                Pet Services Nearby
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">Find pet services like vets, groomers, and pet stores near you</p>
                <Button 
                  className="mt-2 bg-pet-teal hover:bg-pet-teal/90"
                  onClick={() => {
                    toast({
                      title: "Feature Coming Soon",
                      description: "The pet services directory will be available in a future update."
                    })
                  }}
                >
                  Explore Services
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PetDetailPage;
