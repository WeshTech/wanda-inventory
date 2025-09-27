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
import { useAuthStore } from "@/stores/authStore";
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
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const businessId = user?.businessId;

  const storesQuery = useGetBusinessStores();
  const rolesQuery = useGetBusinessRoles(businessId);

  const mutation = useCreateBusinessUser();

  // Refetch queries when dialog opens if stale or needed
  useEffect(() => {
    if (isOpen && !authLoading && isAuthenticated && businessId) {
      if (storesQuery.isStale) storesQuery.refetch();
      if (rolesQuery.isStale) rolesQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, authLoading, isAuthenticated, businessId]);

  // Initialize react-hook-form with zodResolver
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
    const loadingId = sonnerToast.loading("Creating user...");
    mutation.mutate(data, {
      onSuccess: (response) => {
        sonnerToast.dismiss(loadingId);
        toast.success(response.message || "User created successfully");
        form.reset();
        onOpenChange(false);
      },
      onError: (error) => {
        sonnerToast.dismiss(loadingId);
        toast.error(error.message || "Failed to create user");
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
    return null; // Or show an error dialog/message if needed
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
          <Loader text="Preparing stores and roles for your business" />
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-6"
            >
              {/* Top Section - Email and Username */}
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
                        Username
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
                        onValueChange={field.onChange}
                        value={field.value}
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
                          {storesData?.stores?.map(
                            (store: {
                              id: string;
                              name: string;
                              ward: string;
                            }) => (
                              <SelectItem
                                key={store.id}
                                value={store.id}
                                className="text-popover-foreground hover:bg-accent"
                              >
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
// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   InviteUserForm,
//   inviteUserSchema,
// } from "@/schemas/users/inviteUserSchema";

// interface InviteUserDialogProps {
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   onInviteUser: (data: InviteUserForm) => void;
// }

// export function InviteUserDialog({
//   isOpen,
//   onOpenChange,
//   onInviteUser,
// }: InviteUserDialogProps) {
//   const [isLoading, setIsLoading] = useState(false);

//   // Initialize react-hook-form with zodResolver
//   const form = useForm<InviteUserForm>({
//     resolver: zodResolver(inviteUserSchema),
//     defaultValues: {
//       email: "",
//       username: "",
//       role: undefined,
//       store: undefined,
//     },
//   });

//   const onSubmit = async (data: InviteUserForm) => {
//     setIsLoading(true);
//     try {
//       // Call the parent component's onInviteUser callback with validated data
//       onInviteUser(data);
//       // Reset form and close dialog
//       form.reset();
//       onOpenChange(false);
//     } catch (error) {
//       console.error("Error inviting user:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleCancel = () => {
//     form.reset();
//     onOpenChange(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[480px]">
//         <DialogHeader className="text-center">
//           <DialogTitle className="text-foreground">Invite New User</DialogTitle>
//           <DialogDescription className="text-muted-foreground">
//             Enter the user details and select their role and store access.
//           </DialogDescription>
//         </DialogHeader>

//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 py-6"
//           >
//             {/* Top Section - Email and Username */}
//             <div className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium text-foreground">
//                       Email Address
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         id="email"
//                         type="email"
//                         placeholder="user@example.com"
//                         className="h-12 rounded-full border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="username"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium text-foreground">
//                       Username
//                     </FormLabel>
//                     <FormControl>
//                       <Input
//                         id="username"
//                         type="text"
//                         placeholder="johndoe"
//                         className="h-12 rounded-full border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Bottom Section - Role and Store */}
//             <div className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="role"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium text-foreground">
//                       Role
//                     </FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger
//                           id="role"
//                           className="h-12 rounded-full w-1/2 border-input bg-background text-foreground"
//                         >
//                           <SelectValue placeholder="Select user role" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent className="bg-popover border-border">
//                         <SelectItem
//                           value="Admin"
//                           className="text-popover-foreground hover:bg-accent"
//                         >
//                           Admin - Full access
//                         </SelectItem>
//                         <SelectItem
//                           value="Member"
//                           className="text-popover-foreground hover:bg-accent"
//                         >
//                           Member - Standard access
//                         </SelectItem>
//                         <SelectItem
//                           value="Viewer"
//                           className="text-popover-foreground hover:bg-accent"
//                         >
//                           Viewer - Read-only access
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="store"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-sm font-medium text-foreground">
//                       Store Access
//                     </FormLabel>
//                     <Select onValueChange={field.onChange} value={field.value}>
//                       <FormControl>
//                         <SelectTrigger
//                           id="store"
//                           className="h-12 rounded-full w-1/2 border-input bg-background text-foreground"
//                         >
//                           <SelectValue placeholder="Select store location" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent className="bg-popover border-border">
//                         <SelectItem
//                           value="main-store"
//                           className="text-popover-foreground hover:bg-accent"
//                         >
//                           Main Store - Downtown
//                         </SelectItem>
//                         <SelectItem
//                           value="north-branch"
//                           className="text-popover-foreground hover:bg-accent"
//                         >
//                           North Branch
//                         </SelectItem>
//                         <SelectItem
//                           value="south-branch"
//                           className="text-popover-foreground hover:bg-accent"
//                         >
//                           South Branch
//                         </SelectItem>
//                         <SelectItem
//                           value="online-store"
//                           className="text-popover-foreground hover:bg-accent"
//                         >
//                           Online Store
//                         </SelectItem>
//                         <SelectItem
//                           value="all-stores"
//                           className="text-popover-foreground hover:bg-accent"
//                         >
//                           All Stores
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {/* Centered Buttons */}
//             <div className="flex items-center justify-center gap-4 pt-4">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={handleCancel}
//                 className="h-11 px-8 rounded-full border-input text-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
//                 disabled={isLoading}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 type="submit"
//                 className="h-11 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating..." : "Create User"}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// }
