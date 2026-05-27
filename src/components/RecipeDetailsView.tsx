import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, HelpCircle, CheckCircle2, Circle, AlertCircle, Award, Sparkles } from "lucide-react";
import { Recipe } from "../types";
import { getRecipeImageUrl } from "../data";

interface RecipeDetailsViewProps {
  recipe: Recipe;
  onBack: () => void;
}

export default function RecipeDetailsView({ recipe, onBack }: RecipeDetailsViewProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [celebrate, setCelebrate] = useState(false);

  const toggleStep = (index: number) => {
    if (completedSteps.includes(index)) {
      setCompletedSteps(completedSteps.filter(step => step !== index));
    } else {
      setCompletedSteps([...completedSteps, index]);
    }
  };

  const isAllStepsCompleted = recipe.steps && completedSteps.length === recipe.steps.length;

  const handleCompleteCooking = () => {
    setCelebrate(true);
  };

  return (
    <div className="space-y-6 pb-24 relative">
      {/* Back navigation button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-neutral-900 transition active:scale-95 bg-white px-4 py-2 rounded-xl border border-neutral-100 shadow-2xs"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>목록으로 돌아가기</span>
        </button>

        <div className="text-xs text-neutral-400 bg-neutral-100 px-3 py-1 rounded-lg">
          실시간 쿠킹 가이드
        </div>
      </div>

      {/* Celebratory Overlay when cooking completes */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-900/80 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-6 border border-neutral-100"
            >
              <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-4 border-emerald-100 animate-bounce">
                <Award className="h-10 w-10 text-emerald-600" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-neutral-800">축하합니다! 완벽한 식사 완성</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  냉장고 재료를 소중히 소진하여 지구를 구하고 맛있는 영양을 보충하셨습니다. 홈셰프 경험치 <strong>+150 XP</strong>를 획득하셨습니다!
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setCelebrate(false);
                  onBack();
                }}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-sm shadow-md transition active:scale-95"
              >
                셰프 가이드 종결하기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Banner cover */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column: Hotlinks Cover */}
        <div className="md:col-span-1 rounded-3xl overflow-hidden border border-neutral-100 shadow-sm bg-neutral-100 h-64 md:h-auto min-h-[220px]">
          <img
            src={getRecipeImageUrl(recipe.imageKeyword)}
            alt={recipe.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right column: Description and Specs info metadata */}
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-2">
            <span className="inline-block bg-teal-50 text-teal-600 font-extrabold text-xs px-2.5 py-1 rounded-lg">
              {recipe.category || "메인 요리"}
            </span>
            <h1 className="text-2xl font-black text-neutral-800 tracking-tight leading-snug">
              {recipe.name}
            </h1>
            <p className="text-sm text-neutral-500 font-normal leading-relaxed">
              {recipe.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-2">
            <div className="bg-neutral-50 p-3.5 rounded-2xl flex items-center gap-3">
              <Clock className="h-5 w-5 text-teal-600" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-medium">조리 제한시간</span>
                <span className="block text-sm font-bold text-neutral-800">{recipe.cookTime}</span>
              </div>
            </div>

            <div className="bg-neutral-50 p-3.5 rounded-2xl flex items-center gap-3">
              <HelpCircle className="h-5 w-5 text-indigo-500" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-medium">예상 난이도</span>
                <span className="block text-sm font-bold text-neutral-800">{recipe.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Comparison table widgets */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-2xs space-y-4">
        <h3 className="text-sm font-extrabold text-neutral-800">필요한 식재료 체크</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Matched */}
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>이미 있는 재료 ({recipe.matchingIngredients?.length || 0})</span>
            </span>

            <div className="flex flex-wrap gap-2">
              {recipe.matchingIngredients?.map(ing => (
                <span key={ing} className="bg-neutral-50 border border-neutral-100 text-xs text-neutral-600 px-3 py-1.5 rounded-xl font-medium">
                  {ing} <span className="text-emerald-500 text-[10px] font-bold ml-0.5">✓</span>
                </span>
              ))}
              {(!recipe.matchingIngredients || recipe.matchingIngredients.length === 0) && (
                <span className="text-xs text-neutral-400">보유 중인 품목이 해당 레시피에 매치되지 않았습니다.</span>
              )}
            </div>
          </div>

          {/* Missing */}
          <div className="space-y-2.5">
            <span className="inline-flex items-center gap-1 text-xs font-bold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-lg">
              <AlertCircle className="h-3.5 w-3.5 text-neutral-400" />
              <span>부족해서 준비해야 할 재료 ({recipe.missingIngredients?.length || 0})</span>
            </span>

            <div className="flex flex-wrap gap-2">
              {recipe.missingIngredients?.map(ing => (
                <span key={ing} className="bg-neutral-50/50 border border-neutral-200 border-dashed text-xs text-neutral-400 px-3 py-1.5 rounded-xl font-normal">
                  {ing}
                </span>
              ))}
              {(!recipe.missingIngredients || recipe.missingIngredients.length === 0) && (
                <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2.2 py-1 rounded-lg border border-emerald-100">
                  냉장고 재료만으로 완벽 가능! 추가 필요 재료 0개 🎉
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step by Step cooking guidance checkoffs */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2 border-b border-neutral-50">
          <div>
            <h3 className="text-sm font-extrabold text-neutral-800 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-teal-600" />
              <span>단계별 요리 트랙 가이드</span>
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">요리 진척도에 따라 터치해 진행률을 마킹해보세요.</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-24 bg-neutral-100 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600 transition-all duration-300"
                style={{
                  width: `${recipe.steps ? (completedSteps.length / recipe.steps.length) * 100 : 0}%`
                }}
              />
            </div>
            <span className="text-xs font-bold text-neutral-500 min-w-[32px] text-right">
              {completedSteps.length}/{recipe.steps?.length || 0}
            </span>
          </div>
        </div>

        {/* List of Steps */}
        <div className="space-y-3.5">
          {recipe.steps?.map((step, idx) => {
            const isCompleted = completedSteps.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => toggleStep(idx)}
                className={`p-4.5 rounded-2xl border transition duration-150 cursor-pointer flex items-start gap-4 ${
                  isCompleted
                    ? "bg-teal-50/30 border-teal-200 text-teal-950"
                    : "bg-white border-neutral-100 text-neutral-700 hover:border-neutral-200"
                }`}
              >
                <div className="pt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-teal-600 shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-neutral-300 hover:text-neutral-400 shrink-0" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <span className={`inline-block text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md ${
                    isCompleted ? "bg-teal-100 text-teal-700" : "bg-neutral-100 text-neutral-500"
                  }`}>
                    STEP 0{idx + 1}
                  </span>
                  <p className={`text-xs leading-relaxed font-medium ${isCompleted ? "line-through text-neutral-400" : ""}`}>
                    {step}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Finishing CTA */}
        <button
          onClick={handleCompleteCooking}
          disabled={!isAllStepsCompleted}
          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide shadow-md transition active:scale-95 flex items-center justify-center gap-2 ${
            isAllStepsCompleted
              ? "bg-neutral-900 hover:bg-neutral-800 text-white cursor-pointer"
              : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
          }`}
        >
          <CheckCircle2 className="h-4.5 w-4.5" />
          <span>모든 단계 완료 및 요리 완성!</span>
        </button>
      </div>
    </div>
  );
}
