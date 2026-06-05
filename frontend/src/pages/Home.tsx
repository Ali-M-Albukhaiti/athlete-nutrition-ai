import { useState } from "react";
import AthleteForm from "../components/AthleteForm";
import Navbar from "../components/Navbar";
import ResultCard from "../components/ResultCard";

const Home = () => {
  const [calories, setCalories] =
  useState<number | null>(null);

  const [goal, setGoal] =
  useState<string>("");

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 sm:px-6">
        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-56 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-cyan-300/90">
              Personalized Fueling
            </p>
            <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl">
              Athlete Nutrition Calculator
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
              Get your estimated daily calories using sport, training intensity,
              and performance goals.
            </p>
          </div>

          <AthleteForm
                onResult={(result) => {
                setCalories(result.predicted_calories);
                setGoal(result.goal);
            }}
           />

          {calories && (
            <ResultCard calories={calories} goal={goal} />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;