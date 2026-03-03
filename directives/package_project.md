# Directive: Package Project

## Goal
Create a production-ready ZIP file containing all necessary assets for the landing page.

## Input
- All files in the root directory (`index.html`, `style.css`, `main.js`)
- `assets/` folder with all images and videos.

## Tools
- Use `execution/package_zip.py` to create the archive.

## Output
- A file named `Muoviti_Master_V7.zip` (update version accordingly) in the root scratch directory.

## Edge Cases
- Ensure the ZIP does not include `.git`, `directives/`, `execution/` or other internal folders unless requested.
