import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Home, Refrigerator, Sparkles, Heart, User, Utensils, Compass, HelpCircle } from "lucide-react";
import { AppTab, FridgeIngredient, Recipe, IngredientCategory } from "./types";
import { INITIAL_INGREDIENTS, INITIAL_RECIPES, FAVORITE_RECIPES } from "./data";

// Sub-views
import HomeView from "./components/HomeView";
import FridgeView from "./components/FridgeView";
import RecipeListView from "./components/RecipeListView";
import FavoritesView from "./components/FavoritesView";
import MyPageView from "./components/MyPageView";
import RecipeDetailsView from "./components/RecipeDetailsView";

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>("home");
  const [ingredients, setIngredients] = useState<FridgeIngredient[]>(INITIAL_INGREDIENTS);
  
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>(FAVORITE_RECIPES);
  
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFallbackMode, setIsFallbackMode] = useState(false);

  // Add ingredient
  const handleAddIngredient = (name: string, category: IngredientCategory) => {
    setIngredients(prev => [...prev, { name, category }]);
  };

  // Remove ingredient
  const handleRemoveIngredient = (name: string) => {
    setIngredients(prev => prev.filter(ing => ing.name !== name));
  };

  // Select / Close recipe details
  const handleSelectRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipeDetails = () => {
    setSelectedRecipe(null);
  };

  // Toggle favorite saved recipes
  const handleToggleSaveRecipe = (recipe: Recipe) => {
    const isSaved = savedRecipes.some(r => r.id === recipe.id);
    if (isSaved) {
      setSavedRecipes(prev => prev.filter(r => r.id !== recipe.id));
    } else {
      setSavedRecipes(prev => [...prev, recipe]);
    }
  };

  // AI Recipe generation engine proxy call
  const handleGenerateRecipes = async () => {
    setIsLoading(true);
    setIsFallbackMode(false);
    setSelectedRecipe(null); // clear any active detail focus

    const ingredientNames = ingredients.map(i => i.name);

    try {
      const response = await fetch("/api/generate-recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: ingredientNames })
      });

      if (!response.ok) {
        throw new Error("서버 에러가 발생했습니다.");
      }

      const data = await response.json();
      
      if (data && Array.isArray(data.recipes)) {
        setRecipes(data.recipes);
        if (data.isFallback) {
          setIsFallbackMode(true);
        }
      } else if (Array.isArray(data)) {
        setRecipes(data);
      } else {
        throw new Error("유효하지 않은 응답 형식입니다.");
      }

      // Navigate to recommendation tab to display matched dishes
      setActiveTab("recommendations");
    } catch (err) {
      console.error("AI Recipe creation failed, using curated backup logic: ", err);
      // Seamless Curated fallback backup list
      setIsFallbackMode(true);
      setRecipes(INITIAL_RECIPES);
      setActiveTab("recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  // Render current tab contents
  const renderTabContent = () => {
    if (selectedRecipe) {
      return (
        <RecipeDetailsView
          recipe={selectedRecipe}
          onBack={handleCloseRecipeDetails}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return <HomeView ingredients={ingredients} onNavigate={(tab) => setActiveTab(tab)} />;
      case "fridge":
        return (
          <FridgeView
            ingredients={ingredients}
            onAddIngredient={handleAddIngredient}
            onRemoveIngredient={handleRemoveIngredient}
            onGenerate={handleGenerateRecipes}
            isLoading={isLoading}
          />
        );
      case "recommendations":
        return (
          <RecipeListView
            recipes={recipes}
            onSelectRecipe={handleSelectRecipe}
            savedRecipeIds={savedRecipes.map(r => r.id)}
            onToggleSave={handleToggleSaveRecipe}
            isFallbackMode={isFallbackMode}
          />
        );
      case "favorites":
        return (
          <FavoritesView
            savedRecipes={savedRecipes}
            onSelectRecipe={handleSelectRecipe}
            onToggleSave={handleToggleSaveRecipe}
          />
        );
      case "mypage":
        return (
          <MyPageView
            onSelectRecipe={handleSelectRecipe}
            savedCount={savedRecipes.length}
          />
        );
      default:
        return <HomeView ingredients={ingredients} onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-neutral-800 flex flex-col antialiased">
      {/* Desktop / Global persistent Top navigation bar header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-neutral-100 px-6 py-4.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => { setActiveTab("home"); setSelectedRecipe(null); }}
            className="flex items-center gap-2 cursor-pointer active:scale-98 transition"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-sm">
              <Utensils className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-neutral-900 block">
                냉장고를 부탁해 AI
              </span>
              <span className="text-[9px] text-teal-600 font-bold tracking-wider uppercase block -mt-0.5">
                SMART COOK ASSISTANT
              </span>
            </div>
          </div>

          {/* Desktop Tab Selector */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold text-neutral-500">
            <button
              onClick={() => { setActiveTab("home"); setSelectedRecipe(null); }}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'home' && !selectedRecipe ? 'bg-neutral-900 text-white shadow-2xs' : 'hover:bg-neutral-50'}`}
            >
              홈 대시보드
            </button>
            <button
              onClick={() => { setActiveTab("fridge"); setSelectedRecipe(null); }}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'fridge' && !selectedRecipe ? 'bg-neutral-900 text-white shadow-2xs' : 'hover:bg-neutral-50'}`}
            >
              내 냉장고
            </button>
            <button
              onClick={() => { setActiveTab("recommendations"); setSelectedRecipe(null); }}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'recommendations' && !selectedRecipe ? 'bg-neutral-900 text-white shadow-2xs' : 'hover:bg-neutral-50'}`}
            >
              AI 추천 레시피
            </button>
            <button
              onClick={() => { setActiveTab("favorites"); setSelectedRecipe(null); }}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'favorites' && !selectedRecipe ? 'bg-neutral-900 text-white shadow-2xs' : 'hover:bg-neutral-50'}`}
            >
              레시피 보관함
            </button>
            <button
              onClick={() => { setActiveTab("mypage"); setSelectedRecipe(null); }}
              className={`px-3.5 py-2 rounded-xl transition ${activeTab === 'mypage' && !selectedRecipe ? 'bg-neutral-900 text-white shadow-2xs' : 'hover:bg-neutral-50'}`}
            >
              마이 셰프
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container core render area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6 md:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + (selectedRecipe ? `-detail-${selectedRecipe.id}` : "-list")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile persistent bottom navigation bar action drawer */}
      <footer className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-100 py-2 shadow-lg px-4 flex justify-around">
        <button
          onClick={() => { setActiveTab("home"); setSelectedRecipe(null); }}
          className={`flex flex-col items-center gap-1.5 transition active:scale-95 ${activeTab === 'home' && !selectedRecipe ? 'text-teal-600' : 'text-neutral-400'}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-bold">홈</span>
        </button>

        <button
          onClick={() => { setActiveTab("fridge"); setSelectedRecipe(null); }}
          className={`flex flex-col items-center gap-1.5 transition active:scale-95 ${activeTab === 'fridge' && !selectedRecipe ? 'text-teal-600' : 'text-neutral-400'}`}
        >
          <Refrigerator className="h-5 w-5" />
          <span className="text-[10px] font-bold">내 냉고</span>
        </button>

        <button
          onClick={() => { setActiveTab("recommendations"); setSelectedRecipe(null); }}
          className={`flex flex-col items-center gap-1.5 transition active:scale-95 ${activeTab === 'recommendations' && !selectedRecipe ? 'text-teal-600' : 'text-neutral-400'}`}
        >
          <Sparkles className="h-5 w-5" />
          <span className="text-[10px] font-bold">AI 제안</span>
        </button>

        <button
          onClick={() => { setActiveTab("favorites"); setSelectedRecipe(null); }}
          className={`flex flex-col items-center gap-1.5 transition active:scale-95 ${activeTab === 'favorites' && !selectedRecipe ? 'text-teal-600' : 'text-neutral-400'}`}
        >
          <Heart className="h-5 w-5" />
          <span className="text-[10px] font-bold">보관함</span>
        </button>

        <button
          onClick={() => { setActiveTab("mypage"); setSelectedRecipe(null); }}
          className={`flex flex-col items-center gap-1.5 transition active:scale-95 ${activeTab === 'mypage' && !selectedRecipe ? 'text-teal-600' : 'text-neutral-400'}`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-bold">마이</span>
        </button>
      </footer>
    </div>
  );
}
