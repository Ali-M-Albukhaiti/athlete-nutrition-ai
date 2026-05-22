interface Props {
  calories: number;
}

const ResultCard = ({ calories }: Props) => {
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
    </div>
  );
};

export default ResultCard;