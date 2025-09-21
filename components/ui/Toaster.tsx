import { toast } from "sonner";

export const CustomToaster = {
  success: (msg: string) =>
    toast.success(msg, {
      classNames: { toast: "bg-primary text-primary-foreground" },
    }),
  error: (msg: string) =>
    toast.error(msg, {
      classNames: { toast: "bg-destructive text-destructive-foreground" },
    }),
  warning: (msg: string) =>
    toast.warning(msg, {
      classNames: { toast: "bg-secondary text-secondary-foreground" },
    }),
  info: (msg: string) =>
    toast.info(msg, {
      classNames: { toast: "bg-accent text-accent-foreground" },
    }),
  loading: (msg: string) =>
    toast.loading(msg, {
      classNames: { toast: "bg-muted text-muted-foreground" },
    }),
};
