import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "بطاقات الحج والعيد";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public", "qased2_logo.png"),
  );
  const logoSrc = Uint8Array.from(logoData).buffer;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(165deg, #f5f1e6 0%, #e8f0e0 42%, #f0f6eb 100%)",
          color: "#152a45",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            flex: 1,
          }}
        >
          {/* @ts-expect-error Satori accepts ArrayBuffer/typed arrays for <img src> at runtime */}
          <img src={logoSrc} style={{ maxHeight: 360, maxWidth: 880 }} alt="" />
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#5c6578",
            letterSpacing: "0.04em",
          }}
        >
          Hajj &amp; Eid Cards
        </div>
      </div>
    ),
    { ...size },
  );
}
