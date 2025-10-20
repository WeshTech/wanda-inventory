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
export type SaleItem = {
  productCode: string;
  productName: string | null;
  quantity: number;
  price: number;
  total: number;
};

export type SaleDetailData = {
  invoiceNo: string;
  store: string;
  customerName: string;
  servedBy: string;
  totalAmount: number;
  date: string;
  items: SaleItem[];
};

export type CompanyInfo = {
  name: string;
  tagline?: string;
  email?: string;
  phone?: string;
  logoUrl?: string;
};

export type InvoiceConfig = {
  paymentStatus?: string;
  paymentMethod?: string;
  taxRate?: number;
  showTax?: boolean;
  currency?: string;
  locale?: string;
};

interface InvoicePDFDocumentProps {
  saleData: SaleDetailData;
  companyInfo?: CompanyInfo;
  config?: InvoiceConfig;
}

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
  invoiceTitle: {
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
    width: "15%",
  },
  colName: {
    width: "35%",
  },
  colQty: {
    width: "12%",
  },
  colPrice: {
    width: "19%",
  },
  colTotal: {
    width: "19%",
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

export default function InvoicePDFDocument({
  saleData,
  companyInfo = {
    name: "TechCorp Solutions Ltd",
    tagline: "Professional Technology Services",
    email: "contact@techcorp.co.ke",
    phone: "+254 XXX XXX XXX",
  },
  config = {
    paymentStatus: "PAID",
    paymentMethod: "CASH",
    taxRate: 0.0,
    showTax: true,
    currency: "KSh",
    locale: "en-KE",
  },
}: InvoicePDFDocumentProps) {
  // Extract configuration with defaults
  const {
    paymentStatus = "PAID",
    paymentMethod = "CASH",
    taxRate = 0.0,
    showTax = true,
    currency = "KSh",
    locale = "en-KE",
  } = config;

  // Calculate invoice number
  const invoiceNo = `${saleData.invoiceNo}`;

  // Calculate totals
  const subtotal = saleData.totalAmount;
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  // Format currency
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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

        {/* Divider */}
        <View style={styles.divider} />

        {/* Invoice Title */}
        <Text style={styles.invoiceTitle}>CUSTOMER INVOICE</Text>

        {/* Invoice Information Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Invoice Number:</Text>
            <Text style={styles.infoValue}>{invoiceNo}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoValue}>{formatDate(saleData.date)}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Customer Name:</Text>
            <Text style={styles.infoValue}>{saleData.customerName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Store Location:</Text>
            <Text style={styles.infoValue}>{saleData.store}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Payment Status:</Text>
            <Text style={styles.infoValue}>{paymentStatus}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Payment Method:</Text>
            <Text style={styles.infoValue}>{paymentMethod}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Served By:</Text>
            <Text style={styles.infoValue}>{saleData.servedBy}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          {/* Table Header */}
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

          {/* Table Rows */}
          {saleData.items.map((item, index) => {
            const isLast = index === saleData.items.length - 1;
            return (
              <View
                key={index}
                style={isLast ? styles.tableRowLast : styles.tableRow}
              >
                <Text style={[styles.tableCell, styles.colCode]}>
                  {item.productCode}
                </Text>
                <Text style={[styles.tableCell, styles.colName]}>
                  {item.productName || "N/A"}
                </Text>
                <Text style={[styles.tableCell, styles.colQty]}>
                  {item.quantity}
                </Text>
                <Text style={[styles.tableCell, styles.colPrice]}>
                  {formatCurrency(item.price)}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.colTotal,
                    { fontWeight: "bold" },
                  ]}
                >
                  {formatCurrency(item.total)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.totalsRow}>
            <Text>Subtotal:</Text>
            <Text>
              {currency} {formatCurrency(subtotal)}
            </Text>
          </View>
          {showTax && (
            <View style={styles.totalsRow}>
              <Text>Tax ({(taxRate * 100).toFixed(2)}%):</Text>
              <Text>
                {currency} {formatCurrency(taxAmount)}
              </Text>
            </View>
          )}
          <View style={styles.totalsFinal}>
            <Text>TOTAL:</Text>
            <Text>
              {currency} {formatCurrency(total)}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business!</Text>
          {companyInfo.email && (
            <Text style={styles.footerText}>
              For any inquiries, please contact us at {companyInfo.email}
            </Text>
          )}
          <Text style={styles.footerNote}>
            This is a computer-generated invoice and does not require a
            signature.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
