import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Hard budget: every component/module file stays under 500 lines.
      // If a file grows past this, split it into smaller components instead
      // of letting it become a spaghetti file. See RULES.md.
      "max-lines": [
        "error",
        { max: 500, skipBlankLines: true, skipComments: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "prisma/**",
      "next-env.d.ts",
      // Local-only visual verification harness (see .gitignore).
      ".shot.js",
      ".shots/**",
    ],
  },
];

export default eslintConfig;
