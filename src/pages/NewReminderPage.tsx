
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ReminderType } from "@/types";
import { usePet } from "@/contexts/PetContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ReminderIcon from "@/components/ReminderIcon";

const NewReminderPage = () => {
  const navigate = useNavigate();
  const { pets, addReminder } = usePet();
  
  const [title, setTitle] = useState("");
  const [petId, setPetId] = useState("");
  const [type, setType] = useState<ReminderType>("feeding");
  const [frequency, setFrequency] = useState<"once" | "daily" | "weekly" | "monthly">("daily");
  const [time, setTime] = useState("08:00");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !petId || !time) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const reminderDate = frequency === "once" && date ? new Date(date) : undefined;
    
    addReminder({
      title,
      petId,
      type,
      frequency,
      time,
      date: reminderDate,
      notes: notes || undefined,
      isComplete: false
    });
    
    toast({
      title: "Reminder created",
      description: "Your reminder has been added successfully"
    });
    
    navigate("/reminders");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => navigate("/reminders")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold">Add New Reminder</h1>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ReminderIcon reminderType={type} className="mr-2 text-primary" />
              <span>{title || "New Reminder"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Reminder Title *</Label>
              <Input 
                id="title" 
                placeholder="e.g., Morning Feeding, Evening Walk"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pet">For Pet *</Label>
              <Select value={petId} onValueChange={setPetId} required>
                <SelectTrigger id="pet">
                  <SelectValue placeholder="Select a pet" />
                </SelectTrigger>
                <SelectContent>
                  {pets.map(pet => (
                    <SelectItem key={pet.id} value={pet.id}>{pet.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Reminder Type</Label>
                <Select value={type} onValueChange={(value) => setType(value as ReminderType)}>
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="feeding">Feeding</SelectItem>
                    <SelectItem value="walking">Walking</SelectItem>
                    <SelectItem value="grooming">Grooming</SelectItem>
                    <SelectItem value="medication">Medication</SelectItem>
                    <SelectItem value="veterinary">Veterinary</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={(value) => setFrequency(value as any)}>
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              
              {frequency === "once" && (
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input 
                    id="date" 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Add any additional notes here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => navigate("/reminders")}>
              Cancel
            </Button>
            <Button type="submit" className="bg-pet-teal hover:bg-pet-teal/90">
              Save Reminder
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewReminderPage;
