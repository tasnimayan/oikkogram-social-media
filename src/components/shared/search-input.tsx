import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search, X } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const SearchInput = ({
  onChange,
  placeholder = "search",
  className,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onChange(e);
  };
  const handleClear = () => {
    if (searchValue) {
      setSearchValue("");
    }
    if (onChange) {
      const event = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className={cn("pl-9 h-input", className)}
        type="text"
        id="search-conversation"
        value={searchValue}
        onChange={onValueChange}
        autoComplete="off"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-0 top-0 block h-full px-3 py-2 text-border hover:bg-transparent peer-placeholder-shown:hidden"
        onClick={handleClear}
      >
        <X />
        <span className="sr-only">Clear search</span>
      </Button>
    </div>
  );
};

export default SearchInput;
