import type { Project } from "@/lib/types";

/**
 * All project data lives here. Add a new object to this array and it will
 * automatically appear in the Projects section and get its own detail page
 * at /projects/[slug].
 */
export const projects: Project[] = [
  {
    slug: "byosoku-tools",
    order: 1,
    name: "秒速ツール",
    tagline: {
      ja: "登録不要・完全無料の日常お助けツール集",
      en: "Free, no sign-up tools for everyday little problems",
    },
    description: {
      ja: "登録不要・完全無料。毎日のちょっとした困りごとをすぐに解決する便利ツール集。",
      en: "No sign-up, completely free — a collection of small utilities that solve everyday problems in seconds.",
    },
    status: "live",
    features: {
      ja: [
        "登録不要",
        "完全無料",
        "ブラウザ内処理",
        "入力データを外部送信しない",
        "レスポンシブ対応",
        "文字数カウント / 改行削除 / 空白削除",
        "全角半角変換 / テキスト比較",
        "消費税計算 / 割引計算 / パーセント計算",
        "割り勘計算 / 年齢計算 / 日数計算 / カウントダウン",
        "偏差値計算 / 勉強時間計算",
        "JSON整形 / UUID生成 / Base64変換",
        "究極の決定ルーレット",
      ],
      en: [
        "No sign-up required",
        "Completely free",
        "All processing happens in the browser",
        "Input data is never sent externally",
        "Fully responsive",
        "Character counter / line-break remover / whitespace remover",
        "Full-width ⇄ half-width converter / text comparison",
        "Sales tax, discount, and percentage calculators",
        "Bill-splitting, age, and day-count calculators, countdown timer",
        "Hensachi (deviation score) and study-time calculators",
        "JSON formatter / UUID generator / Base64 converter",
        "\"Ultimate\" decision roulette",
      ],
    },
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "lucide-react"],
    links: {
      demo: "https://byosoku-tools.vercel.app/",
      github: "https://github.com/Tisk0122/byosoku-tools",
    },
    accentColor: "#5ee6c8",
    symbol: "sparkle",
    detail: {
      overview: {
        ja: "秒速ツールは、登録不要・完全無料で使える日常お助けツール集です。文字数カウントや税金計算、割り勘計算など、ちょっとした場面ですぐに使えるツールをひとつにまとめています。",
        en: "Byosoku Tools is a free, no-sign-up collection of everyday utilities — from character counting to tax and bill-splitting calculators — all in one place for quick, small tasks.",
      },
      whyIBuiltIt: {
        ja: "日常のちょっとした計算や作業のたびに、別々のサイトを探して開くのは面倒だと感じたことがきっかけです。よく使う小さなツールをひとつにまとめて、すぐに使えるようにしたいと考えました。",
        en: "I kept finding myself hunting for a different site every time I needed a small calculation or quick text operation. I wanted to gather the tools I use often into one place I could reach instantly.",
      },
      features: {
        ja: "文字数カウント、改行・空白の削除、全角半角変換、テキスト比較といったテキスト系ツールに加え、消費税・割引・パーセント・割り勘・年齢・日数計算などの計算系ツール、JSON整形やUUID生成、Base64変換といった開発者向けツール、さらに息抜き用の決定ルーレットまで、幅広いツールを収録しています。",
        en: "The collection spans text utilities (character counting, line-break/whitespace removal, full-width/half-width conversion, text comparison), everyday calculators (tax, discount, percentage, bill-splitting, age, day counting), developer utilities (JSON formatting, UUID generation, Base64 conversion), and even a lighthearted decision roulette.",
      },
      technology: {
        ja: "Next.js・React・TypeScript・Tailwind CSSで構築し、アイコンにはlucide-reactを使用しています。",
        en: "Built with Next.js, React, and TypeScript, styled with Tailwind CSS, with icons from lucide-react.",
      },
      privacy: {
        ja: "すべての処理はブラウザ内で完結し、入力したデータが外部に送信されることはありません。",
        en: "All processing happens entirely in the browser — input data is never sent to an external server.",
      },
    },
  },
  {
    slug: "salary-calculator",
    order: 2,
    name: "手取り計算くん",
    tagline: {
      ja: "時給・月給から手取り額を試算する無料シミュレーター",
      en: "A free take-home pay simulator for hourly and monthly wages",
    },
    description: {
      ja: "時給・月給から社会保険料や税金を差し引いた手取り額を、ブラウザ上で手軽に試算できる無料シミュレーター。",
      en: "A free simulator that estimates take-home pay after social insurance and taxes, right in your browser — from either an hourly or monthly wage.",
    },
    status: "live",
    features: {
      ja: [
        "無料",
        "登録不要",
        "ブラウザ内処理",
        "入力データをサーバーに送信しない",
        "給与・社会保険・税金の概算を確認できる",
        "ガイド",
        "FAQ",
        "用語集",
      ],
      en: [
        "Free",
        "No sign-up required",
        "All processing happens in the browser",
        "Input data is never sent to a server",
        "Estimates salary, social insurance, and tax deductions",
        "Built-in guide",
        "FAQ",
        "Glossary of terms",
      ],
    },
    tech: ["Next.js"],
    links: {
      demo: "https://salary-calculator-flax-six.vercel.app/",
    },
    accentColor: "#7c9dff",
    symbol: "yen",
    detail: {
      overview: {
        ja: "手取り計算くんは、時給や月給を入力するだけで、社会保険料や税金を差し引いたおおよその手取り額を試算できるシミュレーターです。",
        en: "Take-Home Pay Calculator lets you enter an hourly or monthly wage and instantly see a rough estimate of your take-home pay after social insurance and tax deductions.",
      },
      whyIBuiltIt: {
        ja: "給与から実際にいくら手元に残るのかが分かりにくいと感じたことから、誰でも気軽に概算できるツールを作りたいと考えました。",
        en: "It's often unclear how much of a paycheck actually ends up in hand, so I wanted to build something anyone could use to get a quick, approximate answer.",
      },
      features: {
        ja: "時給・月給どちらからでも試算でき、ガイドやFAQ、用語集も用意しているため、給与や社会保険に詳しくない方でも使いやすい構成になっています。",
        en: "You can estimate from either an hourly or a monthly wage, and a guide, FAQ, and glossary are built in so the tool stays approachable even if you're not familiar with salary or insurance terminology.",
      },
      technology: {
        ja: "Next.jsで構築されています。",
        en: "Built with Next.js.",
      },
      privacy: {
        ja: "すべての処理はブラウザ内で完結し、入力したデータがサーバーに送信されることはありません。",
        en: "All calculations run in the browser — input data is never sent to a server.",
      },
      challenges: {
        ja: "※この計算結果はあくまで概算であり、正確な税務判断を目的とするものではありません。",
        en: "Note: results are rough estimates only and are not intended for precise tax or financial decisions.",
      },
    },
  },
  {
    slug: "palettepick",
    order: 3,
    name: "PalettePick",
    tagline: {
      ja: "画像からカラーパレットを一括抽出するツール",
      en: "Extract a full color palette from any image",
    },
    description: {
      ja: "画像からカラーパレットを一括抽出する無料Webツール。",
      en: "A free web tool that extracts a color palette from any image you upload.",
    },
    status: "live",
    features: {
      ja: [
        "画像アップロード",
        "主要カラー自動抽出",
        "HEX取得",
        "RGB取得",
        "Tailwind CSSコード取得",
        "ワンクリックコピー",
        "ブラウザ内処理",
        "画像をサーバーへ送信しない",
        "スポイトによる色選択",
      ],
      en: [
        "Image upload",
        "Automatic dominant color extraction",
        "HEX values",
        "RGB values",
        "Tailwind CSS code output",
        "One-click copy",
        "All processing happens in the browser",
        "Images are never sent to a server",
        "Eyedropper color picking",
      ],
    },
    tech: ["Next.js 16", "React 19", "Tailwind CSS v4", "TypeScript"],
    links: {
      demo: "https://color-palette-extractor-zeta.vercel.app/",
      github: "https://github.com/Tisk0122/color-palette-extractor",
    },
    accentColor: "#ff9ecf",
    symbol: "palette",
    detail: {
      overview: {
        ja: "PalettePickは、アップロードした画像から主要なカラーを自動で抽出し、HEXやRGB、Tailwind CSSのコードとしてすぐに取得できるツールです。",
        en: "PalettePick automatically extracts the dominant colors from an uploaded image and gives you the values instantly as HEX, RGB, or Tailwind CSS code.",
      },
      whyIBuiltIt: {
        ja: "デザイン作業の中で、画像からカラーパレットを作る作業を毎回手動で行うのが手間だったため、自動化したいと考えて作りました。",
        en: "I was manually pulling color palettes from reference images during design work often enough that I wanted to automate the process.",
      },
      features: {
        ja: "画像をアップロードするだけで主要カラーを自動抽出し、HEX・RGB・Tailwind CSSコードとしてワンクリックでコピーできます。スポイト機能を使えば画像内の任意の位置から色を選択することも可能です。",
        en: "Simply upload an image to automatically extract its dominant colors, then copy them as HEX, RGB, or Tailwind CSS code with one click. An eyedropper tool also lets you pick a color from any specific point in the image.",
      },
      technology: {
        ja: "Next.js 16・React 19・TypeScript・Tailwind CSS v4で構築しています。",
        en: "Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.",
      },
      privacy: {
        ja: "すべての処理はブラウザ内で完結し、アップロードした画像がサーバーへ送信されることはありません。",
        en: "All processing happens in the browser — uploaded images are never sent to a server.",
      },
    },
  },
  {
    slug: "security-ai",
    order: 4,
    name: "Security AI",
    tagline: {
      ja: "開発中のセキュリティAI",
      en: "A security-focused AI, currently in development",
    },
    description: {
      ja: "現在自作しているセキュリティAI。まだ公開していないため、詳細は近日公開予定です。",
      en: "A security-focused AI currently being built from scratch. Not yet released — details coming soon.",
    },
    status: "in-development",
    features: { ja: [], en: [] },
    tech: [],
    links: {},
    accentColor: "#ff6b6b",
    symbol: "shield",
    detail: {
      overview: {
        ja: "現在開発中のプロジェクトです。詳細は公開準備が整い次第、こちらに追加していきます。",
        en: "This project is currently in development. Details will be added here as they become ready to share.",
      },
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => a.order - b.order);
}
