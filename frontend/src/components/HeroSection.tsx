// components/HeroSection.tsx
import { useState } from "react";

const HeroSection = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mb-10 text-center">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1">
        <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-cyan-400"></span>
        <span className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
          AI-Powered Nutrition
        </span>
      </div>

      {/* Main Title */}
      <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl md:text-6xl">
        Smart Nutrition for
        <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Peak Performance
        </span>
      </h2>

      {/* Short Description */}
      <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
        Get personalized daily calorie recommendations powered by machine 
        learning. Our AI analyzes your sport, training intensity, and goals 
        to give you precise nutrition guidance.
      </p>

      {/* Key Features - 3 columns */}
      <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/5 bg-slate-800/50 p-3 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🎯</span>
            <span className="text-xs font-medium text-slate-300">
              Personalized to your sport
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-800/50 p-3 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🧠</span>
            <span className="text-xs font-medium text-slate-300">
              AI neural network model
            </span>
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-slate-800/50 p-3 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-xs font-medium text-slate-300">
              Considers recovery needs
            </span>
          </div>
        </div>
      </div>

      {/* Expandable "About" Section */}
      <div className="mx-auto mt-6 max-w-3xl">
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-sm text-cyan-300 transition hover:text-cyan-200 hover:underline"
        >
          {showMore ? "Hide details" : "Learn more about how it works ↓"}
        </button>

        {showMore && (
          <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-slate-800/60 p-6 text-left backdrop-blur-sm">
            <h4 className="text-sm font-semibold text-white">How It Works</h4>
            <p className="text-xs leading-relaxed text-slate-300">
              This AI system uses a <strong className="text-cyan-300">neural network</strong> trained on 1500  
              of athlete profiles to predict your daily calorie needs. It considers:
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>Your sport type</strong> — Different sports have different energy demands (football, running, bodybuilding, MMA)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>Training intensity & duration</strong> — Higher intensity burns more calories</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>Previous 2 days of training</strong> — Your body needs extra calories for recovery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400">•</span>
                <span><strong>Your goal</strong> — Whether you want fat loss, maintenance, muscle gain, or endurance performance</span>
              </li>
            </ul>
            <div className="mt-2 rounded-xl bg-slate-900/60 p-3">
              <p className="text-xs text-slate-400">
                💡 <strong className="text-slate-300">Tip:</strong> Fill in today's inputs and your profile 
                (height, age, previous days) will be saved automatically in your browser.
              </p>
            </div>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
              <p className="text-xs text-amber-200/80">
                ⚠️ <strong>Disclaimer:</strong> This is a prototype for educational purposes. 
                Always consult a qualified nutritionist or doctor for professional advice.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;