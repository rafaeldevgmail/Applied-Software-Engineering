import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "src/routeTree.gen.ts",
    ],
  },
  ...tseslint.configs.recommended,
);
