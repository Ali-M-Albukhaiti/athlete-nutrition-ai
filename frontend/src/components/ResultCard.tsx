import { calculateMacros } from "../utils/calculateMacros";

interface Props {
  calories: number;
  goal: string;
}

const ResultCard = ({
  calories,
  goal,
}: Props) => {
  const macros = calculateMacros(
    calories,
    goal
  );

  return (
    <div className="mt-6 rounded-3xl border border-cyan-400/20 bg-slate-900/70 p-6 text-center shadow-2xl shadow-cyan-900/30 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
        Daily Target
      </p>

      <h3 className="mt-2 text-2xl font-bold text-white">
        Calories Needed
      </h3>

      <p className="mt-4 text-5xl font-black text-cyan-300">
        {calories}
        <span className="ml-2 text-lg font-semibold text-cyan-100/90">
          kcal
        </span>
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-slate-800/70 p-4">
          <p className="text-sm text-slate-400">
            Protein
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {macros.protein}g
          </p>
        </div>

        <div className="rounded-2xl bg-slate-800/70 p-4">
          <p className="text-sm text-slate-400">
            Carbs
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {macros.carbs}g
          </p>
        </div>

        <div className="rounded-2xl bg-slate-800/70 p-4">
          <p className="text-sm text-slate-400">
            Fat
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {macros.fat}g
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;