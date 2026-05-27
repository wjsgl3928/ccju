import { FridgeIngredient, Recipe } from "./types";

export const IMAGE_MAP: Record<string, string> = {
  pork: "https://lh3.googleusercontent.com/aida-public/AB6AXuAN4FyAufkSU1HH3MIekX_qdbjPqIxyxmb53HdOB7SQZPhnh207KW0c0cj06TUnPP8m74p5w0-LY3bu2aVkoghbUupqDi5OTpzQUAJn1neBhUcAcLeKQOBtW5dRVWm1gTAJxJbh1GDK0FNNqQRanBH6dY7Y6oL0ZtNV9mTkteLrCI56KsaBwup-e7iVGb8dINUKLo3VrSWO7F3l4SB36M-UXMUvdrJhkMvGr52QgguyoHBee6zReMCfUKYN1egTPEVxo6WVeFrn8A",
  curry: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnGbUm5b0x3lqyI_sgNubLpcLZU1PUD51OwN7Pvp2K5FxNqpWZMgDLvEx0d7pW6yrdi40ZzGwDoyRHTO1uex1jolkIqTY2VFDKiukFu1yOLa5JrxG4KrRprdMSo3TBa7cm1knp3eQ9wHyaACLytFyeM2IL_FnI43jL1Nv7_HlnGU-wkwYvd3mXVWltBABTK7vBABrSVmn6WYhBgLxwXoTcX7mOPbVPcewHE-Js3J7pGWxAiSfF5pJGGS-8QOtrJjH8eBwsQuS_8Q",
  salad: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmfQhfgNGd25k29DlzOPZ1-5bAi1GKp651nVT4Iz8tXieoDpZ-MoROuEcibVLAXjFK7BO9LJpQecWni7p99B73Q3IY8KGDzYT_SvNewCL9PZEsmwhIeR0w1X6MRK3YfVbny1BD41ZWitZ-TmDJAu-e4Ur_9kMlJHCB10LYzihVxRrGXwKUWIinHZHvmOivTu7SrHtKUsnSp328cMoxHhmGsjnL5XNkWvkL5SBPovS221pkOem5_YRAHnKZuTR0i_BXJm3o2ed24w",
  noodles: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB4uhxvDCb8uVASJxTaRHG56j6K8eaTia64OVrcvTeJ5xBREnM6Khdh0nuHwD9CvQYWVCoSbOAtE9JI7UvpX4qcMBJt8_Foen_y00zd2Uzkg47voxBmpvMKPOt5Zmlrkq6QpBxsa-7kil7L5MpedSAwbLqO2MtJv5BWykg16M8GvPRNlJ3aJn-hLgAWR9Y2dNte5mAB90TLk6xcZMywO73_VaKzsEZHE1XtjYnKoLPkvR1mae1UONhKqFDw4Kmlb2P70Ee9bOs3Q",
  toast: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcXpNMh06sLjFhPQxZY2c-xTqmUqshtN7WX-rcAwCAOJiJUgrZ2dvsI3zAF4wMv1HR31DdMrSVATymbd7myhuZOB9D9Or2os0enxeMOdxlQopOZjm3SW_t7PYW1grQsbsSr5QUTQIkF3HkjymiGk2LKP8C12GOSJo9pJJSiItp-MAG7kupTp8am2od9N_ycq7vbKM52rju2NdP55ibsI6rGKFkG793mRunqE8lHo5y8KOQoG3FhUAzkQ4sxR2kPOFPFI8bw51XDQ",
  pasta: "https://lh3.googleusercontent.com/aida-public/AB6AXuBK2cmrPc3hjAQjVprJ26EqIhOI24Jp09gxvoTHa-P4bZQ34k3A_C4UdEPsWCIwqfPN9z9F9SWu5SfKPw2OoIemYjAKg817TiSUUy75B_QjxmNAa7IBBP9vC4OFlUWSUqJEAGWBuf2-HzuaBu1ovth-qVJjLHon-ve4aUv0kkkzEItonXXOBfIzbd3AaShQvs8nHCcoafgczpDCxWjbKgWqyKO6LomlAQOo7EgIuTMrvYPN35K8morYxD1ezWHTLS3y8J5fvkbAbg",
  beef: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAUO_v2enGazNFhhwI1wZqABmnJ7YmwOzTcz5SyQWiNkqtKWVTaTViGKWoeMtJCfHoL4ztXGE34vavV-ntTV2-hh1YGW57HpyXELjPdyDCG7UpXPjbB8bN9WQC-rj6M5ZsaJUIIwTyHJjbqiqebNwTB9mJvTEIEepZ9kMSc1T7dYM_ZtrSJTMXgBgSnr6cqBBmjMLLt17eNPYvrSu5HFaDFKvrqHdjy_ce5kHq3IZJhUhesoGajreU3d7g_t52YmUoF0E9ZywPGw",
  rice: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAAk-nlg8VRsEvLGxpQPhGTOwf-RjpzIHRZbQGJAJgO57j3jnl8dda4L85KgRbiJrYyaVLCKY11ZTwBEocNoRlCeo0DNPw31QIj8wZS818lXowvRRojM6R9N8G_OKkaMz2YknBM8lH492uOgE9uBHXn_lJOeF76r9-_zFOSlRtQb831tDGeziDC04YonT_cb39ZheQVxl_iCV-FRBP1qKkkzqTjh6QZyd-6l0U8KnKH5pTTWmwB8NKSXj6vt0iNEqclUVSuzLwRA"
};

