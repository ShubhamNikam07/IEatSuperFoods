# IEat Superfoods — independent website demo

React + TypeScript + MUI + Redux Toolkit. Frontend only, no API keys or backend.

## Run

Install Node.js 22 or later, then run:

npm install
npm run dev

Production build: npm run build. Local production preview: npm run preview.

## Design and imagery

The first supplied poster sets the palette: cocoa brown (#583226), warm parchment cream (#f5ecd8), and clay accents (#974b37). Original packaging colors stay intact.

All five supplied screenshots have an enhanced version made with the built-in image_gen tool:

- public/images/enhanced/brand-promise.png: hero poster.
- public/images/enhanced/chai-moment.png: lifestyle and ingredients section.
- public/images/enhanced/brand-celebration.png: festive brand moment.
- public/images/enhanced/community-at-home.png: candid home moment.
- public/images/enhanced/community-on-the-go.png: candid portrait.

Original screenshots are preserved under public/images/originals with matching filenames. Click any featured image to open the complete image viewer, browse all five photos, or switch between the enhanced and original versions. The enhanced versions are AI restorations of low-resolution screenshots; fine details and small packaging text can differ. Originals remain the reference.

The complete prompts and output manifest are saved in output/imagegen/prompts.json. The original pre-existing public/images/ragi.png is retained.

## Structure and customization

- src/main.tsx: page sections, image viewer, MUI theme and shopping drawer.
- src/style.css: responsive cream and brown editorial design.
- src/store/index.ts: catalog thunk and cart state.
- public/images/enhanced/: five enhanced brand images.
- public/images/originals/: five supplied originals.

Change products and demo prices in the loadProducts thunk. Cart is in memory and resets on reload.

## GitHub Pages

Upload the contents of this project to your repository root, including .github/workflows/deploy.yml. Use the main branch and select GitHub Actions in Settings > Pages. Push or run the deployment workflow. Vite's relative base supports repository and account Pages sites.

## Demo boundaries

Prices and drawn product packaging are illustrative. Checkout only clears the demo bag; it collects no information or payment and sends no orders. No fabricated reviews or sales statistics are included. Brand artwork contains the brand's own claims. This is an independent concept, not an official brand website.

Developer contact: raavithegreat7@gmail.com
