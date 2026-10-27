import type { NextConfig } from "next";

const RECOMMEND_URL = "https://github.com/jytechllc/asian-leaders-alliance/issues/new?template=recommendation.yml";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // 推荐名人走公开 GitHub Issue 表单（.github/ISSUE_TEMPLATE/recommendation.yml）
  async redirects() {
    return [{ source: "/recommend", destination: RECOMMEND_URL, permanent: false }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
