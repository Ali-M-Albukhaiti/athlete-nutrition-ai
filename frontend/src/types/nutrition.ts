export type SportType =
  | "football"
  | "running"
  | "bodybuilding"
  | "mma";

export type IntensityType = "low" | "medium" | "high";

export type GoalType =
  | "fat_loss"
  | "maintain"
  | "muscle_gain"
  | "endurance";

/** Saved once on this device (height, age, previous days). */
export interface AthleteProfile {
  Height: number;
  Age: number;
  PreviousDay2_Intensity: IntensityType;
  PreviousDay2_Duration: number;
  PreviousDay1_Intensity: IntensityType;
  PreviousDay1_Duration: number;
}

/** Changes each time you calculate calories. */
export interface SessionInputs {
  Sport: SportType;
  Weight: number;
  Goal: GoalType;
  CurrentDay_Intensity: IntensityType;
  CurrentDay_Duration: number;
}

export type NutritionRequest = AthleteProfile & SessionInputs;

export interface NutritionResponse {
  calories: number;
}

export const SPORT_OPTIONS: { value: SportType; label: string }[] = [
  { value: "football", label: "Football" },
  { value: "running", label: "Running" },
  { value: "bodybuilding", label: "Bodybuilding" },
  { value: "mma", label: "MMA" },
];

export const INTENSITY_OPTIONS: {
  value: IntensityType;
  label: string;
}[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export const GOAL_OPTIONS: { value: GoalType; label: string }[] = [
  { value: "fat_loss", label: "Fat Loss" },
  { value: "maintain", label: "Maintain" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "endurance", label: "Endurance" },
];