// Return a valid Unsplash or standard hotlinked URL for keyword
export function getRecipeImageUrl(keyword: string): string {
  const normKey = keyword?.toLowerCase();
  if (normKey && IMAGE_MAP[normKey]) {
    return IMAGE_MAP[normKey];
  }
  // Generic beautiful food banner if key doesn't match
  return "https://lh3.googleusercontent.com/aida-public/AB6AXuBAAk-nlg8VRsEvLGxpQPhGTOwf-RjpzIHRZbQGJAJgO57j3jnl8dda4L85KgRbiJrYyaVLCKY11ZTwBEocNoRlCeo0DNPw31QIj8wZS818lXowvRRojM6R9N8G_OKkaMz2YknBM8lH492uOgE9uBHXn_lJOeF76r9-_zFOSlRtQb831tDGeziDC04YonT_cb39ZheQVxl_iCV-FRBP1qKkkzqTjh6QZyd-6l0U8KnKH5pTTWmwB8NKSXj6vt0iNEqclUVSuzLwRA";
}

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuA36fgYLGc_YApfY2jSJ3lzandgOQom1kj8QepasXpr1gLysMAvTB2sQr5JVT5Lan-_OkfpCZGDnYFI-j10R7XH3HxlkozUIe_H0rjHJk2VXpJYTytqvUqJdVV7jXRM-6E5TK5Ksz5UIwnSzWQhNCCVYdHR_2ug-GIQ1p9Y1rqGtgEqPnkNzW9_ybtW71lJe8q7b0nM6L-DVKuUcjauslEADBIjz7TL3K95CzyDlTw-6eRSXM_cAl79K2lypogdUZA_LkHx3p5ZZw";

export const INITIAL_INGREDIENTS: FridgeIngredient[] = [
  { name: "당근", category: "채소 & 과일" },
  { name: "청경채", category: "채소 & 과일" },
  { name: "감자", category: "채소 & 과일" },
  { name: "방울토마토", category: "채소 & 과일" },
  { name: "삼겹살", category: "육류 & 어류" },
  { name: "우유", category: "유제품 & 알류" },
  { name: "체다치즈", category: "유제품 & 알류" },
  { name: "고추장", category: "양념 & 기타" },
  { name: "올리브유", category: "양념 & 기타" }
];

