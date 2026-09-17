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
      ja: "既存LLMを使わず、Tokenizer・Transformer・学習ループまで自作した脆弱性分類AI",
      en: "A from-scratch vulnerability-classifier — tokenizer, transformer, and training loop, no existing LLM involved",
    },
    description: {
      ja: "コード・ログ・設定ファイルを入力すると脆弱性カテゴリとリスク度を推定する研究プロジェクト。PyTorchやHugging Faceのラッパーではなく、BPE Tokenizer・Transformer(Attention/FFN/LayerNorm/残差接続)・Adam Optimizer・学習ループをすべてNumPyのみで自作している。",
      en: "A research project that estimates a vulnerability category and risk level from code, logs, or config input. Not a PyTorch/Hugging Face wrapper — the BPE tokenizer, transformer (attention, feed-forward, layer norm, residual connections), Adam optimizer, and training loop are all implemented from scratch in NumPy.",
    },
    status: "in-development",
    features: {
      ja: [
        "既存LLM(GPT/Llama/Gemma/Qwen等)を一切使用しない自作実装",
        "バイトレベルBPE Tokenizerを自前実装",
        "Transformer(Attention / FFN / LayerNorm / 残差接続)をNumPyのみでforward/backward実装",
        "Adam Optimizerを自前実装",
        "Decoder-only(Model A)とEncoder-only(Model B)を公平比較できる基盤",
        "Category / Risk / Type / Safe-Unsafeの4ヘッド構成",
        "Standard Test・Unseen Wording・Unseen Structure・Adversarial・Hard Negative・Regressionに分離した評価",
        "Promotion Gate(基準未達モデルは自動的にREJECT)",
        "Temperature Scalingによるキャリブレーション(ECE / Brierスコア)",
        "MSP・Entropy・Energy等5手法によるUnknown Detection",
        "データセットのfamily重複を機械検証するリーク検知",
        "失敗した実験も含めて正直に記録する実験ログ",
      ],
      en: [
        "Built from scratch without any existing LLM (GPT, Llama, Gemma, Qwen, etc.)",
        "Custom byte-level BPE tokenizer",
        "Transformer (attention, feed-forward, layer norm, residual connections) with forward/backward in pure NumPy",
        "Custom Adam optimizer implementation",
        "A shared codepath for fair Decoder-only (Model A) vs. Encoder-only (Model B) comparison",
        "Four prediction heads: Category / Risk / Type / Safe-Unsafe",
        "Evaluation split into Standard Test, Unseen Wording, Unseen Structure, Adversarial, Hard Negative, and Regression suites",
        "A promotion gate that automatically rejects models failing baseline criteria",
        "Confidence calibration via temperature scaling (ECE, Brier score)",
        "Unknown-class detection compared across 5 methods (MSP, entropy, energy, centroid distance, nearest-neighbor)",
        "Automated leak detection across dataset family overlaps",
        "Experiment logs that record failed runs honestly, not just the wins",
      ],
    },
    tech: ["Python", "NumPy", "Flask"],
    links: {},
    accentColor: "#ff6b6b",
    symbol: "shield",
    detail: {
      overview: {
        ja: "Security AIは、コード・ログ・設定ファイルを入力として、脆弱性カテゴリ(Injection、Broken Access Control、Authentication Failureなど)とリスク度を推定する研究プロジェクトです。最大の特徴は、既存の学習済みLLMを一切使わず、Tokenizer・Transformer・Optimizer・学習ループのすべてをNumPyだけで一から実装している点にあります。",
        en: "Security AI is a research project that takes code, logs, or config files as input and estimates a vulnerability category (Injection, Broken Access Control, Authentication Failure, and more) along with a risk level. Its defining feature: no pretrained LLM is used anywhere in the pipeline — the tokenizer, transformer, optimizer, and training loop are all implemented from scratch in NumPy alone.",
      },
      whyIBuiltIt: {
        ja: "既存のLLM APIを呼び出すだけの「セキュリティAI」は世の中に数多くありますが、それでは中身がブラックボックスのままです。Attentionの計算、逆伝播、Adamの更新式まで自分の手で実装し切ることで、Transformerが実際にどう学習しているのかを本質的に理解したいと考えました。開発環境がCPU1コア・RAM4GBという制約下だったことも、PyTorchに頼らずNumPyだけで完結させる方向を後押ししました。",
        en: "Plenty of \"security AI\" projects are really just a wrapper around an existing LLM API, which leaves the internals as a black box. I wanted to genuinely understand how a transformer learns by implementing attention, backpropagation, and the Adam update rule myself, by hand. The development environment (1 CPU core, 4GB RAM) also pushed me toward a dependency-light, NumPy-only implementation instead of reaching for PyTorch.",
      },
      features: {
        ja: "現在のv0.4では、Decoder-only構成(Model A)とEncoder-only構成(Model B)をcausalフラグ以外まったく同一のコードパスで比較できる基盤を整備し、Promotion Gateによって基準を満たさないモデルを自動的に不採用にする仕組みを構築しました。評価もStandard Testだけでなく、未知の言い回し・未知の構造・敵対的入力・Hard Negative(安全なコードを誤って危険と判定しないか)・Regressionの6種類に分離しており、Calibration(信頼度の較正)やUnknown Detection(未知クラス検出)も5手法で比較しています。",
        en: "As of v0.4, Model A (decoder-only) and Model B (encoder-only) share an identical codepath except for the causal flag, enabling a fair architecture comparison, and a promotion gate automatically rejects any model that fails baseline criteria. Evaluation goes beyond a standard test set to include unseen wording, unseen structure, adversarial inputs, hard negatives (checking the model doesn't flag safe code as dangerous), and a regression suite — plus confidence calibration and unknown-class detection compared across five separate methods.",
      },
      technology: {
        ja: "Python・NumPyのみで構築(PyTorch/TensorFlow/Hugging Faceは不使用)。学習・評価結果を確認できる軽量Web Dashboard(Flask)も同梱しています。",
        en: "Built with Python and NumPy only — no PyTorch, TensorFlow, or Hugging Face. A lightweight Flask dashboard is included for browsing training and evaluation results.",
      },
      technicalPoints: {
        ja: "開発初期に、学習序盤(epoch1、実質未学習の状態)がcheckpoint選定スコア上「最良」と誤判定されるバグを発見しました。過学習前で一見スコアが良く見えることが原因で、`min_epoch_for_promotion`パラメータを追加して修正しています。こうした失敗と修正の経緯は、成功した結果だけでなく`docs/`配下のレポートに実験ログとしてそのまま記録しています。",
        en: "Early on, I found a bug where checkpoint selection would mistakenly pick epoch 1 — an essentially untrained model — as the \"best\" checkpoint, because its score looked deceptively good before overfitting had a chance to set in. I fixed it by adding a `min_epoch_for_promotion` guard. Failures like this are recorded in the experiment logs and reports under `docs/`, not just the runs that worked.",
      },
      challenges: {
        ja: "正直に言うと、現時点(v0.4)の絶対的な精度は高くありません。Standard TestのCategory F1は約0.10、Unseen Structure(未知の構造)ではさらに低下しており、「本当に未知の構造へ一般化できるAI」という核心的な目標はまだ未達成です。またHard Negativeの評価では、安全なコードを安全と正しく判定できる割合(約39%)が低く、モデルが「疑わしきは危険」に偏っていることも分かっています。これらの限界はすべて`docs/v0.4_report.md`に、成功した結果と同じ扱いで記載しています。",
        en: "To be candid, absolute accuracy as of v0.4 is still low — Category F1 on the standard test set is around 0.10, and it drops further on unseen structural patterns, so the core goal of \"genuinely generalizing to unseen code structures\" remains unmet. Hard-negative evaluation also shows the model correctly recognizes safe code as safe only about 39% of the time, meaning it currently leans toward \"flag anything that looks suspicious.\" All of these limitations are documented in `docs/v0.4_report.md` with the same weight as the parts that worked.",
      },
      privacy: {
        ja: "防御目的に限定した設計方針を明文化しています。分類・リスク判定のみを行い、攻撃コードの生成・実行、ファイル削除やネットワーク設定変更などの破壊的操作は一切実装していません。学習データも著作権に配慮した合成テンプレートベースで生成しています。",
        en: "The project has an explicit defense-only design policy: it only classifies and scores risk — it does not generate or execute attack code, and contains no destructive operations like file deletion or network reconfiguration. Training data is also synthetic and template-generated to avoid copyright concerns.",
      },
      whatILearned: {
        ja: "モデルの精度そのものより、「検証の仕組みを誠実に作ること」の重要さを学びました。Promotion Gateやリーク検知、複数の評価split、失敗実験の記録といった仕組みがあることで、数字が悪くても「なぜ悪いのか」「次に何を検証すべきか」が明確になります。v0.5では家族数(データの多様性)の拡大とHard Negativeの誤検知改善を優先課題としています。",
        en: "The biggest lesson wasn't about model accuracy — it was the value of building an honest verification harness. With a promotion gate, leak detection, multiple evaluation splits, and a habit of logging failed runs, a bad number still tells you exactly why it's bad and what to check next. For v0.5, the priorities are expanding data family diversity and reducing hard-negative false positives.",
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
