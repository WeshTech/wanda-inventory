"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAuthBusinessId,
  useAuthStore,
  useAuthStoreAccess,
} from "@/stores/authStore";
import toast from "react-hot-toast";
import { useGetBusinessRoles } from "@/server-queries/roleQueries";
import Loader from "@/components/ui/loading-spiner";
import {
  UpdateUserForm,
  updateUserSchema,
} from "@/schemas/users/updateUserSchema";
import { BusinessUserResponseData } from "@/types/users";
import { useUpdateBusinessUser } from "@/server-queries/userQuery";
import { useStoreInfoQuery } from "@/server-queries/storeQueries"; // Import new hook
import { StoreInfo } from "@/types/stores";

interface UpdateUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser?: BusinessUserResponseData;
}

export function UpdateUserDialog({
  isOpen,
  onOpenChange,
  selectedUser,
}: UpdateUserDialogProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const storeIds = useAuthStoreAccess();
  const businessId = useAuthBusinessId() ?? "";

  const rolesQuery = useGetBusinessRoles(businessId);

  const storesInfoQuery = useStoreInfoQuery(businessId, storeIds);
  const mutation = useUpdateBusinessUser();

  // Refetch queries when dialog opens if stale or needed
  useEffect(() => {
    if (
      isOpen &&
      !authLoading &&
      isAuthenticated &&
      businessId &&
      storeIds.length > 0
    ) {
      if (rolesQuery.isStale) rolesQuery.refetch();
      if (storesInfoQuery.isStale) storesInfoQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, authLoading, isAuthenticated, businessId, storeIds.length]);

  // Initialize react-hook-form with zodResolver
  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: "",
      username: "",
      role: undefined,
      store: undefined,
    },
  });

  // Prefill form when data is available
  useEffect(() => {
    if (
      selectedUser &&
      rolesQuery.data?.success &&
      storesInfoQuery.data?.success
    ) {
      const rolesData = rolesQuery.data.data;
      const storesData = storesInfoQuery.data.data;

      const roleId = rolesData?.roles?.find(
        (r: { roleName: string; roleId: string }) =>
          r.roleName === selectedUser.roleName
      )?.roleId;

      let storeId: string | undefined;
      if (selectedUser.storeName && Array.isArray(storesData)) {
        storeId = storesData.find(
          (s: StoreInfo) => s.storeName === selectedUser.storeName
        )?.storeId;
      } else if (
        selectedUser.storeName &&
        !Array.isArray(storesData) &&
        storesData?.storeName === selectedUser.storeName
      ) {
        storeId = storesData.storeId;
      }

      form.reset({
        email: selectedUser.email,
        username: selectedUser.userName,
        role: roleId,
        store: storeId,
      });
    }
  }, [selectedUser, rolesQuery.data, storesInfoQuery.data, form]);

  const onSubmit = (data: UpdateUserForm) => {
    if (!selectedUser) return;

    const dirtyFields = form.formState.dirtyFields;
    const payload: Partial<UpdateUserForm> = {};

    if (dirtyFields.email) payload.email = data.email;
    if (dirtyFields.username) payload.username = data.username;
    if (dirtyFields.role) payload.role = data.role;
    if (dirtyFields.store) {
      payload.store = data.store === "" ? undefined : data.store;
    }

    if (Object.keys(payload).length === 0) {
      toast.error("You have not made changes");
      onOpenChange(false);
      return;
    }

    const loadingId = toast.loading("Updating user...");
    mutation.mutate(
      { formData: payload as UpdateUserForm, userId: selectedUser.id },
      {
        onSuccess: (response) => {
          toast.dismiss(loadingId);
          toast.success(response.message || "User updated successfully");
          form.reset();
          onOpenChange(false);
        },
        onError: (error) => {
          toast.dismiss(loadingId);
          toast.error(error.message || "Failed to update user");
        },
      }
    );
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const isPreparing =
    authLoading ||
    rolesQuery.isLoading ||
    storesInfoQuery.isLoading ||
    rolesQuery.isFetching ||
    storesInfoQuery.isFetching ||
    mutation.isPending;

  if (!isAuthenticated || !businessId || !selectedUser) {
    return null;
  }

  const storesData = storesInfoQuery.data?.success
    ? Array.isArray(storesInfoQuery.data.data)
      ? storesInfoQuery.data.data
      : storesInfoQuery.data.data
      ? [storesInfoQuery.data.data]
      : []
    : null;

  const rolesData = rolesQuery.data?.success ? rolesQuery.data.data : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-foreground">Update User</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Modify the user details, role, or store access.
          </DialogDescription>
        </DialogHeader>

        {isPreparing ? (
          <Loader text="Preparing stores and roles for your business" />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-6"
            >
              {/* Top Section - Email and username */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="user@example.com"
                          className="h-12 rounded-full border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        User Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          type="text"
                          placeholder="johndoe"
                          className="h-12 rounded-full border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Bottom Section - Role and Store */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Role
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            id="role"
                            className="h-12 w-full sm:w-3/4 rounded-full border-input bg-background text-foreground"
                          >
                            <SelectValue placeholder="Select user role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover border-border">
                          {rolesData?.roles?.map(
                            (role: { roleId: string; roleName: string }) => (
                              <SelectItem
                                key={role.roleId}
                                value={role.roleId}
                                className="text-popover-foreground hover:bg-accent"
                              >
                                {role.roleName}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="store"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        Store Access
                      </FormLabel>
                      <Select
                        onValueChange={(val) =>
                          field.onChange(val === "unassigned" ? undefined : val)
                        }
                        value={field.value ?? "unassigned"}
                      >
                        <FormControl>
                          <SelectTrigger
                            id="store"
                            className="h-12 w-full sm:w-3/4 rounded-full border-input bg-background text-foreground"
                          >
                            <SelectValue placeholder="Select store location" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {storesData?.map((store: StoreInfo) => (
                            <SelectItem
                              key={store.storeId}
                              value={store.storeId}
                              className="text-popover-foreground hover:bg-accent"
                            >
                              {store.storeName}{" "}
                              <span className="text-sm text-muted-foreground">
                                ({store.ward})
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Centered Buttons */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-11 px-8 rounded-full border-input text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-11 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Updating..." : "Update User"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
