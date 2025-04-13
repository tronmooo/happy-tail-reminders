
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Share2 } from "lucide-react";

interface ForumCardProps {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  replies: number;
  likes: number;
  isExpert?: boolean;
}

const ForumCard = ({ 
  title, 
  content, 
  author, 
  createdAt, 
  replies,
  likes,
  isExpert
}: ForumCardProps) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center">
                <span className="font-medium">{author.name}</span>
                {isExpert && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Expert
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {createdAt.toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <CardDescription className="text-sm text-foreground">
          {content.length > 150 ? content.substring(0, 150) + "..." : content}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <div className="flex space-x-4">
          <Button variant="ghost" size="sm" className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="text-xs">{replies}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center">
            <Heart className="h-4 w-4 mr-1" />
            <span className="text-xs">{likes}</span>
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-1" />
          <span className="text-xs">Share</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ForumCard;
