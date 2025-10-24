"use client";

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [ImageUrl, setImageUrl] = useState<string>("");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <UploadButton
        endpoint="imageUploader"
        content={{
          button({ ready }) {
            return ready ? "Upload Image" : "Uploading...";
          },
          allowedContent: "Image (4MB max)",
        }}
        onClientUploadComplete={(res) => {
          if (res?.[0]?.ufsUrl) {
            const uploadedUrl = res[0].ufsUrl;
            setImageUrl(uploadedUrl);
            toast.success("Image uploaded successfully!");
          } else {
            toast.error("Upload succeeded but no URL returned.");
          }
        }}
        onUploadError={(error) => {
          toast.error(`Upload failed: ${error.message}`);
        }}
        appearance={{
          button:
            "bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-50",
          container: "w-full flex justify-center",
        }}
      />
      {ImageUrl && (
        <Image src={ImageUrl} alt="Uploaded Image" width={300} height={300} />
      )}
    </div>
  );
}
