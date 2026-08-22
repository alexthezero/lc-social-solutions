# LC Social Solutions

Private concept website for **LC Social Solutions**, a theoretical social media management business.

## Current preview state

- Neutral cream, beige, and floral/sage green visual system
- Responsive desktop, tablet, and mobile layout
- Services, process, package concepts, about section, and preview inquiry form
- Password preview gate enabled
- Search-engine indexing disabled with page-level `noindex` directives and `robots.txt`
- Contact form intentionally remains a front-end preview until a final business email or form provider is selected

## Preview access

The site uses a client-side password gate suitable for a private concept preview on GitHub Pages. The password itself is **not stored in plaintext in the JavaScript**; the browser compares a SHA-256 hash.

Important: GitHub Pages is static hosting, so this is not equivalent to server-side authentication. The repository and page assets can still be inspected by a determined visitor if the repository remains public. Before using the site for confidential material, move authentication behind a real server-side access layer or use a hosting platform with protected previews.

## Files

- `index.html` — page structure and private-preview screen
- `style.css` — responsive neutral/botanical styling
- `script.js` — preview authentication, navigation, animations, package selection, and demo inquiry behavior
- `robots.txt` — blocks crawling during the preview phase

## GitHub Pages

If Pages is not already enabled:

1. Open this repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select **main** and **/(root)**.
5. Save.

Expected URL:

`https://alexthezero.github.io/lc-social-solutions/`

## Before public launch

- Remove the password gate and preview labels.
- Remove the `noindex` meta directives and update `robots.txt` to allow crawling.
- Add the final business email and connect the contact form.
- Finalize service scope and pricing.
- Add real portfolio work, testimonials, or client results only when available.
