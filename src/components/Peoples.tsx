"use client";

import PeopleCard from "./PeopleCard";
import fetchGraphql from "@/lib/fetchGraphql";
import { getAllPeople } from "@/lib/queries";
import Spinner from "./Spinner";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";

const Peoples = () => {
  const { data: session } = useSession();

  const { data, error, isLoading } = useQuery({
    queryKey: ["peoples"],
    queryFn: async () => {
      let variables = {
        id: session.user?.id,
      };
      return await fetchGraphql(getAllPeople, variables);
    },
  });

  if (isLoading) return <Spinner className="p-6 mt-6" />;

  if (error || data.errors) return <p>An error occurred</p>;

  return (
    <>
      {data.data?.users.map((item, idx) => {
        return <PeopleCard key={idx} people={item} />;
      })}
    </>
  );
};

export default Peoples;
