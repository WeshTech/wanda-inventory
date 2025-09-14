import { Badge } from "@/components/ui/badge";

interface ReceiptHeaderProps {
  receiptNumber: string;
  orderNumber: string;
  receiptName: string;
  storeName: string;
  supplier: string;
  status: "received" | "rejected";
  dateCreated: string;
  dateGenerated: string;
}

export function ReceiptHeader({
  receiptNumber,
  orderNumber,
  receiptName,
  storeName,
  supplier,
  status,
  dateCreated,
  dateGenerated,
}: ReceiptHeaderProps) {
  return (
    <div className="mb-6">
      {/* Logo and Business Name */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
          <span className="text-lg font-bold text-white">B</span>
        </div>
        <h1 className="text-xl font-bold text-gray-800 mb-1">Business Name</h1>
        <p className="text-sm text-gray-600">Your Trusted Business Partner</p>
      </div>

      {/* Receipt Details - 3 Column Layout */}
      <div className="grid grid-cols-3 gap-4 p-4 border border-gray-300 rounded">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Receipt Number
            </label>
            <p className="text-sm font-semibold text-gray-800">
              {receiptNumber}
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Order Number
            </label>
            <p className="text-sm font-semibold text-gray-800">{orderNumber}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Receipt Name
            </label>
            <p className="text-sm font-semibold text-gray-800">{receiptName}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Store Name
            </label>
            <p className="text-sm font-semibold text-gray-800">{storeName}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Supplier
            </label>
            <p className="text-sm font-semibold text-gray-800">{supplier}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Status
            </label>
            <div className="mt-1">
              <Badge
                variant={status === "received" ? "default" : "destructive"}
                className={`text-xs ${
                  status === "received"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Date Created
            </label>
            <p className="text-sm font-semibold text-gray-800">{dateCreated}</p>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 uppercase">
              Date Generated
            </label>
            <p className="text-sm font-semibold text-gray-800">
              {dateGenerated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
