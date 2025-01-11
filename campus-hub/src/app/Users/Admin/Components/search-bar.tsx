import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar() {
  return (
    <div className="relative mb-6 search-bar">
      <div className="relative">
        <Input
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent search-input"
          placeholder="Search Class, Documents, Activities, or Student Course Registration status..."
          type="search"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      <Button className="mt-2 search-button">Filter</Button>
    </div>
  );
}
