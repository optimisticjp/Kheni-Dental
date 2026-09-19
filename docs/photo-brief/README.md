# The clinic photo brief

`Kheni-Dental-Photo-Brief.pdf` is the document to send the clinic. It lists
every photograph the website needs, how to take each one on a phone, and the
written details to collect alongside them.

`photo-brief.html` is its source. Edit that, then regenerate:

```bash
node -e '
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.goto("file://" + process.cwd() + "/docs/photo-brief/photo-brief.html", { waitUntil: "networkidle" });
  await p.emulateMedia({ media: "print" });
  await p.pdf({
    path: "docs/photo-brief/Kheni-Dental-Photo-Brief.pdf",
    format: "A4", printBackground: true, displayHeaderFooter: true,
    headerTemplate: "<div></div>",
    footerTemplate: `<div style="width:100%;font-size:7pt;font-family:Inter,sans-serif;color:#8a837c;padding:0 16mm;display:flex;justify-content:space-between;"><span>Kheni Dental &middot; photographs we need</span><span class="pageNumber"></span></div>`,
    margin: { top: "14mm", bottom: "16mm", left: "0", right: "0" },
  });
  await b.close();
})();'
```

## Keep it honest as things arrive

The brief states, in writing to the clinic, that six pictures on the live
site are computer-generated stand-ins captioned as their rooms. That is
true as of 19 September 2026 and is the reason the document opens with it.
As each one is replaced, update both the count on the cover and
`docs/PHOTOS-STILL-NEEDED.md`, so the clinic is never asked twice for
something it has already sent.
