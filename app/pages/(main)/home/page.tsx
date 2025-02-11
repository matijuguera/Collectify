import Banner from "@/app/components/ui/banner";
import { Header } from "@/app/components/ui/typography";
import { Suspense } from "react";
import SearchCard from "./ui/search-card";
import ThemeList, { ThemeListSkeleton } from "./ui/theme-list";

export default function Page() {
  // const { status } = useSession();
  // const themeListState = useThemeList();

  // if (status === "loading") {
  //   return <FullScreenSpinner />;
  // }

  // if (status === "unauthenticated") {
  //   return (
  //     <div className="flex justify-center items-center">Unauthenticated</div>
  //   );
  // }

  return (
    <div>
      <SearchCard />
      <div className="space-y-4 mb-4">
        <Header>Themes</Header>

        <Suspense fallback={<ThemeListSkeleton />}>
          <ThemeList />
        </Suspense>
      </div>

      <div className="space-y-4 mb-4">
        <Header>Your collected sets</Header>
        <Banner height="148px" src="/Paldea_evolved.jpg" />
        <Banner height="148px" src="/set2.png" />
        <Banner height="148px" src="/set2.png" />
      </div>
    </div>
  );
}
