export type IngredientCategory = "채소 & 과일" | "육류 & 어류" | "유제품 & 알류" | "양념 & 기타";

export interface FridgeIngredient {
  name: string;
  category: IngredientCategory;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  cookTime: string;
  difficulty: "쉬움" | "보통" | "어려움" | string;
  ingredients: string[];
  category: string; // e.g. "한식", "양식", "간편식"
  matchingIngredients: string[];
  missingIngredients: string[];
  steps: string[];
  imageKeyword: string;
}

export type AppTab = "home" | "fridge" | "recommendations" | "favorites" | "mypage";
