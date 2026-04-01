/**
 * Formatting utilities for the Analytics Dashboard
 */

/**
 * Format a date string to a readable format
 * @param dateString ISO date string or date string
 * @param format 'short', 'long', or 'datetime'
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string,
  format: "short" | "long" | "datetime" = "short",
): string {
  try {
    const date = new Date(dateString);

    switch (format) {
      case "short":
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      case "long":
        return date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      case "datetime":
        return date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      default:
        return dateString;
    }
  } catch {
    return dateString;
  }
}

/**
 * Format a number as currency
 * @param value Number to format
 * @param currency Currency code (default: USD)
 * @param decimals Number of decimal places (default: 2)
 * @returns Formatted currency string
 */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  decimals: number = 2,
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a number with thousand separators
 * @param value Number to format
 * @param decimals Number of decimal places (default: 0)
 * @returns Formatted number string
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a number as percentage
 * @param value Number to format (0-1 or 0-100)
 * @param isDecimal Whether value is in decimal format (default: false)
 * @param decimals Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercent(
  value: number,
  isDecimal: boolean = false,
  decimals: number = 1,
): string {
  const percentValue = isDecimal ? value * 100 : value;
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(percentValue / 100);
}

/**
 * Format large numbers with abbreviations (K, M, B, T)
 * @param value Number to format
 * @param decimals Number of decimal places (default: 1)
 * @returns Abbreviated number string
 */
export function formatCompactNumber(
  value: number,
  decimals: number = 1,
): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Get the restock signal color class
 * @param signal Signal level (HIGH, MEDIUM, LOW)
 * @returns CSS class name for color
 */
export function getRestockSignalColor(
  signal: "HIGH" | "MEDIUM" | "LOW",
): string {
  switch (signal) {
    case "HIGH":
      return "text-red-600 bg-red-50";
    case "MEDIUM":
      return "text-amber-600 bg-amber-50";
    case "LOW":
      return "text-green-600 bg-green-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
}

/**
 * Get the restock signal badge text
 * @param signal Signal level
 * @returns Human-readable signal text
 */
export function getRestockSignalLabel(
  signal: "HIGH" | "MEDIUM" | "LOW",
): string {
  switch (signal) {
    case "HIGH":
      return "Urgent";
    case "MEDIUM":
      return "Soon";
    case "LOW":
      return "Adequate";
    default:
      return signal;
  }
}

/**
 * Calculate percentage change between two values
 * @param currentValue Current value
 * @param previousValue Previous value
 * @returns Percentage change (positive or negative)
 */
export function calculatePercentChange(
  currentValue: number,
  previousValue: number,
): number {
  if (previousValue === 0) return 0;
  return ((currentValue - previousValue) / previousValue) * 100;
}

/**
 * Truncate text to specified length with ellipsis
 * @param text Text to truncate
 * @param length Maximum length
 * @returns Truncated text
 */
export function truncateText(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

/**
 * Format date range for display
 * @param startDate Start date string
 * @param endDate End date string
 * @returns Formatted date range
 */
export function formatDateRange(startDate: string, endDate: string): string {
  return `${formatDate(startDate, "short")} - ${formatDate(endDate, "short")}`;
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param date Date string or Date object
 * @returns Relative time string
 */
export function getRelativeTime(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - dateObj.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "just now";
}

/**
 * Safely parse JSON with fallback
 * @param jsonString JSON string to parse
 * @param fallback Fallback value if parsing fails
 * @returns Parsed object or fallback
 */
export function safeJsonParse<T>(jsonString: string, fallback: T): T {
  try {
    return JSON.parse(jsonString);
  } catch {
    return fallback;
  }
}

/**
 * Convert array of objects to CSV format
 * @param data Array of objects
 * @param headers Column headers
 * @returns CSV string
 */
export function convertToCSV(
  data: Record<string, string | number>[],
  headers?: string[],
): string {
  if (data.length === 0) return "";

  const cols = headers || Object.keys(data[0]);
  const csv = [
    cols.join(","),
    ...data.map((row) =>
      cols
        .map((col) => {
          const value = row[col];
          // Handle CSV escaping
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value ?? "";
        })
        .join(","),
    ),
  ].join("\n");

  return csv;
}

/**
 * Download CSV file
 * @param csv CSV content
 * @param filename Filename for download
 */
export function downloadCSV(csv: string, filename: string = "data.csv"): void {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
