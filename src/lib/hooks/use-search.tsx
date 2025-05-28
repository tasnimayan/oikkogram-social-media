import { useMemo, useState } from "react";

export function useSearch(searchKeys: string[]) {
  const [searchValue, setSearchValue] = useState("");

  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setSearchValue(e.target.value);
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  const searchFilters = useMemo(() => generateSearchFilter({ searchKeys, searchValue }), [searchKeys, searchValue]);

  return { searchFilters, onChange };
}

const generateSearchFilter = ({
  searchKeys,
  searchValue,
}: {
  searchKeys: string[];
  searchValue: string;
}): SearchFilter[] => {
  if (!searchValue) return [];

  return searchKeys.map(key => {
    const keys = key.split(".");
    let nested: SearchFilter = { _ilike: `%${searchValue}%` };

    for (let i = keys.length - 1; i >= 0; i--) {
      nested = { [keys[i]]: nested };
    }

    return nested;
  });
};

export type SearchFilter = {
  [key: string]: string | SearchFilter;
};
