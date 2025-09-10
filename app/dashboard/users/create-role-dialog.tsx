"use client";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type PermissionActions = {
  create: boolean;
  extract: boolean;
  update: boolean;
  delete: boolean;
};

type PermissionModuleKeys =
  | "store"
  | "users"
  | "roles"
  | "products"
  | "storeInventory"
  | "categories"
  | "transfers"
  | "sales"
  | "invoices"
  | "suppliers"
  | "purchaseOrders";

type Role = {
  id: string;
  title: string;
  description: string;
  activeUsers: number;
  dateCreated: string;
  permissions: {
    [key in PermissionModuleKeys]: PermissionActions;
  };
};

const PERMISSION_MODULES: { key: PermissionModuleKeys; label: string }[] = [
  { key: "store", label: "Store" },
  { key: "users", label: "Users" },
  { key: "roles", label: "Roles" },
  { key: "products", label: "Products" },
  { key: "storeInventory", label: "Store Inventory" },
  { key: "categories", label: "Categories" },
  { key: "transfers", label: "Transfers" },
  { key: "sales", label: "Sales" },
  { key: "invoices", label: "Invoices" },
  { key: "suppliers", label: "Suppliers" },
  { key: "purchaseOrders", label: "Purchase Orders" },
];

const permissionActionsSchema = z.object({
  create: z.boolean(),
  extract: z.boolean(),
  update: z.boolean(),
  delete: z.boolean(),
});

const createRoleSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Role title must be at least 2 characters.",
    })
    .max(50, {
      message: "Role title must not exceed 50 characters.",
    }),
  description: z
    .string()
    .min(5, {
      message: "Role description must be at least 5 characters.",
    })
    .max(200, {
      message: "Role description must not exceed 200 characters.",
    }),
  permissions: z.object({
    store: permissionActionsSchema,
    users: permissionActionsSchema,
    roles: permissionActionsSchema,
    products: permissionActionsSchema,
    storeInventory: permissionActionsSchema,
    categories: permissionActionsSchema,
    transfers: permissionActionsSchema,
    sales: permissionActionsSchema,
    invoices: permissionActionsSchema,
    suppliers: permissionActionsSchema,
    purchaseOrders: permissionActionsSchema,
  }),
});

interface CreateRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleCreate: (role: Role) => void;
}

export function CreateRoleDialog({
  open,
  onOpenChange,
  onRoleCreate,
}: CreateRoleDialogProps) {
  const form = useForm<z.infer<typeof createRoleSchema>>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      title: "",
      description: "",
      permissions: PERMISSION_MODULES.reduce((acc, module) => {
        acc[module.key] = {
          create: false,
          extract: false,
          update: false,
          delete: false,
        };
        return acc;
      }, {} as Record<PermissionModuleKeys, PermissionActions>),
    },
  });

  const handleToggleAllPermissions = (
    moduleKey: PermissionModuleKeys,
    checked: boolean
  ) => {
    form.setValue(`permissions.${moduleKey}.create`, checked);
    form.setValue(`permissions.${moduleKey}.extract`, checked);
    form.setValue(`permissions.${moduleKey}.update`, checked);
    form.setValue(`permissions.${moduleKey}.delete`, checked);
  };

  const onSubmit = (values: z.infer<typeof createRoleSchema>) => {
    const newRole: Role = {
      id: `r${Date.now()}`,
      activeUsers: 0,
      dateCreated: new Date().toISOString(),
      ...values,
    };
    onRoleCreate(newRole);
    onOpenChange(false);
    form.reset();
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 p-6 pb-0">
          <DialogTitle className="text-foreground">Create New Role</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Define a new role with its title, description, and specific
            permissions for different system modules.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto px-6 max-h-[60vh]">
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Role Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Store Manager"
                            className="rounded-md border-input bg-background text-foreground w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">
                          Role Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A brief description of the role's responsibilities and scope."
                            className="min-h-[80px] rounded-md border-input bg-background text-foreground w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    Module Permissions
                  </h3>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    {PERMISSION_MODULES.map((module) => {
                      const modulePermissions = form.watch(
                        `permissions.${module.key}`
                      );
                      const allChecked =
                        modulePermissions.create &&
                        modulePermissions.extract &&
                        modulePermissions.update &&
                        modulePermissions.delete;
                      const anyChecked =
                        modulePermissions.create ||
                        modulePermissions.extract ||
                        modulePermissions.update ||
                        modulePermissions.delete;
                      const isIndeterminate = anyChecked && !allChecked;

                      return (
                        <div
                          key={module.key}
                          className="border rounded-lg p-4 bg-card"
                        >
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-4">
                            <FormControl>
                              <Checkbox
                                checked={
                                  isIndeterminate
                                    ? "indeterminate"
                                    : (allChecked as CheckedState)
                                }
                                onCheckedChange={(
                                  checkedState: CheckedState
                                ) => {
                                  handleToggleAllPermissions(
                                    module.key,
                                    checkedState === true
                                  );
                                }}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-sm font-semibold text-foreground">
                                {module.label}
                              </FormLabel>
                            </div>
                          </FormItem>

                          <div className="grid grid-cols-2 gap-2">
                            {["create", "extract", "update", "delete"].map(
                              (action) => (
                                <FormField
                                  key={`${module.key}-${action}`}
                                  control={form.control}
                                  name={
                                    `permissions.${module.key}.${action}` as Path<
                                      z.infer<typeof createRoleSchema>
                                    >
                                  }
                                  render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                      <FormControl>
                                        <Checkbox
                                          checked={!!field.value}
                                          onCheckedChange={field.onChange}
                                        />
                                      </FormControl>
                                      <div className="space-y-1 leading-none">
                                        <FormLabel className="text-xs capitalize text-muted-foreground">
                                          {action}
                                        </FormLabel>
                                      </div>
                                    </FormItem>
                                  )}
                                />
                              )
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 flex flex-col sm:flex-row sm:justify-between gap-2 flex-shrink-0 border-t">
              <Button
                variant="ghost"
                onClick={handleCancel}
                type="button"
                className="rounded-full border border-input bg-transparent hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
              >
                Create Role
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
