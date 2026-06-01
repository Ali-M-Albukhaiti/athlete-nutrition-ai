import type { AthleteProfile } from "../types/nutrition";

const STORAGE_KEY = "athlete-nutrition-profile";

export const defaultAthleteProfile: AthleteProfile = {
  Height: 175,
  Age: 29,
  PreviousDay2_Intensity: "medium",
  PreviousDay2_Duration: 75,
  PreviousDay1_Intensity: "medium",
  PreviousDay1_Duration: 75,
};

export function loadAthleteProfile(): AthleteProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultAthleteProfile;
    }

    return {
      ...defaultAthleteProfile,
      ...JSON.parse(raw),
    };
  } catch {
    return defaultAthleteProfile;
  }
}

export function saveAthleteProfile(profile: AthleteProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}
