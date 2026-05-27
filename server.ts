import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route first: AI Recipe Generator
app.post("/api/generate-recipes", async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Ingredients array is required" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyAvailable = apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "";

  // If API key is not ready, return highly curated high-quality fallbacks based on ingredients
  if (!isKeyAvailable) {
    console.log("Gemini API key is not configured or placeholder. Returning high-quality simulated recipes.");
    return res.json({
      recipes: getCuratedFallbackRecipes(ingredients),
      simulated: true
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      }
    });

    const prompt = `Based on the ingredients found in the user's refrigerator: ${ingredients.join(", ")}.
Suggest 3 Korean or international recipes that use these ingredients primarily.
Make sure the recipe names, descriptions, steps, and ingredient names are written in natural Korean.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert AI chef helping users cook delicious meals with whatever ingredients they have left in their refrigerator. Be encouraging, creative, and precise about steps. The category should be one of '한식', '양식', '일식', '중식', '간편식', '디저트'. Difficulty should be '쉬움', '보통', or '어려움'. Keep the cookTime format as 'X분'. Make sure the imageKeyword is one of: 'salad', 'pasta', 'pork', 'curry', 'toast', 'noodles', 'rice', 'beef', 'chicken', 'egg', 'soup'.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["recipes"],
          properties: {
            recipes: {
              type: Type.ARRAY,
              description: "List of 3 recommended recipes",
              items: {
                type: Type.OBJECT,
                required: ["id", "name", "description", "cookTime", "difficulty", "ingredients", "category", "matchingIngredients", "missingIngredients", "steps", "imageKeyword"],
                properties: {
                  id: { type: Type.STRING, description: "A unique slug or ID like 'recipe-url'" },
                  name: { type: Type.STRING, description: "Korean name of the recipe" },
                  description: { type: Type.STRING, description: "Appetizing description in Korean" },
                  cookTime: { type: Type.STRING, description: "Estimated cooking time like '20분'" },
                  difficulty: { type: Type.STRING, description: "Difficulty level: '쉬움', '보통', '어려움'" },
                  ingredients: {
                    type: Type.ARRAY,
                    description: "All ingredients needed for this recipe",
                    items: { type: Type.STRING }
                  },
                  category: { type: Type.STRING, description: "Category like '한식', '양식', '간편식'" },
                  matchingIngredients: {
                    type: Type.ARRAY,
                    description: "Ingredients that are matched with user's input",
                    items: { type: Type.STRING }
                  },
                  missingIngredients: {
                    type: Type.ARRAY,
                    description: "Pantry items or extra ingredients user might need",
                    items: { type: Type.STRING }
                  },
                  steps: {
                    type: Type.ARRAY,
                    description: "Step-by-step instructions in Korean",
                    items: { type: Type.STRING }
                  },
                  imageKeyword: {
                    type: Type.STRING,
                    description: "One of: salad, pasta, pork, curry, toast, noodles, rice, beef, chicken, egg, soup"
                  }
                }
              }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({
      recipes: parsedData.recipes || [],
      simulated: false
    });

  } catch (error: any) {
    console.error("Gemini recipe generation error:", error);
    // Graceful fallback on error
    return res.json({
      recipes: getCuratedFallbackRecipes(ingredients),
      simulated: true,
      error: error.message
    });
  }
});

// Mock/Curated database helper for fallbacks
function getCuratedFallbackRecipes(userIngredients: string[]) {
  const norm = userIngredients.map(i => i.trim());
  const hasVeg = norm.some(i => i.includes("당근") || i.includes("감자") || i.includes("양파") || i.includes("대파") || i.includes("채소"));
  const hasPork = norm.some(i => i.includes("삼겹살") || i.includes("고기") || i.includes("육류"));
  const hasEgg = norm.some(i => i.includes("계란") || i.includes("달걀") || i.includes("우유") || i.includes("치즈"));
  const hasAvocado = norm.some(i => i.includes("아보카도"));

  const allFallbackRecipes = [
    {
      id: "pork-veg-stir-fry",
      name: "삼겹살 야채 볶음",
      description: "노릇노릇하게 구운 삼겹살과 아삭한 채소들을 굴소스로 맛있게 볶아낸 요리",
      cookTime: "20분",
      difficulty: "쉬움",
      ingredients: ["삼겹살", "당근", "양파", "마늘", "대파", "굴소스", "통깨"],
      category: "한식",
      matchingIngredients: norm.filter(x => ["삼겹살", "당근", "양파", "대파", "마늘"].includes(x)),
      missingIngredients: ["굴소스", "통깨"],
      steps: [
        "삼겹살은 한입 크기로 보기 좋게 잘라 달구어진 팬에 노릇노릇하게 구워냅니다.",
        "기름이 나오면 적당량 남기고 마늘과 대파를 넣어 파기름 향을 가득 냅니다.",
        "양파, 당근 등 준비한 야채를 썰어 한데 넣고 센 불에서 아삭하게 볶아줍니다.",
        "굴소스 1큰술과 후추 약간을 넣고 소스가 잘 배도록 빠르게 휘리릭 볶아 완성합니다."
      ],
      imageKeyword: "pork"
    },
    {
      id: "curry-rice",
      name: "감자 당근 카레",
      description: "포슬포슬한 감자와 달콤한 당근이 어우러져 깊고 진한 맛을 내는 홈메이드 명품 카레",
      cookTime: "35분",
      difficulty: "보통",
      ingredients: ["감자", "당근", "양파", "카레가루", "돼지고기", "식용유"],
      category: "한식",
      matchingIngredients: norm.filter(x => ["감자", "당근", "양파", "삼겹살"].includes(x)),
      missingIngredients: ["카레가루"],
      steps: [
        "감자, 당근, 양파는 주사위 모양으로 큼직하게 깍둑썰기합니다.",
        "냄비에 식용유를 두르고 고기와 단단한 감자, 당근 순으로 볶다가 양파를 넣어 투명해질 때까지 볶아줍니다.",
        "재료가 잠길 정도로 물을 붓고 감자가 부드럽게 완전히 익을 때까지 보글보글 끓여줍니다.",
        "카레가루를 조금씩 나누어 넣으며 뭉치지 않게 잘 풀어준 뒤 적당히 걸쭉해질 때까지 한소끔 밀며 저어가며 끓여 완성합니다."
      ],
      imageKeyword: "curry"
    },
    {
      id: "pork-potato-roast",
      name: "삼겹살 감자 구이",
      description: "오븐이나 에어프라이어로 구워 고소한 삼겹살과 바삭한 웨지감자의 환상적인 만남",
      cookTime: "15분",
      difficulty: "쉬움",
      ingredients: ["삼겹살", "감자", "로즈마리", "올리브유", "소금 후추"],
      category: "양식",
      matchingIngredients: norm.filter(x => ["삼겹살", "감자", "올리브유"].includes(x)),
      missingIngredients: ["로즈마리", "소금 후추"],
      steps: [
        "감자는 흐르는 물에 깨끗이 씻어 반달 모양의 웨지 형태로 썰어 전분기를 빼 준 뒤 소금과 올리브유에 버무립니다.",
        "삽겹살은 도톰하게 썰어 소금, 후추, 허브를 뿌려 밑간을 해 둡니다.",
        "팬이나 에어프라이어에 감자와 삼겹살을 가득 얹고 겉이 바삭해질 때까지 노릇하게 노릇노릇 구워냅니다.",
        "마지막에 기호에 따라 로즈마리를 살짝 더해 고급스러운 허브 향을 입혀 서빙합니다."
      ],
      imageKeyword: "pork"
    },
    {
      id: "avocado-bibimbap",
      name: "아보카도 명란 비빔밥",
      description: "부드럽고 숲의 버터라 불리는 아보카도와 짭조름하고 고소한 명란젓이 선사하는 깔끔한 한그릇",
      cookTime: "15분",
      difficulty: "쉬움",
      ingredients: ["아보카도", "명란젓", "계란", "밥", "김가루", "참기름"],
      category: "한식",
      matchingIngredients: norm.filter(x => ["아보카도", "계란", "우유"].includes(x)),
      missingIngredients: ["명란젓", "김가루", "참기름"],
      steps: [
        "잘 익어 부드러운 아보카도를 반으로 갈라 씨를 뺀 후 얇고 예쁜 초승달 모양으로 슬라이스합니다.",
        "팬에 달걀을 올려 노른자가 반쯤 촉촉하게 익은 달걀 프라이를 만듭니다.",
        "그릇에 따뜻한 밥을 담고 그 위에 슬라이스한 아보카도와 달걀 프라이를 예쁘게 얹습니다.",
        "양념을 한 껍질 벗긴 명란젓과 은은한 김가루를 두르고 가득한 참기름을 뿌려 슥슥 비벼 먹습니다."
      ],
      imageKeyword: "rice"
    },
    {
      id: "egg-mayo-toast",
      name: "에그 마요 토스트",
      description: "포슬포슬 삶은 계란을 고소한 마요네즈와 버무려 바삭하게 구운 식빵 위에 듬뿍 얹어 먹는 아침 별미",
      cookTime: "10분",
      difficulty: "매우 쉬움",
      ingredients: ["계란", "우유", "체다치즈", "식빵", "마요네즈", "파슬리가루"],
      category: "간편식",
      matchingIngredients: norm.filter(x => ["계란", "우유", "체다치즈"].includes(x)),
      missingIngredients: ["식빵", "마요네즈"],
      steps: [
        "삶은 달걀을 포크나 매셔로 부드럽게 으깬 뒤 마요네즈 2스푼과 소금 후추 한 꼬집을 넣고 고소하게 비벼줍니다.",
        "식빵을 토스터기나 버터를 두른 팬에 바삭하고 노릇하게 구워 준비합니다.",
        "따뜻하고 바삭한 빵에 체다치즈 1장을 얹고 그 위에 푸짐하고 부드러운 에그마요를 수북하게 쌓아올립니다.",
        "기호에 맞게 차이브나 파슬리를 살짝 뿌려 장식하면 아침 대용으로 완성됩니다."
      ],
      imageKeyword: "toast"
    }
  ];

  // Try to find matching recipes, prioritize ones that have matching ingredients
  const scored = allFallbackRecipes.map(recipe => {
    let score = 0;
    recipe.matchingIngredients.forEach(() => { score += 2; });
    // basic categories
    if (recipe.id === "avocado-bibimbap" && hasAvocado) score += 5;
    if (recipe.id === "curry-rice" && norm.includes("감자") && norm.includes("당근")) score += 5;
    if (recipe.id === "pork-veg-stir-fry" && hasPork && hasVeg) score += 4;
    return { ...recipe, score };
  });

  // Sort by score descend, and slice 3
  const top3 = scored.sort((a, b) => b.score - a.score).slice(0, 3);
  return top3.map(({ score, ...clean }) => clean);
}

// Vite developer server / static file setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Fallback route for all other requests to index.html in DEV if it doesn't match API
  if (process.env.NODE_ENV !== "production") {
    app.get("*all", (req, res, next) => {
      // Allow API routes through, others fall back
      if (req.path.startsWith("/api/")) {
        return next();
      }
      res.sendFile(path.resolve(process.cwd(), "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`);
  });
}

startServer();
