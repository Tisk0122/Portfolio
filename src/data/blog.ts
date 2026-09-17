import type { Localized } from "@/lib/types";

export interface BlogPost {
  slug: string;
  title: Localized;
  excerpt: Localized;
  /** ISO date string (YYYY-MM-DD) */
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  relatedProjectSlug?: string;
  /**
   * Body content as an array of blocks so the renderer stays simple and
   * dependency-free (no MDX pipeline required). Each block is bilingual.
   */
  body: Localized<string>[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "security-ai-v0-4-honest-report",
    title: {
      ja: "自作Transformerで脆弱性分類AIを作って、v0.4で分かった「悪くなった」こと",
      en: "Building a vulnerability classifier from scratch: what v0.4 revealed (including the regressions)",
    },
    excerpt: {
      ja: "PyTorchもHugging Faceも使わず、NumPyだけでTransformerを一から実装した研究プロジェクト。v0.4での発見・バグ・そして「改善しなかった」結果を正直に書きます。",
      en: "A research project that implements a transformer from scratch in NumPy alone — no PyTorch, no Hugging Face. Here's what v0.4 found, including the bugs and the results that didn't improve.",
    },
    publishedAt: "2026-09-16",
    tags: ["Security AI", "Machine Learning", "NumPy"],
    relatedProjectSlug: "security-ai",
    body: [
      {
        ja: "Security AIは、コード・ログ・設定ファイルを入力すると脆弱性カテゴリとリスク度を推定する個人プロジェクトです。既存のLLM APIを呼ぶだけの「セキュリティAI」ではなく、バイトレベルBPE Tokenizer、Transformer(Attention・FFN・LayerNorm・残差接続)、Adam Optimizer、学習ループのすべてをNumPyのみで自作しています。",
        en: "Security AI is a personal project that estimates a vulnerability category and risk level from code, logs, or config input. Rather than wrapping an existing LLM API, I implemented the byte-level BPE tokenizer, the transformer (attention, feed-forward, layer norm, residual connections), the Adam optimizer, and the training loop entirely in NumPy.",
      },
      {
        ja: "v0.4では、Decoder-only構成(Model A)とEncoder-only構成(Model B)をcausalフラグ以外まったく同じコードパスで比較できる基盤を作りました。公平な比較のために、データセット・Tokenizer・評価パイプラインもすべて共通化しています。",
        en: "For v0.4, I built infrastructure to compare a decoder-only architecture (Model A) against an encoder-only one (Model B) using an identical codepath aside from the causal flag — same dataset, same tokenizer, same evaluation pipeline, for a genuinely fair comparison.",
      },
      {
        ja: "見つけたバグの一つ: 学習序盤(epoch1、実質まだ何も学習していない状態)が、checkpoint選定スコア上「最良」と誤判定されるケースがありました。過学習が始まる前は一見スコアが良く見えることが原因です。`min_epoch_for_promotion`というパラメータを追加し、一定epoch数を経過するまでは昇格させない仕組みで修正しました。",
        en: "One bug I found: checkpoint selection would sometimes pick epoch 1 — a model that had barely learned anything — as the \"best\" checkpoint, because its score looked deceptively good before overfitting kicked in. I fixed it by adding a `min_epoch_for_promotion` guard that withholds promotion until a minimum number of epochs has passed.",
      },
      {
        ja: "正直に言うと、v0.4の絶対的な精度は高くありません。Standard TestのCategory F1は約0.10、未知の構造(Unseen Structure)へのF1はさらに低い0.057(Model A)。v0.3のF1=0.073からむしろ悪化しています。カテゴリ再編成があったため単純比較はできないものの、「本当に未知の構造へ一般化できるAI」という核心目標は依然として未達成です。",
        en: "To be candid, absolute accuracy in v0.4 is still low — around 0.10 Category F1 on the standard test set, and an even lower 0.057 on unseen structural patterns (Model A). That's actually worse than v0.3's F1 of 0.073. The category taxonomy changed in between, so it isn't a clean apples-to-apples comparison, but the core goal — genuinely generalizing to unseen code structures — remains unmet.",
      },
      {
        ja: "Hard Negative評価(安全なコードを安全と正しく判定できるか)では、vuln_accuracy(危険なコードを検出する精度)は0.92〜1.00と高い一方、safe_accuracy(安全なコードを安全と判定する精度)は約0.39と低く、モデルが「疑わしきは危険」に偏っていることが分かりました。これは実運用では誤警告(False Positive)の多さとして表れます。",
        en: "In hard-negative evaluation (does the model correctly recognize safe code as safe?), vuln_accuracy — correctly flagging dangerous code — was high at 0.92–1.00, but safe_accuracy — correctly recognizing safe code as safe — was only around 0.39. The model clearly leans toward \"flag anything that looks suspicious,\" which in practice means a lot of false positives.",
      },
      {
        ja: "数字だけ見ると地味な結果ですが、今回の一番の学びは精度そのものより「検証の仕組みを誠実に作ること」でした。Promotion Gate、リーク検知、複数の評価split、そして失敗した実験をそのまま記録する運用があることで、数字が悪くても「なぜ悪いのか」「次に何を検証すべきか」が明確になります。v0.5では家族数(データの多様性)の拡大と、Hard Negativeの誤検知改善を優先課題にしています。",
        en: "The numbers alone aren't impressive, but the real lesson from this round was the value of an honest verification harness, not raw accuracy. With a promotion gate, leak detection, multiple evaluation splits, and a habit of recording failed experiments rather than hiding them, a bad number still tells you exactly why it's bad and what to check next. For v0.5, the priorities are expanding data diversity and cutting down hard-negative false positives.",
      },
    ],
  },
  {
    slug: "why-i-build-no-signup-tools",
    title: {
      ja: "「登録不要・完全無料」にこだわって作る小さなツール群について",
      en: "Why I keep building small, no-sign-up, completely free tools",
    },
    excerpt: {
      ja: "秒速ツールや手取り計算くんなど、あえて機能を絞った小さなWebツールを作り続けている理由。",
      en: "Why projects like Byosoku Tools and the take-home pay calculator stay deliberately small, free, and sign-up-free.",
    },
    publishedAt: "2026-08-02",
    tags: ["Product", "Next.js"],
    relatedProjectSlug: "byosoku-tools",
    body: [
      {
        ja: "日常のちょっとした計算や作業のたびに、別々のサイトを探して開くのが面倒だと感じたのが秒速ツールを作ったきっかけでした。文字数カウント、税金計算、割り勘計算など、単体では小さすぎて誰も真剣に作らないような機能を、ひとつの場所にまとめています。",
        en: "Byosoku Tools started from a simple annoyance: hunting for a different website every time I needed a small calculation or quick text operation. It bundles utilities — character counting, tax calculators, bill-splitting — that are each too small on their own for anyone to build seriously, into one place.",
      },
      {
        ja: "こうしたツールに共通しているのは「登録不要」「完全無料」「ブラウザ内処理で入力データを外部送信しない」という3原則です。ちょっとした計算のためにアカウントを作らされるのは体験として最悪だと思っていて、この制約を守ることが結果的に設計をシンプルに保つことにもつながっています。",
        en: "Every one of these tools follows the same three rules: no sign-up, completely free, and all processing happens in the browser so input data never leaves the device. Being forced to create an account for a quick calculation is a terrible experience, and sticking to that constraint has also kept the underlying design simple.",
      },
      {
        ja: "手取り計算くんでは、単純な計算だけでなく「なぜこの金額になるのか」を理解してもらうためのガイドやFAQ、用語集も用意しました。数字を出すだけでなく、給与や社会保険の仕組みに詳しくない人でも安心して使える設計を意識しています。",
        en: "For the take-home pay calculator, I went beyond the raw numbers and added a guide, FAQ, and glossary so people can understand why they end up with that figure. The goal isn't just to spit out a number — it's to make the tool approachable even for someone unfamiliar with how salary deductions and social insurance actually work.",
      },
    ],
  },
];

export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/** Rough reading time estimate, based on the longer of the two locale word counts. */
export function estimateReadingMinutes(post: BlogPost): number {
  const wordsJa = post.body.reduce((sum, block) => sum + block.ja.length, 0) / 2.2; // ja: chars/min approx
  const wordsEn = post.body.reduce((sum, block) => sum + block.en.split(/\s+/).length, 0);
  const minutesJa = wordsJa / 180;
  const minutesEn = wordsEn / 200;
  return Math.max(1, Math.round(Math.max(minutesJa, minutesEn)));
}
