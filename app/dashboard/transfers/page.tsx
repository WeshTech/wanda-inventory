"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TransfersTable } from "./transfer-table";
import { CreateTransferDialog } from "./create-transfer-dialog";
import { Plus } from "lucide-react";

export default function GoodsTransferPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Goods Transfers</h1>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="rounded-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Transfer
        </Button>
      </div>

      {/* Transfers Table */}
      <Card>
        <CardHeader>
          <CardTitle>Transfer History</CardTitle>
        </CardHeader>
        <CardContent className="p-0 md:p-6 md:pt-0">
          <TransfersTable />
        </CardContent>
      </Card>

      {/* Create Transfer Dialog */}
      <CreateTransferDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
