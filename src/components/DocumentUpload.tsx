
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Camera, Upload, X } from "lucide-react";
import { DocumentType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  petId: string;
  onSave: (data: {
    title: string;
    type: DocumentType;
    date: Date;
    imageUrl: string;
    notes?: string;
  }) => void;
  onCancel: () => void;
}

const DocumentUpload = ({ petId, onSave, onCancel }: DocumentUploadProps) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<DocumentType>("other");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [notes, setNotes] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCapture = async () => {
    try {
      // This would use the device camera in a real implementation
      // For now, we'll just open the file dialog
      document.getElementById("file-upload")?.click();
      toast({
        title: "Camera accessed",
        description: "Please take a photo of the document",
      });
    } catch (error) {
      toast({
        title: "Camera access failed",
        description: "Please grant camera permissions or upload a file instead",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast({
        title: "Required field missing",
        description: "Please provide a title for the document",
        variant: "destructive",
      });
      return;
    }

    if (!imagePreview) {
      toast({
        title: "Image required",
        description: "Please upload or capture an image of the document",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // In a real app, we would upload the image to storage here
    // For now, we'll just use the data URL
    
    setTimeout(() => {
      onSave({
        title,
        type,
        date: new Date(date),
        imageUrl: imagePreview,
        notes: notes || undefined,
      });
      
      setIsLoading(false);
      toast({
        title: "Document saved",
        description: "Your document has been successfully saved",
      });
    }, 1000);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Document Title</Label>
            <Input
              id="title"
              placeholder="Vaccination Certificate"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Document Type</Label>
            <Select value={type} onValueChange={(value) => setType(value as DocumentType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vaccination">Vaccination</SelectItem>
                <SelectItem value="medical">Medical Record</SelectItem>
                <SelectItem value="prescription">Prescription</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="registration">Registration</SelectItem>
                <SelectItem value="adoption">Adoption</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Document Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about this document..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Document Image</Label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative mt-2">
                <img
                  src={imagePreview}
                  alt="Document preview"
                  className="w-full max-h-[300px] object-contain rounded-md border border-border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => setImagePreview(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 items-center justify-center p-6 border-2 border-dashed border-border rounded-md bg-muted/50">
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload File
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCapture}
                    className="flex items-center gap-2"
                  >
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  JPG, PNG or GIF, max 5MB
                </p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Document"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DocumentUpload;
