
import Image from "next/image";
import Cta from "../components/Cta";
import Faq from "../components/Faq";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <div className="px-[20px] lg:container lg:px-20">
        <Features />
        <Faq />
        {/* <Pricing /> */}
        <Cta />
      </div>
    </main>
  );
};
export default Home;
