/*
 * If this example does not work correctly in a sandbox,
 * you can download and run it locally
 */

"use client";

import Image from "next/image";
import { RenderImageContext, RenderImageProps, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import photos from "@/data/photos";

function renderNextImage({ alt = "", title, sizes }: RenderImageProps, { photo, width, height }: RenderImageContext) {
  const photoSrc = typeof photo === "string" ? photo : photo.src;
  
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photoSrc}
        alt={alt || "Gallery image"}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
        quality={85}
      />
    </div>
  );
}

export default function PhotoGallery() {
  return (
    <div className="w-full py-12 px-4 bg-black">
      <h2 className="Galerie headingA font-bold text-yellow-500 text-center mb-8">galerie</h2>
      <div className="w-full max-w-6xl mx-auto">
        <RowsPhotoAlbum
          photos={photos}
          render={{ image: renderNextImage }}
          defaultContainerWidth={1200}
          sizes={{
            size: "1168px",
            sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
          }}
        />
      </div>
    </div>
  );
}
