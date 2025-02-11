import { GET } from "@/app/api/themes/route";
import Banner, { BannerSkeleton } from "@/app/components/ui/banner";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { Label } from "@/app/components/ui/typography";
import { Plus } from "lucide-react";

export default async function ThemeList() {
  const themesGetter = await GET();
  const themes = await themesGetter.json();

  if (!themes || !themes.length) {
    return <Label>No themes available.</Label>;
  }

  return (
    <div>
      {themes.slice(0, 3).map((theme: { photoBase64: string; id: string }) => (
        <Banner
          key={theme.id}
          src={`data:image/png;base64,${theme.photoBase64}`}
        />
      ))}

      {3 < themes.length && (
        <Button className="w-full" onClick={() => {}}>
          <Plus />
          More
        </Button>
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
