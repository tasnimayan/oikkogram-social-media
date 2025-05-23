import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

export const CauseHero = () => {
    return (
        <div className="relative rounded-xl overflow-hidden mb-8 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90">
        <div className="px-6 py-12 md:py-16 md:px-10 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Make an Impact in Your Community</h1>
          <p className="text-white/90 text-lg mb-6 max-w-2xl">
            Discover local causes that need your support, or create your own initiative to bring positive change to your
            neighborhood.
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
      </div>
    );
};