export const FREQUENT_TAGS = ["계란", "양파", "우유", "닭가슴살", "대파", "마늘", "아보카도", "버섯", "두부", "명란젓"];

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: "pork-veg-stir-fry",
    name: "삼겹살 야채 볶음",
    description: "노릇노릇하게 구운 삼겹살과 아삭한 채소들을 최고급 굴소스로 볶아내어 풍미가 가득한 요리",
    cookTime: "20분",
    difficulty: "쉬움",
    ingredients: ["삼겹살", "당근", "양파", "마늘", "대파", "굴소스", "통깨"],
    category: "한식",
    matchingIngredients: ["삼겹살", "당근", "양파", "대파", "마늘"],
    missingIngredients: ["굴소스", "통깨"],
    steps: [
      "삼겹살은 먹기 좋은 크기(약 2cm 두께)로 썰어 예열한 팬에 노릇하게 굽습니다.",
      "기름이 우러나오면 편썬 마늘과 쫑쫑 썬 대파를 넣어 파기름 향을 그윽하게 냅니다.",
      "당근, 양파를 한데 넣고 채소의 아삭한 식감이 살도록 센 불에서 고루 볶아 줍니다.",
      "굴소스 1큰술과 후추를 살짝 쳐서 간이 고스란히 배도록 빠르게 버무리듯 볶아 완성합니다."
    ],
    imageKeyword: "pork"
  },
  {
    id: "curry-rice",
    name: "감자 당근 카레",
    description: "갓 캐낸 감자와 감미로운 당근이 빚어내는 진하고도 깊은 향의 정통 스타일 일품 가정식 카레",
    cookTime: "35분",
    difficulty: "보통",
    ingredients: ["감자", "당근", "양파", "카레가루", "삼겹살", "식용유"],
    category: "한식",
    matchingIngredients: ["감자", "당근", "삼겹살"],
    missingIngredients: ["카레가루", "양파"],
    steps: [
      "감자, 당근, 양파는 한입에 쏙 들어가는 사각 크기로 깍둑썰기 해둡니다.",
      "두툼한 냄비에 기름을 약간 두르고 삼겹살 고기부터 볶아 마이야르 풍미를 극대화 합니다.",
      "단단한 감자와 당근을 함께 넣어 겉면이 살짝 투명해질 때가지만 중불에서 볶습니다.",
      "물을 부어 재료가 완전히 익힌 뒤, 카레가루를 차근차근 풀고 걸쭉하게 졸여 밥에 얹어냅니다."
    ],
    imageKeyword: "curry"
  },
  {
    id: "pork-potato-roast",
    name: "삼겹살 감자 구이",
    description: "에어프라이어로 구워 기름기는 빠지고 고소함만 남은 바삭발랄한 삼겹살과 웨지 감자의 조화",
    cookTime: "15분",
    difficulty: "쉬움",
    ingredients: ["삼겹살", "감자", "로즈마리", "올리브유", "소금 후추"],
    category: "양식",
    matchingIngredients: ["삼겹살", "감자", "올리브유"],
    missingIngredients: ["로즈마리", "소금 후추"],
    steps: [
      "깨끗한 감자는 쐐기 모양(웨지감자 스타일)으로 자르고 삼겹살 또한 도톰한 한입 크기로 썹니다.",
      "감자는 올리브유와 소금을 살짝 버무려 밑간을 입혀두고 에어프라이어에 넓게 폅니다.",
      "삼겹살과 함께 기기로 들어가 180도 온도에서 겉바속촉 크리스피하게 15분간 로스팅합니다.",
      "식기 전 꺼내어 로즈마리와 후추를 뿌려 내면 맥주 안주 또는 홈파티용 요리로 손색없습니다."
    ],
    imageKeyword: "pork"
  }
];

