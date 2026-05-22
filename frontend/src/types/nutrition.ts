export type SportType =
  | "football"
  | "running"
  | "bodybuilding"
  | "mma";

export type IntensityType =
  | "low"
  | "medium"
  | "high";

export type GoalType =
  | "fat_loss"
  | "maintain"
  | "muscle_gain"
  | "endurance";

export interface NutritionRequest {
  sport: SportType;
  weight: number;
  height: number;
  age: number;
  intensity: IntensityType;
  goal: GoalType;
}

export interface NutritionResponse {
  calories: number;
}