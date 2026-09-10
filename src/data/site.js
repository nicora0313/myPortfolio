export const site = {
  "siteName": "YOUR / PORTFOLIO",
  "footer": "© 2026 YOUR NAME / PORTFOLIO. All rights reserved.",
  "home": {
    "kicker": "ILLUSTRATOR / CHARACTER DESIGN",
    "titleTop": "NICO",
    "titleBottom": "LAS",
    "credit": "NICOLAS",
    "year": "2026",
    "taglineJa": "描きたいものを、ずっと描き続ける。",
    "text": "To draw what I want to draw, forever.",
    "aboutJa": "少年・青年を中心に、キャラクターデザインや一枚絵、立ち絵などを制作しています。",
    "aboutEn": "Original characters, illustration and visual development.",
    "aboutSubcopy": "ILLUSTRATOR / CHARACTER DESIGN",
    "tags": [
      "ORIGINAL",
      "CHARACTER",
      "ILLUSTRATION",
      "VISUAL DEVELOPMENT"
    ],
    "news": [
      {
        "date": "2026.09.08",
        "text": "ポートフォリオのHOMEをリニューアルしました"
      },
      {
        "date": "2026.09.07",
        "text": "SNS用のOGP画像を設定しました"
      },
      {
        "date": "2026.09.06",
        "text": "イラスト・キャラクター表示のUIを調整しました"
      }
    ],
    "ctaTitle": "Available for work",
    "ctaCopy": "ご依頼について",
    "headerImages": [
      {
        "pc": "images/header/header01_pc.webp",
        "sp": "images/header/header01_sp.webp"
      },
      {
        "pc": "images/header/header02_pc.webp",
        "sp": "images/header/header02_sp.webp"
      },
      {
        "pc": "images/header/header03_pc.webp",
        "sp": "images/header/header03_sp.webp"
      }
    ],
    "aboutImage": "images/about.webp",
    "contactImage": "images/contact.webp",
    "selectedWorks": [
      {
        "image": "images/selected/selected01.webp",
        "category": "ORIGINAL",
        "title": "SELECTED WORK 01",
        "sub": "Illustration"
      },
      {
        "image": "images/selected/selected02.webp",
        "category": "ILLUSTRATION",
        "title": "SELECTED WORK 02",
        "sub": "Illustration"
      },
      {
        "image": "images/selected/selected03.webp",
        "category": "CHARACTER DESIGN",
        "title": "SELECTED WORK 03",
        "sub": "Character Design"
      },
      {
        "image": "images/selected/selected04.webp",
        "category": "ORIGINAL",
        "title": "SELECTED WORK 04",
        "sub": "Original"
      },
      {
        "image": "images/selected/selected05.webp",
        "category": "ILLUSTRATION",
        "title": "SELECTED WORK 05",
        "sub": "Illustration"
      },
      {
        "image": "images/selected/selected06.webp",
        "category": "ORIGINAL",
        "title": "SELECTED WORK 06",
        "sub": "Illustration"
      }
    ]
  },
  "socials": [
    {
      "label": "X",
      "url": "#"
    },
    {
      "label": "P",
      "url": "#"
    },
    {
      "label": "✉",
      "url": "mailto:you@example.com"
    }
  ],
  "contact": [
    {
      "label": "X / Twitter",
      "url": "#"
    },
    {
      "label": "pixiv",
      "url": "#"
    },
    {
      "label": "you@example.com",
      "url": "mailto:you@example.com"
    }
  ],
  "description": "Illustration / Character Design / Original Works",
  "siteUrl": "https://nicora0313.github.io/portfolio/",
  "defaultOgp": "ogp.webp",
  "github": {
    "owner": "nicora0313",
    "repo": "portfolio"
  }
};

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path = "") {
  if (!path) return "";
  if (/^(?:https?:)?\/\//i.test(path) || path.startsWith("data:") || path.startsWith("blob:")) return path;
  const clean = String(path).replace(/^\/+/, "");
  return `${BASE_PATH}/${clean}`.replace(/\/{2,}/g, "/");
}

export function absoluteUrl(path = "") {
  const base = site.siteUrl.endsWith("/") ? site.siteUrl : `${site.siteUrl}/`;
  const clean = String(path).replace(/^\/+/, "");
  return new URL(clean, base).toString();
}
