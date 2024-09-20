import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  reactPlugin.configs.flat.recommended,
  eslintConfigPrettier,

  {
    settings: { react: { version: "detect" } },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-no-target-blank": "off",
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        // 가장 가까운 tsconfig.json 파일을 자동으로 인식. ts-eslint의 기능.
        projectService: true,

        // tsconfig를 찾을 절대 경로. 현재 루트 디렉터리이며, Nodejs 구버전이나 CJS 환경에서는 __dirname 사용.
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // js, jsx 파일에 대한 타입 체크 비활성화.
  {
    files: ["**/*.{js,jsx,cjs,mjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
);
