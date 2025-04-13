
import React from "react";
import { PetDocument } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Download, Eye, FileText, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DocumentCardProps {
  document: PetDocument;
  onDelete: (id: string) => void;
}

const DocumentCard = ({ document, onDelete }: DocumentCardProps) => {
  const handleDownload = () => {
    // In a real app, this would download the document
    // For now, we'll just open the image in a new tab
    window.open(document.imageUrl, "_blank");
  };

  return (
    <Card className="overflow-hidden">
      <div className="flex items-start p-4 gap-4">
        <div className="bg-primary/10 p-2 rounded-md">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-medium text-lg truncate">{document.title}</h3>
            <Badge className="capitalize">{document.type}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(new Date(document.date), "MMMM d, yyyy")}
          </p>
          {document.notes && (
            <p className="text-sm mt-1 line-clamp-2">{document.notes}</p>
          )}
        </div>
      </div>

      <CardFooter className="flex justify-between border-t p-2 bg-muted/30 gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{document.title}</DialogTitle>
              <DialogDescription>
                {document.type} - {format(new Date(document.date), "MMMM d, yyyy")}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <img
                src={document.imageUrl}
                alt={document.title}
                className="w-full max-h-[70vh] object-contain rounded-md"
              />
              {document.notes && (
                <div className="mt-4 p-4 bg-muted rounded-md">
                  <h4 className="font-medium mb-1">Notes:</h4>
                  <p>{document.notes}</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-destructive hover:text-destructive"
          onClick={() => onDelete(document.id)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;
