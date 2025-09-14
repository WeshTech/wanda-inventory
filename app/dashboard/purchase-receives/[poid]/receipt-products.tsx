interface Product {
  id: string;
  name: string;
  code: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

interface ReceiptProductsProps {
  products: Product[];
  totalAmount: number;
}

export function ReceiptProducts({
  products,
  totalAmount,
}: ReceiptProductsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Products</h2>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                Product Code
              </th>
              <th className="border border-gray-300 p-2 text-left text-xs font-semibold text-gray-700 uppercase">
                Name
              </th>
              <th className="border border-gray-300 p-2 text-right text-xs font-semibold text-gray-700 uppercase">
                Unit Price
              </th>
              <th className="border border-gray-300 p-2 text-center text-xs font-semibold text-gray-700 uppercase">
                Quantity
              </th>
              <th className="border border-gray-300 p-2 text-right text-xs font-semibold text-gray-700 uppercase">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="border border-gray-300 p-2 text-sm text-gray-800">
                  {product.code}
                </td>
                <td className="border border-gray-300 p-2 text-sm text-gray-800">
                  {product.name}
                </td>
                <td className="border border-gray-300 p-2 text-right text-sm text-gray-800">
                  {formatCurrency(product.unitPrice)}
                </td>
                <td className="border border-gray-300 p-2 text-center text-sm text-gray-800">
                  {product.quantity}
                </td>
                <td className="border border-gray-300 p-2 text-right text-sm font-semibold text-gray-800">
                  {formatCurrency(product.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="mt-4 flex justify-end">
        <div className="bg-gray-100 border border-gray-300 p-4 rounded min-w-[300px]">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-800">
              Total Amount:
            </span>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(totalAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
