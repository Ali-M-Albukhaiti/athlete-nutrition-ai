import { useState } from "react";
import AthleteForm from "../components/AthleteForm";
import Navbar from "../components/Navbar";
import ResultCard from "../components/ResultCard";
import HeroSection from "../components/HeroSection"; // Import new component
import Footer from "../components/Footer";

const Home = () => {
  const [calories, setCalories] = useState<number | null>(null);
  const [goal, setGoal] = useState<string>("");

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 sm:px-6">
        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-56 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          {/* Replace old description with HeroSection */}
          <HeroSection />

          <AthleteForm
            onResult={(result) => {
              setCalories(result.predicted_calories);
              setGoal(result.goal);
            }}
          />

          {calories && (
            <ResultCard calories={calories} goal={goal} />
          )}
           <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;