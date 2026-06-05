export interface MacroResult {
    protein: number;
    carbs: number;
    fat: number;
  }
  
  export const calculateMacros = (
    calories: number,
    goal: string
  ): MacroResult => {
    let proteinPct = 0.25;
    let carbsPct = 0.5;
    let fatPct = 0.25;
  
    switch (goal) {
      case "fat_loss":
        proteinPct = 0.35;
        carbsPct = 0.35;
        fatPct = 0.3;
        break;
  
      case "muscle_gain":
        proteinPct = 0.3;
        carbsPct = 0.5;
        fatPct = 0.2;
        break;
  
      case "endurance_performance":
        proteinPct = 0.2;
        carbsPct = 0.6;
        fatPct = 0.2;
        break;
  
      default:
        proteinPct = 0.25;
        carbsPct = 0.5;
        fatPct = 0.25;
    }
  
    return {
      protein: Math.round((calories * proteinPct) / 4),
      carbs: Math.round((calories * carbsPct) / 4),
      fat: Math.round((calories * fatPct) / 9),
    };
  };