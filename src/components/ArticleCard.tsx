
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  image: string;
  tags: string[];
  readTime: number;
  date: Date;
}

const ArticleCard = ({ 
  title, 
  summary, 
  image, 
  tags, 
  readTime,
  date 
}: ArticleCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md mb-6">
      <div>
        <AspectRatio ratio={16 / 9}>
          <img 
            src={image} 
            alt={title} 
            className="object-cover w-full h-full rounded-t-md"
          />
        </AspectRatio>
      </div>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, i) => (
            <Badge key={i} variant="secondary">{tag}</Badge>
          ))}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex items-center text-xs text-muted-foreground">
          <span>{date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
          <span className="mx-2">•</span>
          <span>{readTime} min read</span>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-foreground">
          {summary}
        </CardDescription>
      </CardContent>
      <CardFooter className="bg-muted/30 p-3">
        <Button variant="outline" className="w-full">
          <BookOpen className="h-4 w-4 mr-2" />
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
