import { defineConfig } from "vite";
import { resolve } from "path";
import copy from "rollup-plugin-copy";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  // プロジェクトのルートディレクトリを ./src に設定
  root: "./src",

  build: {
    // ビルド成果物の出力先ディレクトリを ../public に設定
    outDir: "../public",

    // ビルド前に出力先ディレクトリを空にする
    emptyOutDir: true,

    // Rollup のオプションを設定
    rollupOptions: {
      // ビルドのエントリーポイントを src/index.html に設定
      input: {
        main: resolve(__dirname, "src/index.html"),
      },

      // アセットファイルの出力形式を指定
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith(".css")) {
            return "assets/css/[name][extname]";
          } else if (assetInfo.name.match(/\.(png|jpe?g|svg|gif)$/)) {
            return "assets/img/[name][extname]";
          } else if (assetInfo.name.match(/\.(js)$/)) {
            return "assets/js/[name][extname]";
          }
          return "assets/[name][extname]";
        },
        // メインのJSファイルの名前を変更しないようにする
        entryFileNames: "assets/js/[name].js",
        chunkFileNames: "assets/js/[name].js",
      },

      // Rollup のプラグインを設定
      plugins: [
        // アセットフォルダをコピーする設定
        copy({
          targets: [
            { src: "src/assets/img/**/*", dest: "public/assets/img" },
            { src: "src/assets/js/**/*", dest: "public/assets/js" },
          ],
          // ビルド後にコピーする
          hook: "writeBundle",
        }),
      ],
    },
  },
});
