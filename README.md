# CPM and PERT — Digital Note

A plain static GitHub Pages website for the polished **CPM and PERT** study note.

## Important

This package needs **no build command, npm package, Jekyll theme, or custom workflow**.
Upload the files so that `index.html` is directly in the repository root.

## Correct repository structure

```text
/
├── .nojekyll
├── 404.html
├── README.md
├── app.js
├── index.html
├── styles.css
└── assets/
    └── CPM_and_PERT_Polished_Digital_Note.pdf
```

Do not upload an extra outer folder above `index.html`.

## Publish through GitHub Pages

1. Open the repository and upload **all files and the `assets` folder** from this package.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch **main** and folder **/(root)**.
5. Save and wait for the deployment to finish.

## Local preview

From this folder, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Features

- Embedded 15-page PDF reader
- Chapter navigation
- Previous/next page controls
- Direct PDF download
- Light and dark themes
- Responsive layout
- Quick CPM and PERT formulas

## Content credit

Based on the handwritten CPM and PERT note by **2223036**.
