import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://typesensekit.vercel.app",
  output: "static",
  integrations: [sitemap()],
});
