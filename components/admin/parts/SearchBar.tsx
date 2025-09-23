import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative hidden md:block">
      <Search className="absolute left-2.5 text-primary-color1 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background  border-primary-color1 border-2 pl-8 md:w-[200px] lg:w-[300px]"
      />
    </div>
  );
}
