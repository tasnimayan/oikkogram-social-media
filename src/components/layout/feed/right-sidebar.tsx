"use client";

import React from "react";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import NearbyEvents from "@/components/widgets/nearby-events";
import PopularCauses from "@/components/widgets/popular-causes";
import NeighborhoodInfo from "@/components/widgets/neighborhood-info";
import CauseCTA from "@/components/features/cause/cause-cta";

const RightAside = () => {
  const isMobile = useIsMobile();

  if (isMobile) return null;
  return (
    <div className="pb-12 w-full p-4">
      <div className="flex flex-col gap-4">
        <NeighborhoodInfo />

        <CauseCTA />

        {/* <NearbyEvents /> */}
        <PopularCauses />
      </div>
    </div>
  );
};

export default RightAside;
