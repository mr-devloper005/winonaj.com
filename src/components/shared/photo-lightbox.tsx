"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { ContentImage } from "@/components/shared/content-image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function PhotoLightbox({
  images,
  title,
  triggerClassName,
  imageClassName,
  initialIndex = 0,
}: {
  images: string[];
  title: string;
  triggerClassName?: string;
  imageClassName?: string;
  initialIndex?: number;
}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  if (!images.length) return null;

  const activeImage = images[activeIndex] || images[0];

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => {
          setActiveIndex(initialIndex);
          setOpen(true);
        }}
      >
        <ContentImage
          src={images[initialIndex]}
          alt={`${title} photo ${initialIndex + 1}`}
          fill
          className={imageClassName}
          sizes="(max-width: 768px) 100vw, 1200px"
          intrinsicWidth={1600}
          intrinsicHeight={1000}
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-w-6xl border-white/10 bg-[#08111f] p-0 text-white shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
            <DialogTitle className="text-sm font-semibold tracking-[0.16em] uppercase text-white/85">
              {title}
            </DialogTitle>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/6 text-white transition hover:bg-white/12"
              aria-label="Close photo viewer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.8rem] bg-black/30">
              <ContentImage
                src={activeImage}
                alt={`${title} enlarged photo ${activeIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                intrinsicWidth={1800}
                intrinsicHeight={1200}
              />
            </div>

            {images.length > 1 ? (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {images.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative aspect-[4/3] overflow-hidden rounded-2xl border transition ${
                      index === activeIndex
                        ? "border-white/70 ring-1 ring-white/60"
                        : "border-white/10 hover:border-white/30"
                    }`}
                    aria-label={`Open photo ${index + 1}`}
                  >
                    <ContentImage
                      src={image}
                      alt={`${title} thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="200px"
                      intrinsicWidth={600}
                      intrinsicHeight={450}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
