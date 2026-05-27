import React from "react";
import { motion } from "motion/react";
import { Clock, HelpCircle, Heart, Check, MinusCircle, AlertCircle } from "lucide-react";
import { Recipe } from "../types";
import { getRecipeImageUrl } from "../data";

interface RecipeListViewProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  savedRecipeIds: string[];
  onToggleSave: (recipe: Recipe) => void;
  isFallbackMode: boolean;
}

export default function RecipeListView({
  recipes,
  onSelectRecipe,
  savedRecipeIds,
  onToggleSave,
  isFallbackMode
}: RecipeListViewProps) {
  if (recipes.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-neutral-100 flex flex-col items-center justify-center space-y-4 min-h-[350px]">
        <div className="h-16 w-16 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center text-neutral-300">
          <Clock className="h-8 w-8 text-neutral-300" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-bold text-neutral-700">추천된 요리 레시피가 없습니다</p>
          <p className="text-xs text-neutral-400 max-w-xs">
            '내 냉장고'에서 더 다양한 재료를 추가하고 탐색해 보시기 바랍니다!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Indicator Alert for AI Fallback Mode */}
      {isFallbackMode && (
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-bold text-amber-800">오프라인 앙상블 모드 작동 중</h4>
            <p className="text-[11px] text-amber-700 leading-relaxed font-normal">
              Gemini API Key 키가 설정되지 않아, 로컬 데이터베이스의 고정밀 보관 레시피 풀로부터 엄선된 최적의 든든형 레시피들이 실시간 매칭 출력되었습니다.
            </p>
          </div>
        </div>
      )}

      {/* Recommended Header Dashboard Info */}
      <div>
        <h1 className="text-xl font-bold text-neutral-800">나만을 위한 AI 추천 요리</h1>
        <p className="text-xs text-neutral-400 mt-1">
          냉장고 속 재료들과 가장 조화롭게 맞아떨어지는 맞춤 식단입니다. 레시피 카드를 터치하여 조리 설명서를 열어보세요.
        </p>
      </div>

      {/* Recipes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, index) => {
          const isSaved = savedRecipeIds.includes(recipe.id);
          const imageUrl = getRecipeImageUrl(recipe.imageKeyword);

          return (
            <motion.div
              key={recipe.id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              {/* Image hotlink cover */}
              <div 
                onClick={() => onSelectRecipe(recipe)}
                className="relative h-48 w-full overflow-hidden bg-neutral-100 cursor-pointer"
              >
                <img
                  src={imageUrl}
                  alt={recipe.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to high quality generic vegetable/food photo on error
                    (e.target as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBAAk-nlg8VRsEvLGxpQPhGTOwf-RjpzIHRZbQGJAJgO57j3jnl8dda4L85KgRbiJrYyaVLCKY11ZTwBEocNoRlCeo0DNPw31QIj8wZS818lXowvRRojM6R9N8G_OKkaMz2YknBM8lH492uOgE9uBHXn_lJOeF76r9-_zFOSlRtQb831tDGeziDC04YonT_cb39ZheQVxl_iCV-FRBP1qKkkzqTjh6QZyd-6l0U8KnKH5pTTWmwB8NKSXj6vt0iNEqclUVSuzLwRA";
                  }}
                />

                {/* Overlaid Badges */}
                <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[10px] uppercase tracking-wide font-bold px-2.5 py-1 rounded-lg">
                  {recipe.category || "메인 요리"}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(recipe);
                  }}
                  className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center hover:bg-white text-rose-500 transition shadow-sm active:scale-90"
                >
                  <Heart className={`h-4.5 w-4.5 ${isSaved ? "fill-rose-500 text-rose-500" : "text-neutral-400"}`} />
                </button>
              </div>

              {/* Card Meta Content */}
              <div 
                onClick={() => onSelectRecipe(recipe)}
                className="p-5 flex-1 flex flex-col justify-between space-y-4 cursor-pointer"
              >
                <div className="space-y-1.5">
                  <h3 className="font-bold text-neutral-800 text-base group-hover:text-teal-600 transition truncate">
                    {recipe.name}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                    {recipe.description}
                  </p>
                </div>

                {/* Key indicators (Time, Difficulty) */}
                <div className="flex items-center gap-4 text-xs text-neutral-400 py-1 border-y border-neutral-50">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-neutral-400" />
                    <span>조리 {recipe.cookTime}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <HelpCircle className="h-3.5 w-3.5 text-neutral-400" />
                    <span>난이도 {recipe.difficulty}</span>
                  </span>
                </div>

                {/* Match Ingredients pills */}
                <div className="space-y-2 pt-1">
                  {recipe.matchingIngredients && recipe.matchingIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-1 items-center">
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm shrink-0">
                        보유 재료
                      </span>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {recipe.matchingIngredients.map((ing) => (
                          <span key={ing} className="text-neutral-600 bg-neutral-50 px-1.5 py-0.5 rounded-md">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                    <div className="flex flex-wrap gap-1 items-center">
                      <span className="text-[10px] font-bold text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded-sm shrink-0">
                        필요 부재료
                      </span>
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {recipe.missingIngredients.map((ing) => (
                          <span key={ing} className="text-neutral-400 bg-neutral-50/50 px-1.5 py-0.5 rounded-md border border-neutral-100 border-dashed">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
