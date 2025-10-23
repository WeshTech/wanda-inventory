"use client";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// Types
export interface PurchaseReceiptProduct {
  businessProductId: string;
  productId: string | null;
  imageUrl: string | null;
  productCode: string | null;
  productName: string | null;
  quantity: number;
  unitPrice: number;
}

export interface IndividualPurchaseReceiptData {
  purchaseReceiptId: string;
  purchaseOrderId: string;
  receiptNumber: number;
  receiptName: string;
  supplierName: string;
  storeName: string;
  dateReceived: string;
  status: "RECEIVED" | "REJECTED";
  products: PurchaseReceiptProduct[];
}

export interface CompanyInfo {
  name: string;
  tagline?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
}

export interface PurchaseReceiptPDFProps {
  receiptData: IndividualPurchaseReceiptData;
  companyInfo?: CompanyInfo;
  currency?: string;
  locale?: string;
}

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  companyTagline: {
    fontSize: 9,
    color: "#666666",
    marginBottom: 2,
  },
  companyContact: {
    fontSize: 8,
    color: "#666666",
    marginTop: 4,
  },
  divider: {
    borderBottom: 2,
    borderBottomColor: "#333333",
    marginVertical: 15,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 1,
    marginVertical: 15,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  infoItem: {
    width: "33.33%",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 9,
    color: "#000000",
  },
  table: {
    marginTop: 15,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 2,
    borderBottomColor: "#333333",
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e0e0e0",
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  tableRowLast: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#333333",
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  tableHeaderCell: {
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCell: {
    fontSize: 9,
    textAlign: "center",
  },
  colCode: {
    width: "20%",
  },
  colName: {
    width: "40%",
  },
  colQty: {
    width: "13%",
  },
  colPrice: {
    width: "13%",
  },
  colTotal: {
    width: "14%",
  },
  totalsSection: {
    alignSelf: "flex-end",
    width: 220,
    marginTop: 15,
  },
  totalsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    fontSize: 9,
  },
  totalsFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 2,
    borderTopColor: "#333333",
    paddingTop: 8,
    marginTop: 4,
    fontSize: 11,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    alignItems: "center",
  },
  footerText: {
    fontSize: 8,
    color: "#666666",
    marginBottom: 4,
    textAlign: "center",
  },
  footerNote: {
    fontSize: 7,
    color: "#666666",
    marginTop: 10,
    textAlign: "center",
  },
});

export default function PurchaseReceiptPDFDocument({
  receiptData,
  companyInfo = {
    name: "TechCorp Solutions Ltd",
    tagline: "Procurement & Supply Chain Excellence",
    email: "contact@techcorp.co.ke",
    phone: "+254 XXX XXX XXX",
  },
  currency = "KSh",
  locale = "en-KE",
}: PurchaseReceiptPDFProps) {
  const formatCurrency = (amount: number) =>
    amount.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const subtotal = receiptData.products.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  const tax = 0;
  const grandTotal = subtotal + tax;

  return (
    /* eslint-disable jsx-a11y/alt-text */
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {companyInfo.logoUrl && (
            <Image
              style={styles.logo}
              src={companyInfo.logoUrl || "/images/nostorefound.jpg"}
            />
          )}
          <Text style={styles.companyName}>{companyInfo.name}</Text>
          {companyInfo.tagline && (
            <Text style={styles.companyTagline}>{companyInfo.tagline}</Text>
          )}
          {(companyInfo.email || companyInfo.phone) && (
            <Text style={styles.companyContact}>
              {[companyInfo.email, companyInfo.phone]
                .filter(Boolean)
                .join(" | ")}
            </Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* Title */}
        <Text style={styles.title}>PURCHASE RECEIPT</Text>

        {/* Info Section */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Receipt Number:</Text>
            <Text style={styles.infoValue}>
              {`PR-${new Date(receiptData.dateReceived).getFullYear()}-${String(
                receiptData.receiptNumber
              ).padStart(4, "0")}`}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Receipt Name:</Text>
            <Text style={styles.infoValue}>{receiptData.receiptName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Supplier:</Text>
            <Text style={styles.infoValue}>{receiptData.supplierName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Store:</Text>
            <Text style={styles.infoValue}>{receiptData.storeName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Status:</Text>
            <Text style={styles.infoValue}>{receiptData.status}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date Received:</Text>
            <Text style={styles.infoValue}>
              {new Date(receiptData.dateReceived).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Purchase Order Ref:</Text>
            <Text style={styles.infoValue}>{receiptData.purchaseOrderId}</Text>
          </View>
        </View>

        {/* Product Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colCode]}>
              Product Code
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colName]}>
              Product Name
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeaderCell, styles.colPrice]}>
              Unit Price ({currency})
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colTotal]}>
              Total ({currency})
            </Text>
          </View>

          {receiptData.products.map((item, index) => {
            const isLast = index === receiptData.products.length - 1;
            const total = item.quantity * item.unitPrice;
            return (
              <View
                key={index}
                style={isLast ? styles.tableRowLast : styles.tableRow}
              >
                <Text style={[styles.tableCell, styles.colCode]}>
                  {item.productCode || item.businessProductId}
                </Text>
                <Text style={[styles.tableCell, styles.colName]}>
                  {item.productName || "N/A"}
                </Text>
                <Text style={[styles.tableCell, styles.colQty]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.colPrice]}>
                  {formatCurrency(item.unitPrice)}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.colTotal,
                    { fontWeight: "bold" },
                  ]}
                >
                  {formatCurrency(total)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsRow}>
            <Text>Subtotal:</Text>
            <Text>
              {currency} {formatCurrency(subtotal)}
            </Text>
          </View>
          <View style={styles.totalsRow}>
            <Text>Tax (0.00%):</Text>
            <Text>
              {currency} {formatCurrency(tax)}
            </Text>
          </View>
          <View style={styles.totalsFinal}>
            <Text>GRAND TOTAL:</Text>
            <Text>
              {currency} {formatCurrency(grandTotal)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            This purchase receipt was generated by {companyInfo.name}
          </Text>
          {companyInfo.email && (
            <Text style={styles.footerText}>
              Contact: {companyInfo.email} | {companyInfo.phone}
            </Text>
          )}
          <Text style={styles.footerNote}>
            This is a system-generated document and does not require a
            signature.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
