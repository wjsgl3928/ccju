import React from "react";
import { motion } from "motion/react";
import { Sparkles, Refrigerator, ShieldAlert, FileText, ArrowRight, Lightbulb } from "lucide-react";
import { FridgeIngredient } from "../types";

interface HomeViewProps {
  ingredients: FridgeIngredient[];
  onNavigate: (tab: "home" | "fridge" | "recommendations" | "favorites" | "mypage") => void;
}

export default function HomeView({ ingredients, onNavigate }: HomeViewProps) {
  const tips = [
    {
      title: "감자 싱그럽게 보관하기",
      desc: "감자는 사과와 함께 보관하면 사과에서 나오는 에틸렌 가스가 감자의 싹 트는 것을 효과적으로 억제해 줍니다.",
      tag: "꿀팁"
    },
    {
      title: "양파와 감자의 거리두기",
      desc: "양파와 감자를 같은 공간에 맞닿게 보관하면 상호 작용을 일으켜 둘 다 빠르게 물러져 버립니다.",
      tag: "주의"
    },
    {
      title: "방울토마토 꼭지 제거",
      desc: "방울토마토는 보관 전 미리 꼭지를 제거하고 물기를 완벽히 닦아 밀봉 보관하면 곰팡이 생성을 막고 보존 기간을 두 배 늘릴 수 있습니다.",
      tag: "핵꿀팁"
    }
  ];

  const handleRecommendClick = () => {
    onNavigate("fridge");
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Visual Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 to-emerald-800 p-8 text-white shadow-xl min-h-[220px] flex flex-col justify-between"
      >
        <div className="absolute top-0 right-0 -m-8 h-48 w-48 rounded-full bg-teal-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -m-8 h-36 w-36 rounded-full bg-emerald-500/10 blur-2xl"></div>

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-400/20 px-3 py-1 text-xs font-semibold tracking-wide text-teal-300">
            <Sparkles className="h-3 w-3" />
            <span>AI 푸드 가디언</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold leading-snug tracking-tight">
            버려지는 식재료 없이,<br />당신의 냉장고를 살리는 레시피
          </h1>
          <p className="text-sm text-teal-100/90 max-w-md pt-1">
            냉장고 속에 방치된 남은 재료를 터치 한 번으로 감쪽같이 근사한 한 끼 식사로 변신시킵니다.
          </p>
        </div>

        <div className="pt-6 relative z-10 flex flex-wrap gap-3">
          <button
            onClick={handleRecommendClick}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-teal-950 transition hover:bg-neutral-100 active:scale-95 shadow-md"
          >
            <Refrigerator className="h-4 w-4 text-emerald-600" />
            <span>내 냉고 파먹기 시작</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* Grid Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-neutral-400">보관된 재료</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-neutral-800">{ingredients.length}</span>
            <span className="text-xs text-neutral-500">품목</span>
          </div>
          <div className="mt-3 text-[11px] text-teal-600 font-medium">실시간 신선고 보관 중</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-neutral-400">이번주 세이브</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-neutral-800">2.4</span>
            <span className="text-xs text-neutral-500">kg</span>
          </div>
          <div className="mt-3 text-[11px] text-emerald-600 font-medium">탄소 배출량 4.2kg 저감</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex flex-col justify-between">
          <span className="text-xs font-medium text-neutral-400">나의 요리 등급</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-neutral-800">새싹 셰프</span>
          </div>
          <div className="mt-3 text-[11px] text-amber-600 font-medium">레시피 완수 경험 상위 18%</div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-neutral-100 shadow-xs flex flex-col justify-between col-span-2 md:col-span-1">
          <span className="text-xs font-medium text-neutral-400">보호 중인 냉장고</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-2xl font-bold text-neutral-800">1</span>
            <span className="text-xs text-neutral-500">대</span>
          </div>
          <div className="mt-3 text-[11px] text-indigo-600 font-medium">센서 연동 완료</div>
        </div>
      </div>

      {/* Guide Steps */}
      <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-xs">
        <h2 className="text-base font-bold text-neutral-800 flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-teal-600" />
          <span>사용 방법 안내</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-800">재료 등록 및 관리</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                '내 냉장고' 탭에서 보관 중인 재료와 양념 품목을 터치하여 쉽게 등록하세요.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-800">추천 요리 탐색</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                '레시피 추천' 버튼을 누르면 AI가 현재 보관 자산을 분석하여 가장 알맞은 요리법을 제안합니다.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 font-bold text-sm">
              3
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-800">체크리스트 쿠킹</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                실제로 조리하면서 레시피 스텝별로 체크하며 맛있게 식사를 차려낼 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Tips Banner Box */}
      <div>
        <h2 className="text-base font-bold text-neutral-800 flex items-center gap-2 mb-4">
          <Lightbulb className="h-4 w-4 text-amber-500 animate-pulse" />
          <span>오늘의 냉장고 수호 가이드</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tips.map((tip, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.01 }}
              className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-tight text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                    {tip.tag}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-neutral-800">{tip.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">{tip.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
