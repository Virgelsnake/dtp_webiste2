# TypeScript Documentation

## Getting Started

*   [TS for the New Programmer](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
*   [TypeScript for JS Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
*   [TS for Java/C# Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html)
*   [TS for Functional Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html)
*   [TypeScript Tooling in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-tooling-in-5-minutes.html)

## Installation

Install TypeScript globally:

```bash
npm install -g typescript
```

Initialize a TypeScript project:

```bash
tsc --init
```

Compile a TypeScript file:

```bash
tsc app.ts
```

## Basic Example

```typescript
function greet(message: string) {
  console.log(`Hello, ${message}`);
}

greet("TypeScript");
```

## Webpack Integration

Install Webpack:

```bash
npm install webpack webpack-cli --save-dev
```

Example `webpack.config.js`:

```javascript
// webpack.config.js
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
```
