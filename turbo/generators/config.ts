import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Create a new package generator
  plop.setGenerator("package", {
    description: "Adds a new shared workspace package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the package?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "packages/{{dashCase name}}/package.json",
        template: JSON.stringify({
          name: "@taskflow/{{dashCase name}}",
          version: "0.0.0",
          private: true,
          main: "./index.ts",
          dependencies: {},
          devDependencies: {
            typescript: "^5.0.0",
          },
        }, null, 2),
      },
      {
        type: "add",
        path: "packages/{{dashCase name}}/index.ts",
        template: '// Entry point for {{name}} package\n',
      },
    ],
  });
}
