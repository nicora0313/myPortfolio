import "@/styles/global.css";
import Header from "@/components/Header";
import RouteFocus from "@/components/RouteFocus";
import { site, absoluteUrl } from "@/data/site";

export const metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: site.siteName, template: `%s | ${site.siteName}` },
  description: site.description,
  openGraph: { title: site.siteName, description: site.description, url: site.siteUrl, siteName: site.siteName, images: [{ url: absoluteUrl(site.defaultOgp), width: 1200, height: 630 }], type: "website", locale: "ja_JP" },
  twitter: { card: "summary_large_image", title: site.siteName, description: site.description, images: [absoluteUrl(site.defaultOgp)] },
  alternates: { canonical: site.siteUrl },
};

export default function RootLayout({ children }) {
  return <html lang="ja"><body><noscript><div className="noscript-box">このサイトの一部の操作機能にはJavaScriptが必要です。各ページの本文とSEO情報は静的HTMLとして出力されます。</div></noscript><Header /><RouteFocus /><main id="main-content">{children}</main></body></html>;
}
