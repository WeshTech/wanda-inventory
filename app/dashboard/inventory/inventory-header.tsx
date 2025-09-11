"use client"; // This component needs client-side interactivity

import { Button } from "@/components/ui/button";
import { Download, Upload, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InventoryHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        Inventory
      </h1>
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
        <Button variant="outline" size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Import
        </Button>
        <Button
          size="sm"
          onClick={() => router.push("/dashboard/inventory/products")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Products
        </Button>
      </div>
    </div>
  );
}
