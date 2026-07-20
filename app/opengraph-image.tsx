import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Default Open Graph / social share image (1200×630).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #142A45 0%, #1A3A5B 55%, #0F2438 100%)",
          color: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "#F0A500",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              fontWeight: 800,
              color: "#0F2438",
            }}
          >
            DGD
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            {SITE_NAME}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              maxWidth: "920px",
            }}
          >
            {SITE_TAGLINE}
          </div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 500,
              color: "rgba(255,255,255,0.78)",
              maxWidth: "860px",
              lineHeight: 1.35,
            }}
          >
            Gospel outreach, compassion care, and community empowerment across
            Nigeria.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              height: "4px",
              width: "120px",
              background: "#F0A500",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            dgdelightfound.org
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
