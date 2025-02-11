import { Header } from "@/app/components/ui/typography";
import SearchCard from "./ui/search-card";
import { SetList } from "./ui/set-list";
import { ThemeList } from "./ui/theme-list";

export default function Page() {
  return (
    <div>
      <SearchCard />
      <div className="space-y-4 mb-4">
        <Header>Themes</Header>
        <ThemeList />
      </div>

      <div className="space-y-4 mb-4">
        <Header>Your collected sets</Header>
        <SetList />
      </div>
    </div>
  );
}
