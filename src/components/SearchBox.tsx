'use client'
import fetchGraphql from '@/lib/fetchGraphql';
import { UserType } from '@/lib/Interface';
import { SearchUsers } from '@/lib/queries';
import React, { useEffect, useState } from 'react';

const SearchBox = ({ onResults }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

    // Debounce the search input
    useEffect(() => {
      const handler = setTimeout(() => {
        if (searchTerm) {
          fetchUsers(searchTerm);
        }
      }, 500); // Wait for 300ms after the user stops typing
  
      return () => {
        clearTimeout(handler);
      };
    }, [searchTerm]);


  const fetchUsers = async (name:string) => {
    const variables = {name:`%${name}%`}
    const result = await fetchGraphql(SearchUsers, variables)
    onResults(result.data?.users)
  }

  return (
    <div className="px-3">
      <label htmlFor="input-group-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="input-group-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBox;
