import { useState } from "react";
import { predictCalories } from "../api/nutritionApi";
import type {
  NutritionRequest,
  NutritionResponse,
} from "../types/nutrition";
import type {
  ChangeEvent,
  FormEvent,
} from "react";

interface Props {
  onResult: (data: NutritionResponse) => void;
}

const AthleteForm = ({ onResult }: Props) => {
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [formData, setFormData] =
    useState<NutritionRequest>({
      sport: "football",
      weight: 70,
      height: 175,
      age: 20,
      intensity: "medium",
      goal: "maintain",
    });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await predictCalories(formData);
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
      className="space-y-5 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-sm sm:p-8"
    >
      <div>
        <label className="text-sm font-medium text-slate-200">
          Sport
        </label>

        <select
          name="sport"
          value={formData.sport}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
        >
          <option value="football">Football</option>
          <option value="running">Running</option>
          <option value="bodybuilding">
            Bodybuilding
          </option>
          <option value="mma">MMA</option>
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-200">
            Weight (kg)
          </label>

          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-200">
            Height (cm)
          </label>

          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-200">
          Age
        </label>

        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-slate-200">
            Intensity
          </label>

          <select
            name="intensity"
            value={formData.intensity}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-200">
            Goal
          </label>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="mt-2 w-full rounded-xl border border-white/10 bg-slate-800 px-3 py-3 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40"
          >
            <option value="fat_loss">Fat Loss</option>
            <option value="maintain">Maintain</option>
            <option value="muscle_gain">
              Muscle Gain
            </option>
            <option value="endurance">Endurance</option>
          </select>
        </div>
      </div>

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