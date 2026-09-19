# README screenshots

These PNGs are direct browser captures of the running template. Use only the bundled demo data. Keep browser chrome, tooltips, focus rings from capture controls, and development overlays out of the images.

| File                    | Route    | Image size  |
| ----------------------- | -------- | ----------- |
| `dashboard-desktop.png` | `/`      | 1440 × 1240 |
| `login-desktop.png`     | `/login` | 1440 × 1000 |
| `dashboard-mobile.png`  | `/`      | 390 × 844   |
| `login-mobile.png`      | `/login` | 390 × 844   |

## Refresh the images

1. Run `bun run dev` and open its local URL in a browser.
2. Sign out for the login captures. Leave the form empty, without errors or focused fields.
3. Set the responsive viewport to each size above and save a viewport screenshot. Preserve the source dimensions; do not stretch or add a device frame.
4. Use the mock Google entry point to open the dashboard. Expand the desktop sidebar and close the mobile drawer. Scroll to the top.
5. Wait for the fonts, charts, and number animations to finish before capturing the dashboard. Check that the data is visible and no loading skeleton remains.
6. Save actual PNG files: changing a JPEG's extension does not convert its encoding. If conversion is needed, preserve the decoded pixels without resizing or sharpening.
7. Overwrite the matching files, inspect them at native resolution, then check their rendering in the root README. Keep one image for each page and viewport combination.

The mobile images show the first screen of each page. The dashboard continues below it. Do not compress the full mobile page into a single screen.

If the capture tool scales pages with scrollbars, capture the mobile dashboard at 390 × 2200 after its charts settle, then crop the top 390 × 844 pixels without resampling. This preserves the phone layout and text resolution. The current mobile dashboard image uses this method; the other three are viewport captures at their listed sizes.
