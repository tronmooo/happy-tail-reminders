
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Search, Filter, MessageSquare, BookOpen } from "lucide-react";
import ForumCard from "@/components/ForumCard";
import ArticleCard from "@/components/ArticleCard";

// Demo data for forums
const forumDiscussions = [
  {
    id: "1",
    title: "What's the best food for a senior Labrador?",
    content: "My 10-year-old Lab has been showing less interest in his regular food lately. Any recommendations for senior dog food brands that are both nutritious and appetizing?",
    author: {
      name: "DogLover22",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    createdAt: new Date("2025-04-02"),
    replies: 24,
    likes: 15,
    isExpert: false
  },
  {
    id: "2",
    title: "Dealing with separation anxiety post-pandemic",
    content: "Since returning to the office, my dog has been showing signs of separation anxiety. She's destroying furniture and barking excessively. I've tried leaving the TV on and giving her toys, but nothing seems to help. Any advice from other pet owners who've dealt with this?",
    author: {
      name: "Dr. Emily Watson",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    createdAt: new Date("2025-04-05"),
    replies: 42,
    likes: 35,
    isExpert: true
  },
  {
    id: "3",
    title: "Cat suddenly refusing to use litter box",
    content: "My 3-year-old cat has suddenly stopped using her litter box. I haven't changed the litter brand and the box is clean. She's using random spots around the house instead. No changes in diet or environment. What could be causing this?",
    author: {
      name: "CatMom123",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    createdAt: new Date("2025-04-10"),
    replies: 18,
    likes: 9,
    isExpert: false
  }
];

// Demo data for articles
const articles = [
  {
    id: "1",
    title: "10 Essential Grooming Tips for Long-Haired Dogs",
    summary: "Proper grooming is essential for keeping your long-haired dog healthy and comfortable. This article covers brushing techniques, bathing frequency, and tools that make grooming easier.",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Grooming", "Dogs", "Care Tips"],
    readTime: 5,
    date: new Date("2025-04-05")
  },
  {
    id: "2",
    title: "Understanding Your Cat's Body Language",
    summary: "Cats communicate primarily through body language. Learn to decode your cat's postures, tail movements, and vocalizations to better understand their needs and emotions.",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Cats", "Behavior", "Understanding"],
    readTime: 7,
    date: new Date("2025-03-28")
  },
  {
    id: "3",
    title: "The Benefits of Regular Vet Check-ups for Pets",
    summary: "Preventive care is crucial for your pet's long-term health. Discover why regular veterinary check-ups are important and what typically happens during these appointments.",
    image: "https://images.unsplash.com/photo-1628009368231-4e342f63d929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tags: ["Health", "Veterinary", "Preventive Care"],
    readTime: 6,
    date: new Date("2025-04-12")
  }
];

const CommunityPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("forums");

  const handleNewPost = () => {
    toast({
      title: "Feature Coming Soon",
      description: "The ability to create new posts will be available soon!",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Community & Support</h1>
      </div>

      <Tabs defaultValue="forums" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="forums" className="flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Forums
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Articles & Tips
            </TabsTrigger>
          </TabsList>

          {activeTab === "forums" && (
            <Button onClick={handleNewPost}>
              <MessageSquare className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder={activeTab === "forums" ? "Search discussions..." : "Search articles..."} 
              className="pl-9"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <TabsContent value="forums" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {forumDiscussions.map((discussion) => (
              <ForumCard key={discussion.id} {...discussion} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunityPage;
