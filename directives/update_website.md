# Directive: Update Website

## Goal
Publish new changes (text, images, styles) to the live website `trajanoferrari.it`.

## Step-by-Step Process

1.  **Make Changes**: Edit `index.html`, `style.css` or `main.js` as needed.
2.  **Test Locally**: Open the file in your browser to verify the changes look correct.
3.  **Create New Package**:
    *   Run `python execution/package_zip.py "Muoviti_Update.zip"` to generate a clean package.
4.  **Upload to Netlify**:
    *   Log in to [Netlify](https://app.netlify.com/).
    *   Select your site `wonderful-liger-b703cf`.
    *   Go to the **"Deploys"** tab.
    *   Drag and drop the new `Muoviti_Update.zip` (or the folder `cardio-dance-landing`) into the designated upload area at the bottom of the page.
5.  **Verify**: Access `https://trajanoferrari.it` to see the live updates.

## Automation Note
In the future, we can connect this project to a **GitHub repository** so that every time I save a change, the site updates automatically (Continuous Deployment).
