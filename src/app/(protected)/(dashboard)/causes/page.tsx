import { CauseHero } from "@/components/features/cause/cause-hero";
import CauseFilter from "@/components/features/cause/cause-filter";
import CauseList from "@/components/features/cause/cause-list";

export default function CausesPage() {
  return (
    <div>
      {/* Hero section */}
      <CauseHero />

      {/* Search and filters */}
      <CauseFilter />

      <CauseList />
    </div>
  );
}
