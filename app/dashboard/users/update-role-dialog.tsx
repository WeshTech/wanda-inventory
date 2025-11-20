"use client";

import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { PermissionActions, PermissionModuleKeys } from "@/types/roles";

import { z } from "zod";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import {
  useGetBusinessRole,
  useUpdateBusinessRole,
} from "@/server-queries/roleQueries";
import { toast as sonnerToast } from "sonner";
import { toast as hotToast } from "react-hot-toast";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect } from "react";
import { BusinessRole } from "@/types/roles";
import {
  UpdateRoleInput,
  updateRoleSchema,
} from "@/schemas/users/updateRoleSchema";
import { PERMISSION_MODULES } from "@/schemas/users/createRole.Schema";
import Loader from "@/components/ui/loading-spiner";

interface UpdateRoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleId: string | null;
  onRoleUpdate: () => void;
}

// Helper function to map BusinessRole to permissions format
const mapRoleToPermissions = (role: BusinessRole) => {
  return {
    store: {
      create: role.createStore,
      extract: role.extractStore,
      update: role.updateStore,
      delete: role.deleteStore,
    },
    users: {
      create: role.createUsers,
      extract: role.extractUsers,
      update: role.updateUsers,
      delete: role.deleteUsers,
    },
    roles: {
      create: role.createRoles,
      extract: role.extractRoles,
      update: role.updateRoles,
      delete: role.deleteRoles,
    },
    products: {
      create: role.createProducts,
      extract: role.extractProducts,
      update: role.updateProducts,
      delete: role.deleteProducts,
    },
    storeInventory: {
      create: role.createStoreInventory,
      extract: role.extractStoreInventory,
      update: role.updateStoreInventory,
      delete: role.deleteStoreInventory,
    },
    categories: {
      create: role.createCategories,
      extract: role.extractCategories,
      update: role.updateCategories,
      delete: role.deleteCategories,
    },
    transfers: {
      create: role.createTransfers,
      extract: role.extractTransfers,
      update: role.updateTransfers,
      delete: role.deleteTransfers,
    },
    sales: {
      create: role.createSales,
      extract: role.extractSales,
      update: role.updateSales,
      delete: role.deleteSales,
    },
    invoices: {
      create: role.createInvoices,
      extract: role.extractInvoices,
      update: role.updateInvoices,
      delete: role.deleteInvoices,
    },
    suppliers: {
      create: role.createSuppliers,
      extract: role.extractSuppliers,
      update: role.updateSuppliers,
      delete: role.deleteSuppliers,
    },
    purchaseOrders: {
      create: role.createPurchaseOrders,
      extract: role.extractPurchaseOrders,
      update: role.updatePurchaseOrders,
      delete: role.deletePurchaseOrders,
    },
  };
};

export function UpdateRoleDialog({
  open,
  onOpenChange,
  roleId,
  onRoleUpdate,
}: UpdateRoleDialogProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";

  // Fetch role data when dialog opens with a roleId
  const {
    data: roleResponse,
    isLoading: isLoadingRole,
    error: roleError,
  } = useGetBusinessRole(businessId, roleId || "");

  // Updated hook usage with businessId
  const { mutate: updateRole, isPending } = useUpdateBusinessRole(businessId);

  const form = useForm<UpdateRoleInput>({
    resolver: zodResolver(updateRoleSchema),
    defaultValues: {
      roleId: "",
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

  // Populate form when role data is fetched
  useEffect(() => {
    if (roleResponse?.success && roleResponse.data) {
      const roleData = roleResponse.data;

      form.reset({
        roleId: roleData.id,
        title: roleData.roleName,
        description: roleData.description,
        permissions: mapRoleToPermissions(roleData),
      });
    }
  }, [roleResponse, form]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const handleToggleAllPermissions = (
    moduleKey: PermissionModuleKeys,
    checked: boolean
  ) => {
    form.setValue(`permissions.${moduleKey}.create`, checked);
    form.setValue(`permissions.${moduleKey}.extract`, checked);
    form.setValue(`permissions.${moduleKey}.update`, checked);
    form.setValue(`permissions.${moduleKey}.delete`, checked);
  };

  const onSubmit = (values: UpdateRoleInput) => {
    if (authLoading) {
      hotToast.error("Authentication is still loading");
      return;
    }
    if (!isAuthenticated || !businessId) {
      hotToast.error(
        "You must be logged in with a valid business to update a role"
      );
      return;
    }

    const formData = {
      title: values.title,
      description: values.description,
      permissions: values.permissions,
      businessId: businessId,
    };

    const toastId = sonnerToast.loading("Updating role...");

    updateRole(
      { formData, roleId: values.roleId },
      {
        onSuccess: (response) => {
          sonnerToast.dismiss(toastId);
          hotToast.success(response.message || "Role updated successfully");
          onOpenChange(false);
          onRoleUpdate();
        },
        onError: (error) => {
          sonnerToast.dismiss(toastId);
          hotToast.error(error.message);
        },
      }
    );
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="flex-shrink-0 p-6 pb-0">
          <DialogTitle className="text-foreground">Update Role</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Modify the role&apos;s title, description, and permissions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto px-6 max-h-[60vh]">
              {isLoadingRole ? (
                <div className="flex justify-center items-center py-8">
                  <Loader text="Loading role data" size="md" />
                </div>
              ) : roleError ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-destructive">Error loading role data</p>
                </div>
              ) : (
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
                    {form.formState.errors.permissions && (
                      <p className="text-sm text-destructive mb-4">
                        {form.formState.errors.permissions.message}
                      </p>
                    )}
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
                                        z.infer<typeof updateRoleSchema>
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
              )}
            </div>

            <DialogFooter className="p-6 pt-4 flex flex-row justify-center gap-4 flex-shrink-0 border-t">
              <Button
                variant="ghost"
                onClick={handleCancel}
                type="button"
                className="rounded-full border border-input bg-transparent hover:bg-accent hover:text-accent-foreground px-8"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || authLoading || isLoadingRole}
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              >
                {isPending ? "Updating..." : "Update Role"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
