"use client";

/**
 * The last resort: the root layout itself failed, so there is no Navbar,
 * no Footer and no design system to lean on. Everything here is inline,
 * because a stylesheet may be exactly what did not load.
 *
 * It carries the clinic's number, because that is the one thing a patient
 * needs from this page.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          padding: "2rem 1.25rem",
          background: "#0d0d0c",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "34rem" }}>
          <p style={{ letterSpacing: ".16em", textTransform: "uppercase", fontSize: ".72rem", color: "#c9a227" }}>
            Kheni Dental
          </p>
          <h1 style={{ fontSize: "1.75rem", lineHeight: 1.25, margin: "1rem 0 0", fontWeight: 600 }}>
            The site did not load.
          </h1>
          <p style={{ margin: "1rem 0 0", lineHeight: 1.6, color: "rgba(255,255,255,.65)" }}>
            Please call the clinic and we will help you directly.
          </p>
          <a
            href="tel:+919510112354"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "3.25rem",
              margin: "1.75rem 0 0",
              padding: "0 1.75rem",
              borderRadius: "999px",
              background: "#c9a227",
              color: "#0d0d0c",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            +91 95101 12354
          </a>
          <button
            type="button"
            onClick={reset}
            style={{
              display: "block",
              margin: "1.25rem auto 0",
              background: "none",
              border: "none",
              color: "#c9a227",
              font: "inherit",
              fontSize: ".9rem",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
