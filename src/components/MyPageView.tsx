import React from "react";
import { motion } from "motion/react";
import { Award, BookOpen, Clock, Heart, Utensils, Compass, Settings, ChevronRight } from "lucide-react";
import { Recipe } from "../types";
import { USER_AVATAR, MY_PAGE_STATS, getRecipeImageUrl } from "../data";

interface MyPageViewProps {
  onSelectRecipe: (recipe: Recipe) => void;
  savedCount: number;
}

export default function MyPageView({ onSelectRecipe, savedCount }: MyPageViewProps) {
  const mockRecent = MY_PAGE_STATS.recentlyViewed;

  return (
    <div className="space-y-6 pb-24">
      {/* Decorative Profile Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm flex flex-col sm:flex-row items-center gap-6"
      >
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-teal-50 overflow-hidden shadow-xs">
            <img
              src={USER_AVATAR}
              alt="User Chef Profile"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 bg-teal-600 text-white rounded-full p-1.5 shadow-sm">
            <Utensils className="h-4.5 w-4.5" />
          </div>
        </div>

        <div className="space-y-1.5 text-center sm:text-left flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg font-extrabold text-neutral-800">미쉐린 홈쿠커</h2>
            <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-bold text-[10px] px-2 py-0.5 rounded-md border border-amber-100">
              <Award className="h-3 w-3" />
              <span>레벨 12</span>
            </span>
          </div>
          <p className="text-xs text-neutral-400">냉장고 수호자 및 탄소 절감 운동 실천가</p>
          <p className="text-[11px] text-neutral-500 font-normal">
            "버려지는 아까운 양파 한 쪽까지 소중히 최고의 정찬으로 요리해 먹는 취미 가득 홈셰프입니다."
          </p>
        </div>
      </motion.div>

      {/* Numerical Stats row */}
      <div className="grid grid-cols-3 gap-3.5">
        <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-xs text-center space-y-1">
          <Heart className="h-4.5 w-4.5 text-rose-500 mx-auto" />
          <span className="block text-[10px] font-medium text-neutral-400">보관된 레시피</span>
          <span className="block text-lg font-black text-neutral-800">{savedCount}</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-xs text-center space-y-1">
          <Compass className="h-4.5 w-4.5 text-teal-600 mx-auto" />
          <span className="block text-[10px] font-medium text-neutral-400">주요 사용 재료</span>
          <span className="block text-xs font-bold text-neutral-800 truncate">마늘, 대파, 양파</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-xs text-center space-y-1">
          <Clock className="h-4.5 w-4.5 text-indigo-500 mx-auto" />
          <span className="block text-[10px] font-medium text-neutral-400">평균 조리 속도</span>
          <span className="block text-lg font-black text-neutral-800">15분 미만</span>
        </div>
      </div>

      {/* Recently Viewed carousel list */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-neutral-800 flex items-center gap-1.5">
          <BookOpen className="h-4 w-4 text-neutral-500" />
          <span>최근에 열어본 든든한 요리</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {mockRecent.map((recipe, index) => {
            const tempRecipe: Recipe = {
              id: recipe.id,
              name: recipe.name,
              description: "",
              cookTime: recipe.cookTime,
              difficulty: recipe.difficulty,
              ingredients: recipe.ingredients,
              category: "메인",
              matchingIngredients: recipe.ingredients.slice(0, 2),
              missingIngredients: recipe.ingredients.slice(2),
              steps: [],
              imageKeyword: recipe.imageKeyword
            };

            return (
              <div
                key={recipe.id || index}
                onClick={() => onSelectRecipe(tempRecipe)}
                className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden cursor-pointer hover:border-teal-200 transition group"
              >
                <div className="h-28 w-full bg-neutral-100 overflow-hidden relative">
                  <img
                    src={getRecipeImageUrl(recipe.imageKeyword)}
                    alt={recipe.name}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-103"
                  />
                  <div className="absolute top-2 left-2 bg-neutral-900/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm">
                    {recipe.cookTime}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-xs font-bold text-neutral-800 truncate group-hover:text-teal-600">
                    {recipe.name}
                  </h4>
                  <div className="flex gap-1.5 text-[9px] text-neutral-400 mt-1">
                    <span>난이도: {recipe.difficulty}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Account controls */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs divide-y divide-neutral-100 overflow-hidden text-sm">
        <div className="p-4 flex items-center justify-between hover:bg-neutral-50/50 cursor-pointer">
          <div className="flex items-center gap-3">
            <Settings className="h-4 w-4 text-neutral-500 animate-spin-slow" />
            <span className="font-semibold text-neutral-700">냉장고 센서 원격 자동 동기화</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-teal-600 font-bold">
            <span>실시간 작동 중</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>

        <div className="p-4 flex items-center justify-between hover:bg-neutral-50/50 cursor-pointer">
          <div className="flex items-center gap-3">
            <Award className="h-4 w-4 text-neutral-500" />
            <span className="font-semibold text-neutral-700">요리 레벨 업 보상 쿠폰함</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            <span>보유 쿠폰 3장</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
