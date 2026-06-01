import { useEffect, useState } from "react";
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
import type { ChangeEvent, FormEvent } from "react";

interface Props {
  onResult: (data: NutritionResponse) => void;
}

const defaultSession: SessionInputs = {
  Sport: "football",
  Weight: 82,
  Goal: "maintain",
  CurrentDay_Intensity: "medium",
  CurrentDay_Duration: 76,
};

const fieldClass =
  "mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40";

const labelClass = "text-sm font-medium text-slate-200";

const AthleteForm = ({ onResult }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profile, setProfile] = useState<AthleteProfile>(
    loadAthleteProfile
  );
  const [session, setSession] =
    useState<SessionInputs>(defaultSession);

  useEffect(() => {
    saveAthleteProfile(profile);
  }, [profile]);

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]:
        type === "number" ? Number(value) : value,
    }));
  };

  const handleSessionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setSession((prev) => ({
      ...prev,
      [name]:
        type === "number" ? Number(value) : value,
    }));
  };

  const resetProfile = () => {
    setProfile(defaultAthleteProfile);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await predictCalories({
        ...profile,
        ...session,
      });
      onResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
    >
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Athlete profile
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Height, age, and previous training days are saved in your
              browser so you only enter them once.
            </p>
          </div>
          <button
            type="button"
            onClick={resetProfile}
            className="text-sm text-cyan-300 underline-offset-2 hover:underline"
          >
            Reset saved profile
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="Height">
              Height (cm)
            </label>
            <input
              id="Height"
              type="number"
              name="Height"
              min={160}
              max={200}
              value={profile.Height}
              onChange={handleProfileChange}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="Age">
              Age
            </label>
            <input
              id="Age"
              type="number"
              name="Age"
              min={18}
              max={40}
              value={profile.Age}
              onChange={handleProfileChange}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className={labelClass}
              htmlFor="PreviousDay2_Intensity"
            >
              Previous day 2 — intensity
            </label>
            <select
              id="PreviousDay2_Intensity"
              name="PreviousDay2_Intensity"
              value={profile.PreviousDay2_Intensity}
              onChange={handleProfileChange}
              className={fieldClass}
            >
              {INTENSITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={labelClass}
              htmlFor="PreviousDay2_Duration"
            >
              Previous day 2 — duration (min)
            </label>
            <input
              id="PreviousDay2_Duration"
              type="number"
              name="PreviousDay2_Duration"
              min={30}
              max={120}
              value={profile.PreviousDay2_Duration}
              onChange={handleProfileChange}
              className={fieldClass}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className={labelClass}
              htmlFor="PreviousDay1_Intensity"
            >
              Previous day 1 — intensity
            </label>
            <select
              id="PreviousDay1_Intensity"
              name="PreviousDay1_Intensity"
              value={profile.PreviousDay1_Intensity}
              onChange={handleProfileChange}
              className={fieldClass}
            >
              {INTENSITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={labelClass}
              htmlFor="PreviousDay1_Duration"
            >
              Previous day 1 — duration (min)
            </label>
            <input
              id="PreviousDay1_Duration"
              type="number"
              name="PreviousDay1_Duration"
              min={30}
              max={120}
              value={profile.PreviousDay1_Duration}
              onChange={handleProfileChange}
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      <section className="space-y-5 border-t border-white/10 pt-8">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Today&apos;s inputs
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Sport, weight, goal, and current-day training — update these
            each time you calculate.
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="Sport">
            Sport
          </label>
          <select
            id="Sport"
            name="Sport"
            value={session.Sport}
            onChange={handleSessionChange}
            className={fieldClass}
          >
            {SPORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="Weight">
              Weight (kg)
            </label>
            <input
              id="Weight"
              type="number"
              name="Weight"
              min={55}
              max={110}
              value={session.Weight}
              onChange={handleSessionChange}
              className={fieldClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="Goal">
              Goal
            </label>
            <select
              id="Goal"
              name="Goal"
              value={session.Goal}
              onChange={handleSessionChange}
              className={fieldClass}
            >
              {GOAL_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              className={labelClass}
              htmlFor="CurrentDay_Intensity"
            >
              Current day — intensity
            </label>
            <select
              id="CurrentDay_Intensity"
              name="CurrentDay_Intensity"
              value={session.CurrentDay_Intensity}
              onChange={handleSessionChange}
              className={fieldClass}
            >
              {INTENSITY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={labelClass}
              htmlFor="CurrentDay_Duration"
            >
              Current day — duration (min)
            </label>
            <input
              id="CurrentDay_Duration"
              type="number"
              name="CurrentDay_Duration"
              min={30}
              max={120}
              value={session.CurrentDay_Duration}
              onChange={handleSessionChange}
              className={fieldClass}
            />
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-3 font-bold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Calculating..."
          : "Calculate Calories"}
      </button>
    </form>
  );
};

export default AthleteForm;