export const FAVORITE_RECIPES: Recipe[] = [
  {
    id: "avocado-quinoa-salad",
    name: "아보카도 퀴노아 샐러드",
    description: "숲의 버터 아보카도와 영양의 왕 퀴노아가 만난 지중해식 라이트 웰빙 샐러드",
    cookTime: "15분",
    difficulty: "쉬움",
    ingredients: ["아보카도", "퀴노아", "방울토마토", "병아리콩", "올리브유", "레몬즙"],
    category: "양식",
    matchingIngredients: ["방울토마토", "올리브유"],
    missingIngredients: ["아보카도", "퀴노아", "병아리콩", "레몬즙"],
    steps: [
      "퀴노아는 끓는 물에 소금을 약간 넣고 약 10분간 삶아 체에 밭쳐 부드럽게 끓여 식혀둡니다.",
      "아보카도는 씨와 껍질을 살살 분리하여 네모 반듯하게 깍둑썹니다.",
      "방울토마토는 반으로 가르고, 준비한 병아리콩과 식은 퀴노아를 볼에 가득 담아줍니다.",
      "올리브유 2큰술, 레몬즙, 후추를 골고루 버무려 드레싱하고 예쁘게 담아 완성합니다."
    ],
    imageKeyword: "salad"
  },
  {
    id: "spicy-noodles",
    name: "매콤 비빔국수",
    description: "입맛 돋우는 매콤달콤한 소스에 갓 삶아 쫄깃한 면발을 버무려낸 시원하고 간편한 비빔면",
    cookTime: "20분",
    difficulty: "보통",
    ingredients: ["소면", "고추장", "양파", "설탕", "식초", "참기름", "계란", "오이"],
    category: "한식",
    matchingIngredients: ["고추장"],
    missingIngredients: ["소면", "양파", "설탕", "식초", "참기름", "계란", "오이"],
    steps: [
      "끓는 물에 소면을 삶다가 부르르 끓어오를 때 찬물을 부어가며 면발을 쫄깃하게 살려 삶습니다.",
      "찬물에 헹궈 전분기를 바락바락 완벽히 세척한 다음 물기를 꼭 자둡니다.",
      "고추장 2큰술, 설탕 1큰술, 식초 1큰술, 다진 양파, 참기름을 섞어 특제 매콤 양념장을 만듭니다.",
      "소면에 양념장을 듬뿍 넣어 슥슥 버무린 후 삶은 계란과 채썬 오이를 소담히 올려냅니다."
    ],
    imageKeyword: "noodles"
  },
  {
    id: "egg-mayo-toast-fav",
    name: "에그 마요 토스트",
    description: "촉촉하게 삶은 달걀을 부드러운 마요네즈와 비벼 버터 식빵 위에 도톰하게 얹은 영양 만점 스낵",
    cookTime: "10분",
    difficulty: "쉬움",
    ingredients: ["식빵", "계란", "마요네즈", "체다치즈", "우유", "파슬리가루", "꿀"],
    category: "간편식",
    matchingIngredients: ["계란", "체다치즈", "우유"],
    missingIngredients: ["식빵", "마요네즈", "꿀"],
    steps: [
      "계란을 9분 동안 완숙으로 삶아 시원한 물에 담가 껍질을 스무스하게 깐 다음 곱게 으깹니다.",
      "으깬 계란에 마요네즈 3큰술, 우유 1작은술, 후추 한꼬집, 꿀 반스푼을 보태 크리미하게 비벼냅니다.",
      "노릇노릇 토스트한 식빵 위에 촉촉한 체다치즈 1장을 슥 얹고 가볍게 녹여줍니다.",
      "치즈 위에 푸짐한 에그마요 스프레드를 보기 좋게 수북이 고루 펴 바르고 파슬리를 뿌려 먹습니다."
    ],
    imageKeyword: "toast"
  }
];

export const MY_PAGE_STATS = {
  savedCount: 128,
  frequentIngredients: "마늘, 양파, 계란",
  avgCookTime: "15분",
  recentlyViewed: [
    {
      id: "avocado-salad-recent",
      name: "상큼한 아보카도 샐러드",
      cookTime: "10분",
      difficulty: "쉬움",
      imageKeyword: "salad",
      ingredients: ["아보카도", "방울토마토", "샐러드채소", "발사믹드레싱", "올리브유"]
    },
    {
      id: "tomato-basil-pasta-recent",
      name: "토마토 바질 파스타",
      cookTime: "20분",
      difficulty: "보통",
      imageKeyword: "pasta",
      ingredients: ["스파게티면", "토마토소스", "마늘", "바질", "올리브유", "파마산치즈"]
    },
    {
      id: "herb-butter-steak-recent",
      name: "허브 버터 스테이크",
      cookTime: "30분",
      difficulty: "어려움",
      imageKeyword: "beef",
      ingredients: ["소고기 등심", "버터", "로즈마리", "마늘", "아스파라거스", "소금 후추"]
    }
  ]
};
