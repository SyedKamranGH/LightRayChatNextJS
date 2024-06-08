This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Naming Conventions

-   folders: `example-folder`
-   components: `ExampleComponent`
-   pages: `example-page`
-   utils: `exampleUtilFunction`
-   variables: `exampleVariable`
-   types: `ExampleType`
-   hooks: `useExampleHook`

## Customising Theme

-   To customise the colors, edit `tailwind.config.js` and change the `theme[colors]` object
-   To customise the font, edit `tailwind.config.js` and change the `theme[fontFamily]` object

## Important Notes

-   The history sidebar for Desktop and Mobile UI are handled completely seperately.
    -   In Desktop UI, `ChatHistory` and `ToggleChatHistory` are shown, meanwhile `ChatHistoryMobile` and `ToggleChatHistoryMobile` are hidden.
    -   In Desktop UI, `ChatHistoryMobile` and `ToggleChatHistoryMobile` are shown, meanwhile `ChatHistory` and `ToggleChatHistory` are hidden.
-   Responsiveness is mostly handled by adding `md:` (768px breakpoint) prefix in `tailwind` class.
-   Theme is handled by adding `dark:` prefix in `tailwind` class for dark mode.

## Component structure

-   `src/components` directory has two folders, `/pages` and `/shared`
    -   `/pages` Contains specific components bound to specific page under `src/pages`
    -   `/shared` Contains any components that can be shared throughout the application. The purpose must be clear and must not be specific. E.g. You should create `/buttons` subfolder that holds all the buttons, instead of creating `ButtonForExampleCase1` and `ButtonForExampleCase2`
-   It is recommended for each sub-folder to have `index.ts` file that controls named exports.

## SVG

-   Custom SVGs should be stored inside `/shared/icons` folder.
-   Use the link provided to convert svg into JSX component to store it in `@/shared/icons` [SVGR Playground](https://react-svgr.com/playground/?exportType=named&typescript=true)
-   To use the SVG, import it from `@/shared/icons` and use it as a component. E.g. `<IconExample />`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
