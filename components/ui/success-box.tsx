import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
  message?: string;
  title?: string;
}

export const SuccessBox = ({ message, title }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div
      className="flex items-center gap-3 rounded-lg border border-emerald-300/40 
      bg-emerald-50/70 dark:bg-emerald-950/40 
      p-4 text-emerald-700 dark:text-emerald-300 shadow-sm"
      role="alert"
    >
      <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
      <div className="flex flex-col">
        {title && (
          <p className="font-semibold text-emerald-700 dark:text-emerald-300">
            {title}
          </p>
        )}
        <p className="text-sm leading-snug">{message}</p>
      </div>
    </div>
  );
};
