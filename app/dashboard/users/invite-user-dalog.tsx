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
  InviteUserForm,
  inviteUserSchema,
} from "@/schemas/users/inviteUserSchema";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import { toast as sonnerToast } from "sonner";
import toast from "react-hot-toast";
import { useGetBusinessStores } from "@/server-queries/storeQueries";
import { useGetBusinessRoles } from "@/server-queries/roleQueries";
import { useCreateBusinessUser } from "@/server-queries/userQuery";
import Loader from "@/components/ui/loading-spiner";
import { GetStoresResult } from "@/types/stores";

interface InviteUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteUserDialog({
  isOpen,
  onOpenChange,
}: InviteUserDialogProps) {
  const { isAuthenticated, isLoading: authLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";

  const storesQuery = useGetBusinessStores();
  const rolesQuery = useGetBusinessRoles(businessId);

  const mutation = useCreateBusinessUser();

  // Refetch data when dialog opens
  useEffect(() => {
    if (isOpen && !authLoading && isAuthenticated && businessId) {
      if (storesQuery.isStale) storesQuery.refetch();
      if (rolesQuery.isStale) rolesQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, authLoading, isAuthenticated, businessId]);

  // react-hook-form
  const form = useForm<InviteUserForm>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: {
      email: "",
      username: "",
      role: undefined,
      store: undefined,
    },
  });

  const onSubmit = (data: InviteUserForm) => {
    const loadingId = sonnerToast.loading("Inviting user...");

    mutation.mutate(data, {
      onSuccess: (response) => {
        sonnerToast.dismiss(loadingId);
        toast.success(response.message || "User invited successfully ✅");
        form.reset();
        onOpenChange(false);
      },
      onError: (error) => {
        sonnerToast.dismiss(loadingId);
        toast.error(error.message || "Failed to invite user ❌");
      },
    });
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const isPreparing =
    authLoading ||
    storesQuery.isLoading ||
    rolesQuery.isLoading ||
    storesQuery.isFetching ||
    rolesQuery.isFetching ||
    mutation.isPending;

  if (!isAuthenticated || !businessId) {
    return null;
  }

  const storesData = (
    storesQuery.data as GetStoresResult & { success: boolean }
  )?.success
    ? (
        storesQuery.data as {
          data: { stores: Array<{ id: string; name: string; ward: string }> };
        }
      ).data
    : null;

  const rolesData = rolesQuery.data?.success ? rolesQuery.data.data : null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-foreground">Invite New User</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the user details and select their role and store access.
          </DialogDescription>
        </DialogHeader>

        {isPreparing ? (
          <Loader text="Preparing stores and roles for your business..." />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-6"
            >
              {/* Email + Username */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="user@example.com"
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
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          type="text"
                          placeholder="johndoe"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Role + Store */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <div className="w-full md:w-3/4">
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              id="role"
                              className="w-full md:w-3/4"
                            >
                              <SelectValue placeholder="Select user role" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {rolesData?.roles?.map(
                              (role: { roleId: string; roleName: string }) => (
                                <SelectItem
                                  key={role.roleId}
                                  value={role.roleId}
                                >
                                  {role.roleName}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />

                <FormField
                  control={form.control}
                  name="store"
                  render={({ field }) => (
                    <div className="w-full md:w-3/4">
                      <FormItem>
                        <FormLabel>Store Access</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger
                              id="store"
                              className="w-full md:w-3/4"
                            >
                              <SelectValue placeholder="Select store location" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {storesData?.stores?.map(
                              (store: {
                                id: string;
                                name: string;
                                ward: string;
                              }) => (
                                <SelectItem key={store.id} value={store.id}>
                                  {store.name}{" "}
                                  <span className="text-sm text-muted-foreground">
                                    ({store.ward})
                                  </span>
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={mutation.isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Creating..." : "Create User"}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
