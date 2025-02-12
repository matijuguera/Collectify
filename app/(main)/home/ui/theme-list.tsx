"use client";

import Banner, { BannerSkeleton } from "@/components/ui/banner";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";
import { getThemes } from "@/lib/api/theme";
import { ThemeWithPhoto } from "@/prisma/custom-models";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const THEMES_PER_PAGE = 3;

export function ThemeList() {
  const { toast } = useToast();
  const [themes, setThemes] = useState<ThemeWithPhoto[]>([]);
  const [visibleThemes, setVisibleThemes] = useState<ThemeWithPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setIsLoading(true);
        const themes = await getThemes();
        setThemes(themes);
        setVisibleThemes(themes.slice(0, THEMES_PER_PAGE));
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Fetching themes error",
          description: (error as Error).message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchThemes();
  }, []);

  const handleMoreThemes = () => {
    setThemes(themes.slice(0, themes.length + 3));
  };

  return (
    <div>
      {isLoading ? (
        <ThemeListSkeleton />
      ) : (
        <>
          {visibleThemes.length === 0 ? (
            <Label className="block text-center py-4">
              No themes available
            </Label>
          ) : (
            <>
              {visibleThemes.map((theme: ThemeWithPhoto) => (
                <Banner
                  key={theme.id}
                  src={`data:image/png;base64,${theme.photoBase64}`}
                />
              ))}

              {THEMES_PER_PAGE < themes.length && (
                <Button className="w-full" onClick={handleMoreThemes}>
                  <Plus />
                  More
                </Button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export function ThemeListSkeleton() {
  return (
    <div className="space-y-4">
      <BannerSkeleton />
      <BannerSkeleton />
      <Skeleton className="w-full h-[36px]" />
    </div>
  );
}
