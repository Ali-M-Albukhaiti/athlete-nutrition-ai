import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { predictCalories } from "../api/nutritionApi";
import type {
  AthleteProfile,
  NutritionResponse,
  SessionInputs,
} from "../types/nutrition";
import {
  GOAL_OPTIONS,
  INTENSITY_OPTIONS,
  SPORT_OPTIONS,
} from "../types/nutrition";
import {
  defaultAthleteProfile,
  loadAthleteProfile,
  saveAthleteProfile,
} from "../utils/athleteProfileStorage";

interface Props {
  onResult: (data: NutritionResponse) => void;
}

const defaultSession: SessionInputs = {
  Sport: "football",
  Weight: 82,
  Goal: "maintenance",
  CurrentDay_Intensity: "medium",
  CurrentDay_Duration: 76,
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40";

/* ---------------------- EXPLANATIONS ---------------------- */

const intensityDescriptions: Record<
  string,
  { title: string; description: string }
> = {
  low: {
    title: "Low Intensity",
    description:
      "Examples: walking, stretching, easy cycling, light physical activity for 30–60 minutes.",
  },
  medium: {
    title: "Medium Intensity",
    description:
      "Examples: jogging, gym workout, football training, or moderate exercise for 45–90 minutes.",
  },
  high: {
    title: "High Intensity",
    description:
      "Examples: intense football match, MMA training, sprint sessions, heavy strength training, or hard exercise for 60–120 minutes.",
  },
};

const goalDescriptions: Record<string, string> = {
  fat_loss: "Reduce body fat while maintaining muscle mass.",
  maintenance: "Maintain your current weight and performance.",
  muscle_gain: "Increase muscle mass by consuming additional calories.",
  endurance_performance:
    "Support longer and more demanding training sessions.",
};

/* --------------------------------------------------------- */

const AthleteForm = ({ onResult }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<AthleteProfile>(loadAthleteProfile);
  const [session, setSession] = useState<SessionInputs>(defaultSession);

  const [openInfo, setOpenInfo] = useState<Record<string, boolean>>({});

  useEffect(() => {
    saveAthleteProfile(profile);
  }, [profile]);

  const toggleInfo = (key: string) => {
    setOpenInfo((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSessionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setSession((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const resetProfile = () => setProfile(defaultAthleteProfile);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await predictCalories({
        ...profile,
        ...session,
      });
      onResult(result);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- UI HELPERS ---------------- */

  const intensityBlock = (value: string, key: string) => {
    const data = intensityDescriptions[value];
    if (!data) return null;

    return (
      <div className="mt-2">
        <button
          type="button"
          onClick={() => toggleInfo(key)}
          className="text-xs text-cyan-300 hover:underline"
        >
          What does this mean?
        </button>

        {openInfo[key] && (
          <div className="mt-2 rounded-xl bg-slate-800/60 p-3 text-xs text-slate-300">
            <strong>{data.title}</strong>
            <p>{data.description}</p>
          </div>
        )}
      </div>
    );
  };

  const goalBlock = (value: string) => {
    return (
      <div className="mt-2">
        <button
          type="button"
          onClick={() => toggleInfo("goal")}
          className="text-xs text-cyan-300 hover:underline"
        >
          What does this mean?
        </button>

        {openInfo["goal"] && (
          <div className="mt-2 rounded-xl bg-slate-800/60 p-3 text-xs text-slate-300">
            {goalDescriptions[value]}
          </div>
        )}
      </div>
    );
  };

  /* ---------------- RENDER ---------------- */

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
    >
      {/* PROFILE */}
      <section className="space-y-5">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Athlete profile
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Height, age, and previous training days are saved in your browser.
            </p>
          </div>

          <button
            type="button"
            onClick={resetProfile}
            className="text-sm text-cyan-300 hover:underline"
          >
            Reset profile
          </button>
        </div>

        {/* Height */}
        <div>
          <label className="text-sm text-slate-200">Height (cm)</label>
          <input
            name="Height"
            type="number"
            value={profile.Height}
            onChange={handleProfileChange}
            className={fieldClass}
          />
        </div>

        {/* Age */}
        <div>
          <label className="text-sm text-slate-200">Age</label>
          <input
            name="Age"
            type="number"
            value={profile.Age}
            onChange={handleProfileChange}
            className={fieldClass}
          />
        </div>

        {/* Previous Day 2 */}
        <div>
          <label className="text-sm text-slate-200">
            Two days ago — Intensity
          </label>

          <select
            name="PreviousDay2_Intensity"
            value={profile.PreviousDay2_Intensity}
            onChange={handleProfileChange}
            className={fieldClass}
          >
            {INTENSITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {intensityBlock(profile.PreviousDay2_Intensity, "p2")}
        </div>

        {/* Previous Day 2 Duration */}
        <div>
          <label className="text-sm text-slate-200">
            Two days ago — Duration (min)
          </label>

          <input
            name="PreviousDay2_Duration"
            type="number"
            value={profile.PreviousDay2_Duration}
            onChange={handleProfileChange}
            className={fieldClass}
          />
        </div>

        {/* Previous Day 1 */}
        <div>
          <label className="text-sm text-slate-200">
            Yesterday — Intensity
          </label>

          <select
            name="PreviousDay1_Intensity"
            value={profile.PreviousDay1_Intensity}
            onChange={handleProfileChange}
            className={fieldClass}
          >
            {INTENSITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {intensityBlock(profile.PreviousDay1_Intensity, "p1")}
        </div>

        {/* Previous Day 1 Duration */}
        <div>
          <label className="text-sm text-slate-200">
            Yesterday — Duration (min)
          </label>

          <input
            name="PreviousDay1_Duration"
            type="number"
            value={profile.PreviousDay1_Duration}
            onChange={handleProfileChange}
            className={fieldClass}
          />
        </div>
      </section>

      {/* TODAY */}
      <section className="space-y-5 border-t border-white/10 pt-8">
        <h3 className="text-lg font-semibold text-white">
          Today&apos;s inputs
        </h3>

        {/* Sport */}
        <div>
          <label className="text-sm text-slate-200">Sport</label>
          <select
            name="Sport"
            value={session.Sport}
            onChange={handleSessionChange}
            className={fieldClass}
          >
            {SPORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Weight */}
        <div>
          <label className="text-sm text-slate-200">Weight (kg)</label>
          <input
            name="Weight"
            type="number"
            value={session.Weight}
            onChange={handleSessionChange}
            className={fieldClass}
          />
        </div>

        {/* Goal */}
        <div>
          <label className="text-sm text-slate-200">Goal</label>

          <select
            name="Goal"
            value={session.Goal}
            onChange={handleSessionChange}
            className={fieldClass}
          >
            {GOAL_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {goalBlock(session.Goal)}
        </div>

        {/* Current Day Intensity */}
        <div>
          <label className="text-sm text-slate-200">
            Current Day — Intensity
          </label>

          <select
            name="CurrentDay_Intensity"
            value={session.CurrentDay_Intensity}
            onChange={handleSessionChange}
            className={fieldClass}
          >
            {INTENSITY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          {intensityBlock(session.CurrentDay_Intensity, "current")}
        </div>

        {/* Current Day Duration */}
        <div>
          <label className="text-sm text-slate-200">
            Current Day — Duration (min)
          </label>

          <input
            name="CurrentDay_Duration"
            type="number"
            value={session.CurrentDay_Duration}
            onChange={handleSessionChange}
            className={fieldClass}
          />
        </div>
      </section>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-3 font-bold text-slate-950 transition hover:brightness-110 disabled:opacity-60"
      >
        {isSubmitting ? "Calculating..." : "Calculate Calories"}
      </button>
    </form>
  );
};

export default AthleteForm;