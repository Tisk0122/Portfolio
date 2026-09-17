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
      ja: "既存LLMを使わず、Tokenizer・Transformer・学習ループまで自作した脆弱性分類AI。v0.7では「見かけ上の改善」を自ら反証",
      en: "A from-scratch vulnerability classifier — tokenizer, transformer, and training loop, no existing LLM. In v0.7 it disproved its own apparent improvement",
    },
    description: {
      ja: "コード・ログ・設定ファイルを入力すると脆弱性カテゴリとリスク度を推定する研究プロジェクト。PyTorchやHugging Faceのラッパーではなく、BPE Tokenizer・Transformer(Attention/FFN/LayerNorm/残差接続)・Adam Optimizer・学習ループをすべてNumPyのみで自作している。v0.7では「ログの並び順を学習できているか」を検証する決定的テストを設計し、一見成功に見えたスコア改善が実は順序理解によるものではないことを実験で確定させた。",
      en: "A research project that estimates a vulnerability category and risk level from code, logs, or config input. Not a PyTorch/Hugging Face wrapper — the BPE tokenizer, transformer (attention, feed-forward, layer norm, residual connections), Adam optimizer, and training loop are all implemented from scratch in NumPy. In v0.7 it designed a decisive test for whether the model actually learned event ordering in logs, and used it to disprove what initially looked like a real improvement.",
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
        "Promotion Gate(基準未達モデルは自動的にREJECT、手法別チェックで見逃しを防止)",
        "Temperature Scalingによるキャリブレーション(ECE / Brierスコア)",
        "MSP・Entropy・Energy・Centroid・Nearest-Neighborの5手法によるUnknown Detection",
        "ログの順序理解だけを狙い撃ちで検証するorder_pair評価・order_sensitivity計測",
        "データセットのfamily重複を機械検証するリーク検知",
        "失敗した実験・反証された仮説も含めて正直に記録する実験ログ(全41 Unit Test)",
      ],
      en: [
        "Built from scratch without any existing LLM (GPT, Llama, Gemma, Qwen, etc.)",
        "Custom byte-level BPE tokenizer",
        "Transformer (attention, feed-forward, layer norm, residual connections) with forward/backward in pure NumPy",
        "Custom Adam optimizer implementation",
        "A shared codepath for fair Decoder-only (Model A) vs. Encoder-only (Model B) comparison",
        "Four prediction heads: Category / Risk / Type / Safe-Unsafe",
        "Evaluation split into Standard Test, Unseen Wording, Unseen Structure, Adversarial, Hard Negative, and Regression suites",
        "A promotion gate that automatically rejects models failing baseline criteria, with per-method checks to prevent silent regressions",
        "Confidence calibration via temperature scaling (ECE, Brier score)",
        "Unknown-class detection compared across 5 methods (MSP, entropy, energy, centroid distance, nearest-neighbor)",
        "An order_pair evaluation and order_sensitivity metric designed specifically to test whether the model learned event ordering",
        "Automated leak detection across dataset family overlaps",
        "Experiment logs that record failed runs and disproven hypotheses honestly, not just the wins (41 passing unit tests)",
      ],
    },
    tech: ["Python", "NumPy", "Flask"],
    links: {},
    accentColor: "#ff6b6b",
    symbol: "shield",
    detail: {
      overview: {
        ja: "Security AIは、コード・ログ・設定ファイルを入力として、脆弱性カテゴリ(Injection、Broken Access Control、Authentication Failureなど)とリスク度を推定する研究プロジェクトです。最大の特徴は、既存の学習済みLLMを一切使わず、Tokenizer・Transformer・Optimizer・学習ループのすべてをNumPyだけで一から実装している点にあります。v0.7からは「ログの時系列(イベントの順序)を本当に理解しているか」という、より難しい問いに取り組んでいます。",
        en: "Security AI is a research project that takes code, logs, or config files as input and estimates a vulnerability category (Injection, Broken Access Control, Authentication Failure, and more) along with a risk level. Its defining feature: no pretrained LLM is used anywhere in the pipeline — the tokenizer, transformer, optimizer, and training loop are all implemented from scratch in NumPy alone. Since v0.7 the project has been tackling a harder question: does the model genuinely understand the order of events in a log sequence?",
      },
      whyIBuiltIt: {
        ja: "既存のLLM APIを呼び出すだけの「セキュリティAI」は世の中に数多くありますが、それでは中身がブラックボックスのままです。Attentionの計算、逆伝播、Adamの更新式まで自分の手で実装し切ることで、Transformerが実際にどう学習しているのかを本質的に理解したいと考えました。開発環境がCPU1コア・RAM4GBという制約下だったことも、PyTorchに頼らずNumPyだけで完結させる方向を後押ししました。",
        en: "Plenty of \"security AI\" projects are really just a wrapper around an existing LLM API, which leaves the internals as a black box. I wanted to genuinely understand how a transformer learns by implementing attention, backpropagation, and the Adam update rule myself, by hand. The development environment (1 CPU core, 4GB RAM) also pushed me toward a dependency-light, NumPy-only implementation instead of reaching for PyTorch.",
      },
      features: {
        ja: "v0.7では、監査ログの無効化とその後の設定変更のように「個々のイベントは正常でも、順序込みで見ると異常」なログ列を検出できるかを検証する専用データセット(v7_logseq)を新設しました。Positional Encodingの有無だけをスイッチできる公平な比較基盤(パラメータ数は45,667で完全一致)を作り、通常のテストに加えて「同じイベント集合・異なる順序・異なるラベル」のペアだけを集めたorder_pair評価と、イベント順をシャッフルしたときに予測がどれだけ変わるかを測るorder_sensitivityという2つの決定的な検証を導入しました。",
        en: "For v0.7, I built a dedicated dataset (v7_logseq) to test whether the model can detect log sequences that look fine event-by-event but are anomalous once order is taken into account — like disabling audit logging followed by a config change. A fair comparison harness toggles only positional encoding on or off while keeping parameter count identical (45,667 either way), and I added two decisive tests beyond the standard evaluation: an order_pair split containing only pairs with the same events in a different order and a different label, and an order_sensitivity metric measuring how much predictions change when the event order is shuffled.",
      },
      technology: {
        ja: "Python・NumPyのみで構築(PyTorch/TensorFlow/Hugging Faceは不使用)。学習・評価結果を確認できる軽量Web Dashboard(Flask)も同梱しています。",
        en: "Built with Python and NumPy only — no PyTorch, TensorFlow, or Hugging Face. A lightweight Flask dashboard is included for browsing training and evaluation results.",
      },
      technicalPoints: {
        ja: "v0.7で見つけたバグの一つは、ログ生成の再現性に関するものでした。Pythonの`hash()`はハッシュランダム化により実行のたびに値が変わるため、生成されるデータ件数が193/186/188と実行ごとに揺れていました。`hashlib.sha256`ベースに置き換えて修正し、再発防止のための回帰テストも追加しています。実はこれと同種のバグはv0.3でも一度経験しており、教訓を活かしきれず再発させてしまった点も含めて記録しています。もう一つは、初版のorder-blindモデル(Positional Encodingなし版)がTransformerブロックごと無効化されておりパラメータ数が桁違い(1,683 vs 45,811)だったという、比較の前提が崩れていたバグです。これは実験実施前に発見し、Positional Encodingだけを外す設計に修正しました。",
        en: "One bug found in v0.7 involved reproducibility of the log generator: Python's `hash()` is randomized per run, so the number of generated examples drifted (193/186/188) between runs. I fixed it by switching to `hashlib.sha256` and added a regression test to catch it again — notably, I'd hit a very similar bug back in v0.3 and didn't fully learn the lesson the first time, which is recorded as-is. A second bug was more fundamental: the first draft of the \"order-blind\" comparison model disabled the entire transformer block instead of just positional encoding, giving it a wildly different parameter count (1,683 vs 45,811) and invalidating the comparison. I caught this before running the real experiment and fixed the design to disable only positional encoding.",
      },
      challenges: {
        ja: "v0.7の核心は「見かけ上の成功に騙されなかったこと」です。Sequence-aware(順序情報あり)モデルは、未知の構造(unseen_structure)テストで0.399→0.620という大きな改善を示し、一見「順序を学習できた」ように見えました。しかし決定的な検証テストでは正反対の結果が出ました: 同じイベント集合でも順序が違えばラベルも違う、というペアを見分けるorder_pair精度は0.367で、順序情報を持たないモデルの0.483より低い。さらにイベント順をシャッフルしても予測の92%が変化しない(order_sensitivity=0.077)ことも確認しました。つまりunseen_structureでの改善は、順序理解が原因ではなかったのです。これは指示していた「Accuracyが上がっただけで理解したと結論づけない」という方針が実際に機能した例で、Positional Encodingの追加が入力表現に多様性を与える正則化的な効果をもたらしただけ、という可能性の方が高いと考えています(ただし未検証)。なお、絶対的な分類精度も依然として低く、Standard TestのCategory F1は約0.10〜0.13程度にとどまっています。",
        en: "The heart of v0.7 is not being fooled by an apparent win. The sequence-aware model (with positional encoding) showed a large jump on the unseen_structure test, from 0.399 to 0.620 — on the surface, it looked like the model had learned to use event order. But the decisive tests told the opposite story: order_pair accuracy — correctly distinguishing pairs with the same events in a different order and a different label — came out to 0.367, actually lower than the order-blind model's 0.483. And shuffling the event order left 92% of predictions unchanged (order_sensitivity = 0.077). So the unseen_structure improvement wasn't caused by learning order after all. This is the policy of \"don't conclude the model understood something just because a number went up\" actually paying off in practice — my current best guess (unverified) is that adding positional encoding acted more like a regularizer that added input diversity than a genuine order signal. Absolute classification accuracy also remains modest — Category F1 on the standard test set is still only around 0.10–0.13.",
      },
      privacy: {
        ja: "防御目的に限定した設計方針を明文化しています。分類・リスク判定のみを行い、攻撃コードの生成・実行、ファイル削除やネットワーク設定変更などの破壊的操作は一切実装していません。v7_logseqデータセットのイベントも`auth_success`や`role_change`のような抽象トークンのみで構成し、実行可能な攻撃手順やペイロードは一切含めていません。学習データも著作権に配慮した合成テンプレートベースで生成しています。",
        en: "The project has an explicit defense-only design policy: it only classifies and scores risk — it does not generate or execute attack code, and contains no destructive operations like file deletion or network reconfiguration. Events in the v7_logseq dataset are also limited to abstract tokens like `auth_success` or `role_change` and contain no executable attack procedures or payloads. Training data is also synthetic and template-generated to avoid copyright concerns.",
      },
      whatILearned: {
        ja: "モデルの精度そのものより、「見かけ上の改善を鵜呑みにせず、それを狙い撃ちで反証できるテストを設計すること」の重要さを学びました。単に指標が良くなったことを喜ぶのではなく、「本当にその指標が測りたいものを測っているか」を問い直す仕組み(order_pair、order_sensitivity)があったからこそ、誤った結論を出す前に立ち止まれました。v0.8では、固定の正弦波Positional Encodingではなく学習可能な位置埋め込みでorder_sensitivityが改善するかを直接検証する予定です。",
        en: "The biggest lesson wasn't about model accuracy at all — it was the value of designing a test that specifically tries to disprove an apparent improvement, rather than taking a better metric at face value. Building order_pair and order_sensitivity as tools to ask \"is this metric actually measuring what I think it's measuring?\" is what caught the wrong conclusion before it got reported as a win. For v0.8, the plan is to directly test whether a learned (rather than fixed sinusoidal) positional embedding actually improves order_sensitivity.",
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
