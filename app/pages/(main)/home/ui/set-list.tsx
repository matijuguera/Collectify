"use client";

import Banner, { BannerSkeleton } from "@/app/components/ui/banner";
import { Label } from "@/app/components/ui/typography";
import { useEffect, useState } from "react";

// TODO: Replace with actual type from backend
interface SetWithPhoto {
  id: string;
  name: string;
  photoBase64: string;
}

export function SetList() {
  const [sets, setSets] = useState<SetWithPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSets() {
      try {
        // TODO: Replace with actual API call
        // const response = await getSets();
        // setSets(response);
        setSets([]);
      } catch (error) {
        console.error("Failed to fetch sets:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSets();
  }, []);

  if (isLoading) {
    return <SetListSkeleton />;
  }

  return (
    <div>
      {sets.length === 0 ? (
        <Label className="block text-center py-4">No sets collected yet</Label>
      ) : (
        sets.map((set) => <Banner key={set.id} src={set.photoBase64} />)
      )}
    </div>
  );
}

export function SetListSkeleton() {
  return (
    <div className="space-y-4">
      <BannerSkeleton />
      <BannerSkeleton />
      <BannerSkeleton />
    </div>
  );
}
