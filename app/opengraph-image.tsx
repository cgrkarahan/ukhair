import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, rgba(8,14,21,0.98), rgba(23,34,49,0.96))",
          color: "white",
          padding: "56px",
          fontFamily: "Georgia, serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 85% 0%, rgba(204,167,103,0.28), transparent 25%), radial-gradient(circle at 8% 90%, rgba(39,86,74,0.34), transparent 35%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div
              style={{
                display: "flex",
                width: 84,
                height: 84,
                borderRadius: 999,
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.14)",
                background:
                  "linear-gradient(135deg, rgba(240,225,199,0.22), rgba(240,225,199,0.06))",
                color: "#f0e1c7",
                fontSize: 34,
              }}
            >
              UK
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: 16,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(240,225,199,0.76)",
                  fontFamily: "Helvetica, Arial, sans-serif",
                }}
              >
                Premium London Guidance
              </div>
              <div style={{ fontSize: 38 }}>UK Hair Transplant</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
            <div
              style={{
                fontSize: 66,
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
              }}
            >
              Hair transplant in London, explained with stronger clinical standards.
            </div>
            <div
              style={{
                marginTop: 26,
                fontSize: 24,
                lineHeight: 1.45,
                color: "rgba(255,255,255,0.72)",
                fontFamily: "Helvetica, Arial, sans-serif",
              }}
            >
              Premium clinic partner positioning, clearer guidance, and a calmer route into
              treatment decisions.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 18,
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "rgba(255,255,255,0.78)",
            }}
          >
            <div>GMC-registered doctors</div>
            <div>•</div>
            <div>CQC-registered provider in England</div>
            <div>•</div>
            <div>Central London access</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
