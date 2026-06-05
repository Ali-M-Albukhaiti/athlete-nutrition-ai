import axios from "axios";
import type {
  NutritionRequest,
  NutritionResponse,
} from "../types/nutrition";

const API_URL = "http://127.0.0.1:8000";

export const predictCalories = async (
  data: NutritionRequest
): Promise<NutritionResponse> => {
  const response = await axios.post(
    `${API_URL}/predict`,
    data
  );

  return response.data;
};