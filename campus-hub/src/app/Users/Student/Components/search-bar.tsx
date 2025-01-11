import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  return (
    <div className="search-bar">
      <div className="search-bar-input-wrapper">
        <Search className="search-bar-icon" />
        <Input
          placeholder="Search courses..."
          type="search"
        />
      </div>
      <Button className="bg-indigo-600 text-white hover:bg-indigo-700">
        Search
      </Button>
    </div>
  )
}

