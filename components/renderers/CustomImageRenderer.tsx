"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full min-h-[15rem]">
      <Image
        alt="image"
        className="object-contain"
        width={1000}
        height={1000}
        src={src}
      />
    </div>
  );
}

export default CustomImageRenderer;
