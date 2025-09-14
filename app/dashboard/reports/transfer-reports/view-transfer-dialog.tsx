import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Transfer } from "@/types/transfers";

interface ViewTransferDialogProps {
  transfer: Transfer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewTransferDialog({
  transfer,
  open,
  onOpenChange,
}: ViewTransferDialogProps) {
  const getStatusColor = (status: Transfer["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      case "in-transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  if (!transfer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Transfer Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={transfer.productImage || "/placeholder.svg"}
                alt={transfer.productName}
              />
              <AvatarFallback>{transfer.productName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{transfer.productName}</h3>
              <Badge className={getStatusColor(transfer.status)}>
                {transfer.status}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">From</Label>
              <p className="font-medium">{transfer.from}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">To</Label>
              <p className="font-medium">{transfer.to}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Time</Label>
              <p className="font-medium">{transfer.time}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Quantity</Label>
              <p className="font-medium">{transfer.quantity}</p>
            </div>
            <div className="col-span-2">
              <Label className="text-muted-foreground">Received By</Label>
              <p className="font-medium">
                {transfer.receivedBy || "Not received yet"}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
