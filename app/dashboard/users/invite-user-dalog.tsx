"use client";

import { useState } from "react";
import { z } from "zod";
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

// Zod validation schema
const inviteUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  role: z.enum(["Admin", "Member", "Viewer"]).refine((val) => !!val, {
    message: "Please select a role",
  }),
  store: z.string().min(1, "Please select a store"),
});

type InviteUserForm = z.infer<typeof inviteUserSchema>;

interface InviteUserDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteUser: (data: InviteUserForm) => void;
}

export function InviteUserDialog({
  isOpen,
  onOpenChange,
  onInviteUser,
}: InviteUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data: InviteUserForm) => {
    setIsLoading(true);
    try {
      // Call the parent component's onInviteUser callback with validated data
      onInviteUser(data);
      // Reset form and close dialog
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error inviting user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] bg-background border-border fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 grid w-full gap-4 border p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-foreground">Invite New User</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter the user details and select their role and store access.
          </DialogDescription>
        </DialogHeader>

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
                        className="h-12 rounded-full border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring dark:border-input dark:bg-background"
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
                        className="h-12 rounded-full border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring dark:border-input dark:bg-background"
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          id="role"
                          className="h-12 rounded-full w-1/2 border-input bg-background text-foreground dark:border-input dark:bg-background"
                        >
                          <SelectValue placeholder="Select user role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem
                          value="Admin"
                          className="text-popover-foreground hover:bg-accent"
                        >
                          Admin - Full access
                        </SelectItem>
                        <SelectItem
                          value="Member"
                          className="text-popover-foreground hover:bg-accent"
                        >
                          Member - Standard access
                        </SelectItem>
                        <SelectItem
                          value="Viewer"
                          className="text-popover-foreground hover:bg-accent"
                        >
                          Viewer - Read-only access
                        </SelectItem>
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger
                          id="store"
                          className="h-12 rounded-full w-1/2 border-input bg-background text-foreground dark:border-input dark:bg-background"
                        >
                          <SelectValue placeholder="Select store location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem
                          value="main-store"
                          className="text-popover-foreground hover:bg-accent"
                        >
                          Main Store - Downtown
                        </SelectItem>
                        <SelectItem
                          value="north-branch"
                          className="text-popover-foreground hover:bg-accent"
                        >
                          North Branch
                        </SelectItem>
                        <SelectItem
                          value="south-branch"
                          className="text-popover-foreground hover:bg-accent"
                        >
                          South Branch
                        </SelectItem>
                        <SelectItem
                          value="online-store"
                          className="text-popover-foreground hover:bg-accent"
                        >
                          Online Store
                        </SelectItem>
                        <SelectItem
                          value="all-stores"
                          className="text-popover-foreground hover:bg-accent"
                        >
                          All Stores
                        </SelectItem>
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
                className="h-11 px-8 rounded-full border-input text-foreground hover:bg-accent hover:text-accent-foreground dark:border-input dark:hover:bg-accent bg-transparent"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Creating..." : "Create User"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
