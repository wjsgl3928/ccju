import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Sparkles, Refrigerator, Search, AlertCircle, ShoppingBag } from "lucide-react";
import { FridgeIngredient, IngredientCategory } from "../types";
import { FREQUENT_TAGS } from "../data";

interface FridgeViewProps {
  ingredients: FridgeIngredient[];
  onAddIngredient: (name: string, category: IngredientCategory) => void;
  onRemoveIngredient: (name: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export default function FridgeView({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  onGenerate,
  isLoading
}: FridgeViewProps) {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<IngredientCategory>("채소 & 과일");
  const [activeTab, setActiveTab] = useState<"전체" | IngredientCategory>("전체");
  const [loadingStep, setLoadingStep] = useState(0);

  // Auto-category guesser based on ingredient name
  const guessCategory = (name: string): IngredientCategory => {
    const vegList = ["당근", "청경채", "감자", "토마토", "양파", "마늘", "대파", "부추", "애호박", "고추", "오이", "버섯", "아보카도", "파", "배추", "콩나물", "시금치", "상추", "깻잎"];
    const meatList = ["삼겹살", "고기", "돼지", "소고기", "닭", "오리", "양고기", "생생", "갈비", "베이컨", "소시지", "연어", "참치", "고등어", "오징어", "새우", "꽃게", "조개", "낙지"];
    const dairyList = ["우유", "치즈", "계란", "달걀", "요거트", "버터", "생크림", "연유"];
    
    if (vegList.some(item => name.includes(item))) return "채소 & 과일";
    if (meatList.some(item => name.includes(item))) return "육류 & 어류";
    if (dairyList.some(item => name.includes(item))) return "유제품 & 알류";
    return "양념 & 기타";
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = inputValue.trim();
    if (!cleanName) return;

    if (ingredients.some(ing => ing.name === cleanName)) {
      alert("이미 냉장고에 등록되어 있는 재료입니다.");
      return;
    }

    const category = guessCategory(cleanName);
    onAddIngredient(cleanName, category);
    setInputValue("");
  };

  const handleQuickAdd = (name: string) => {
    if (ingredients.some(ing => ing.name === name)) {
      onRemoveIngredient(name); // Toggle off if already exists
    } else {
      const category = guessCategory(name);
      onAddIngredient(name, category);
    }
  };

  const filteredIngredients = ingredients.filter(ing => {
    if (activeTab === "전체") return true;
    return ing.category === activeTab;
  });

  // Cycle loading messages when generating
  React.useEffect(() => {
    if (!isLoading) {
      setLoadingStep(0);
      return;
    }
    const timer = setInterval(() => {
      setLoadingStep(prev => (prev < 3 ? prev + 1 : 0));
    }, 2000);
    return () => clearInterval(timer);
  }, [isLoading]);

  const loadingMessages = [
    "보내주신 재료 성분을 정밀하게 분석하고 있습니다...",
    "가장 완벽한 레시피 조합 목록을 탐색하는 중...",
    "난이도와 필요한 예상 조리 시간을 비교 정렬 중...",
    "맛깔스러운 조리 스텝과 부재료를 계산하는 중..."
  ];

  return (
    <div className="space-y-6 pb-24">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-neutral-800 flex items-center gap-2">
            <Refrigerator className="h-5 w-5 text-teal-600" />
            <span>나의 냉장고 관리</span>
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            냉장고 속 재료를 스마트하게 등록하고 맞춤 인공지능 요리를 즐겨보세요 (총 {ingredients.length}개 보관 중)
          </p>
        </div>

        {/* Floating Start recommendation CTA */}
        {ingredients.length > 0 && (
          <button
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-teal-700 hover:shadow-lg active:scale-95 disabled:opacity-50 transition"
          >
            <Sparkles className="h-4 w-4 animate-bounce" />
            <span>이 재료로 AI 레시피 추천받기</span>
          </button>
        )}
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl space-y-5 border border-neutral-100">
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-teal-100 animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-teal-600 animate-spin"></div>
                <Sparkles className="h-6 w-6 text-teal-600 absolute" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-800">AI 레시피 매칭 중</h3>
              <p className="text-xs text-neutral-500 leading-relaxed min-h-[36px] transition-all">
                {loadingMessages[loadingStep]}
              </p>
            </div>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-teal-600" 
                animate={{ width: ["0%", "40%", "75%", "100%"] }} 
                transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Add New Input Area */}
      <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs space-y-4">
        <form onSubmit={handleManualAdd} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="냉장고에 새로 넣을 재료 이름을 써주세요 (예: 두부, 계란...)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-teal-600 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-3 rounded-xl font-bold text-sm tracking-wide inline-flex items-center gap-1 active:scale-95 transition"
          >
            <Plus className="h-4 w-4" />
            <span>등록</span>
          </button>
        </form>

        {/* Quick Add Suggestions */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-neutral-400 flex items-center gap-1">
            <ShoppingBag className="h-3 w-3" />
            <span>자주 넣는 인기 재료 터치하여 추가하기:</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {FREQUENT_TAGS.map((tag) => {
              const inside = ingredients.some(ing => ing.name === tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleQuickAdd(tag)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition duration-150 active:scale-95 ${
                    inside
                      ? "bg-teal-50 border-teal-200 text-teal-700 font-bold"
                      : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  {tag} {inside ? "✓" : "+"}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Categories & Fridge Display */}
      <div className="space-y-4">
        {/* Category filtering Header Selector */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
          {(["전체", "채소 & 과일", "육류 & 어류", "유제품 & 알류", "양념 & 기타"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-xl border font-bold transition whitespace-nowrap active:scale-95 ${
                activeTab === tab
                  ? "bg-neutral-900 border-neutral-900 text-white shadow-xs"
                  : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Fridge Bento Grid Layout */}
        <AnimatePresence mode="popLayout">
          {filteredIngredients.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-white rounded-3xl p-12 text-center border border-neutral-100 flex flex-col items-center justify-center space-y-4 min-h-[280px]"
            >
              <div className="h-16 w-16 bg-neutral-50 border border-neutral-100 rounded-full flex items-center justify-center text-neutral-300">
                <Refrigerator className="h-8 w-8 text-neutral-300" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-neutral-700">이 범주에 속한 식재료가 없습니다</p>
                <p className="text-xs text-neutral-400 max-w-xs">
                  상단의 입력 필드나 추천 태그에서 재료를 채워 넣어보세요!
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5"
            >
              {filteredIngredients.map((ing) => (
                <motion.div
                  key={ing.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white p-4.5 rounded-2xl border border-neutral-100 shadow-2xs hover:border-teal-200 hover:shadow-xs transition flex flex-col justify-between group h-28 relative"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span className={`inline-block h-2 w-2 rounded-full ${
                        ing.category === "채소 & 과일" ? "bg-emerald-500" :
                        ing.category === "육류 & 어류" ? "bg-amber-500" :
                        ing.category === "유제품 & 알류" ? "bg-sky-500" : "bg-purple-500"
                      }`} />
                      <span className="text-[10px] font-medium text-neutral-400">{ing.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-800 truncate pt-1">{ing.name}</h3>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-[10px] font-medium text-neutral-400 bg-neutral-50 px-2 py-0.5 rounded-md">
                      신선함
                    </span>
                    <button
                      onClick={() => onRemoveIngredient(ing.name)}
                      className="text-neutral-300 hover:text-rose-600 transition p-1.5 hover:bg-neutral-50 rounded-lg"
                      title="재료 삭제"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* AI Quick Audit Assistant Panel */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100 flex items-start gap-3.5">
        <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-800">인공지능 유통 기한 도우미</h4>
          <p className="text-xs text-amber-700/90 leading-relaxed font-normal">
            우유와 삼겹살은 구매나 입고일 기준으로 신선도가 급격히 하락합니다. 가벼운 레시피 매칭을 통해 수일 내 소진해주시는 것을 진심으로 조언드립니다.
          </p>
        </div>
      </div>
    </div>
  );
}
