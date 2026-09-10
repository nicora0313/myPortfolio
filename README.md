# NICOLAS Portfolio — Next.js App Router版

StackBlitz / Next.js App Router 用に整理したポートフォリオです。

## 構成

```text
my-portfolio/
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
│  │  ├─ DrawerMenu.jsx
│  │  ├─ CharacterCard.jsx
│  │  ├─ HeroSlider.jsx
│  │  └─ PageTitle.jsx
│  ├─ data/
│  │  ├─ site.js
│  │  ├─ oc.js
│  │  ├─ trpg.js
│  │  ├─ works.js
│  │  └─ stance.js
│  ├─ styles/
│  │  ├─ global.css
│  │  └─ components.module.css
│  └─ app/
│     ├─ layout.jsx
│     ├─ page.jsx
│     ├─ characters/
│     │  ├─ page.jsx
│     │  └─ [id]/page.jsx
│     ├─ works/page.jsx
│     └─ stance/page.jsx
└─ public/images/
```

実装上必要な小さな補助コンポーネントも `src/components/` に追加しています。

## 3つの問題への対応

### 1. SEO / OGP
- App Routerの各URLを本物のページとして出力
- `output: "export"` で静的HTML生成
- `/characters/01/` のキャラ詳細ごとに `generateMetadata()` で個別title/description/OGP
- `sitemap.xml` / `robots.txt` も生成

### 2. innerHTML / XSS
- `innerHTML` / `dangerouslySetInnerHTML` は使用していません
- データはReactの通常の `{text}` として出力され、自動エスケープされます

### 3. アクセシビリティ
- ページ移動後に `h1` へフォーカス
- スキップリンク
- DrawerのESC閉じ / フォーカストラップ
- `aria-expanded`, `aria-current`, `aria-selected`
- `noscript` メッセージ
- `prefers-reduced-motion`

## StackBlitz

1. このフォルダをGitHubへアップロード
2. StackBlitz → **Import from GitHub**
3. `npm install`
4. `npm run dev`

## GitHub Pages

このプロジェクトは静的export対応です。GitHub Pagesで `https://USER.github.io/portfolio/` に出す場合はビルド時に:

```bash
NEXT_PUBLIC_BASE_PATH=/portfolio npm run build
```

出力は `out/` に生成されます。

## 画像
すべてWebP前提です。`public/images/` 以下の同名画像を本物の画像で置き換えてください。
