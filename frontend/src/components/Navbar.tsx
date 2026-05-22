const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 px-6 py-4 shadow-xl backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">
            Smart Performance
          </p>
          <h1 className="text-2xl font-black text-white sm:text-3xl">
            Athlete Nutrition AI
          </h1>
        </div>
        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-200">
          Beta
        </span>
      </div>
    </nav>
  );
};

export default Navbar;