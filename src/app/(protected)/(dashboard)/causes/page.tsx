import { Button } from "@/components/ui/button";
import { MapPin, Plus, Search, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeaturedCause } from "@/components/features/cause/featured-cause";
import { causes } from "@/lib/constants/data";
import { CauseCard } from "@/components/features/cause/cause-card";

export default function CausesPage() {
  // Get the first cause as featured
  const featuredCause = causes[0];
  // Get trending causes (for this demo, just using the next 2 causes)
  const trendingCauses = causes.slice(1, 3);
  // Remaining causes
  const remainingCauses = causes.slice(3);

  const categories = ["All", "Environment", "Community", "Education", "Health", "Animals"];

  const tabData = [
    { value: "all", label: "All" },
    { value: "newest", label: "Newest" },
    { value: "popular", label: "Most Supported" },
    { value: "urgent", label: "Urgent" },
  ];

  return (
    <div>
      {/* Hero section */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="relative z-10 px-6 py-12 md:py-16 md:px-10 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Make an Impact in Your Community</h1>
          <p className="text-white/90 text-lg mb-6 max-w-2xl">
            Discover local causes that need your support, or create your own initiative to bring positive change to your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/causes/create">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Plus className="mr-2 h-4 w-4" />
                Start a Cause
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Search className="mr-2 h-4 w-4" />
              Explore Causes
            </Button>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full hidden lg:block">
          <div className="h-full w-full bg-[url('/placeholder.svg?height=400&width=300')] bg-cover bg-center opacity-50"></div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search for causes by name, location, or category..."
            className="pl-10 py-6 bg-white dark:bg-gray-800 border-gray-200"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className={category === "All" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}
            >
              {category}
            </Badge>
          ))}
          <Badge variant="outline" className="ml-auto">
            <MapPin className="h-3 w-3 mr-1" />
            Near Me
          </Badge>
        </div>
      </div>

      {/* Featured cause */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Cause</h2>
          <Button variant="ghost" className="text-blue-600 dark:text-blue-400">
            View All Featured
          </Button>
        </div>
        <FeaturedCause cause={featuredCause} />
      </div>

      {/* Trending causes */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold mr-2">Trending Now</h2>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trendingCauses.map((cause) => (
            <CauseCard key={cause.id} cause={cause} variant="trending" />
          ))}
        </div>
      </div>

      {/* All causes */}
      <div className="mb-10">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Explore All Causes</h2>
            <TabsList>
              {tabData.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {tabData.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              <div className="grid grid-cols-1  gap-6">
                {tab.value === "urgent"
                  ? remainingCauses.slice(0, 2).map((cause) => <CauseCard key={cause.id} cause={cause} />)
                  : remainingCauses.map((cause) => <CauseCard key={cause.id} cause={cause} />)}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Call to action */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Don't see a cause you're passionate about?</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
          Start your own initiative and rally your neighbors around issues that matter to your community.
        </p>
        <Link href="/causes/create">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Create a New Cause
          </Button>
        </Link>
      </div>
    </div>
  );
}
