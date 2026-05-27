import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Search, Utensils, Trash2, Clock, Eye } from "lucide-react";
import { Recipe } from "../types";
import { getRecipeImageUrl } from "../data";

interface FavoritesViewProps {
  savedRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleSave: (recipe: Recipe) => void;
}

export default function FavoritesView({
  savedRecipes,
  onSelectRecipe,
  onToggleSave
}: FavoritesViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("전체");

  const categories = ["전체", "한식", "양식", "간편식", "기타"];

  // Perform search and filter
  const filteredRecipes = savedRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (categoryFilter === "전체") return matchesSearch;
    return matchesSearch && recipe.category === categoryFilter;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Dynamic Header */}
      <div>
        <h1 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
          <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
          <span>보관함 ({savedRecipes.length})</span>
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          다음에 다시 요리할 스마트 AI 모아보기 레스토랑 컬렉션입니다.
        </p>
      </div>

      {/* Search and Filters Header bar */}
      <div className="bg-white rounded-2xl p-4.5 border border-neutral-100 shadow-2xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="보관함 검색 (예: 샌드위치, 볶음밥...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 transition"
          />
        </div>

        <div className="flex gap-1 overflow-x-auto text-xs pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg border font-bold transition whitespace-nowrap active:scale-95 ${
                categoryFilter === cat
                  ? "bg-rose-50 border-rose-200 text-rose-600"
                  : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List with Card Transition Animate */}
      <AnimatePresence mode="popLayout">
        {filteredRecipes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-3xl p-12 text-center border border-neutral-100 flex flex-col items-center justify-center space-y-4 min-h-[300px]"
          >
            <div className="h-16 w-16 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-rose-300">
              <Heart className="h-8 w-8 text-rose-400" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-neutral-700">보관된 레시피가 없습니다</p>
              <p className="text-xs text-neutral-400 max-w-xs">
                레시피 추천카드에서 우측 상단의 하트 아이콘을 누르면 소중하게 전용 보관함에 영구 저장됩니다.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredRecipes.map((recipe) => (
              <motion.div
                key={recipe.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-2xs hover:shadow-sm transition flex flex-col justify-between group"
              >
                {/* Hotlinked cover thumbnail */}
                <div className="relative h-40 w-full overflow-hidden bg-neutral-100">
                  <img
                    src={getRecipeImageUrl(recipe.imageKeyword)}
                    alt={recipe.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="h-full w-full object-cover transition"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-neutral-900/80 backdrop-blur-xs text-white text-[9px] uppercase tracking-wide font-bold px-2 py-0.5 rounded-md">
                    {recipe.category || "메인"}
                  </div>

                  <button
                    onClick={() => onToggleSave(recipe)}
                    className="absolute top-2.5 right-2.5 h-8 w-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center hover:bg-neutral-50 text-rose-500 transition shadow-2xs"
                    title="보관 해제"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Card description */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-bold text-neutral-800 text-sm group-hover:text-rose-500 transition line-clamp-1">
                      {recipe.name}
                    </h3>
                    <p className="text-xs text-neutral-400 font-normal leading-relaxed line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-neutral-50">
                    <span className="text-[10px] text-neutral-400 font-medium flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{recipe.cookTime} 소요</span>
                    </span>

                    <button
                      onClick={() => onSelectRecipe(recipe)}
                      className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg px-2.5 py-1.5 text-[10px] font-bold active:scale-95 transition"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>레시피 보기</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
