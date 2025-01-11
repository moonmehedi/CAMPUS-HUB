import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

export function SearchBar() {
  return (
    <div className="search-bar">
      <Search className="search-icon" />
      <Input
        className="search-input"
        placeholder="Search By Name or Id"
        type="search"
      />
    </div>
  )
}

