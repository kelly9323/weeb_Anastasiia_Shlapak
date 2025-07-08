import CompaniesBlock from "./sections/CompaniesBlock";
import HeroBlock from "./sections/HeroBlock";
import LearnBlock from "./sections/LearnBlock";
import TrendsBlock from "./sections/TrendsBlock";

export default function HomePage() {
  return (
    <>
      <HeroBlock />
      <CompaniesBlock />
      <LearnBlock />
      <TrendsBlock />
    </>
  );
}
