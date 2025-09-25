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
import { PermissionActions, PermissionModuleKeys, Role } from "@/types/roles";
import {
  CreateRoleInput,
  createRoleSchema,
  PERMISSION_MODULES,
} from "@/schemas/users/createRole.Schema";
import z from "zod";
import { CheckedState } from "@radix-ui/react-checkbox";

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
  const form = useForm<CreateRoleInput>({
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

  const onSubmit = (values: CreateRoleInput) => {
    const flatPermissions: Record<string, boolean> = {};

    Object.entries(values.permissions).forEach(([module, actions]) => {
      Object.entries(actions).forEach(([action, value]) => {
        if (value === true) {
          const moduleKey = module.charAt(0).toUpperCase() + module.slice(1);
          const backendKey = `${action}${moduleKey}`;
          flatPermissions[backendKey] = true;
        }
      });
    });

    // Construct payload for backend
    const payload = {
      roleName: values.title,
      description: values.description,
      businessId: "SOME_BUSINESS_ID", // <-- inject actual businessId here
      ...flatPermissions,
    };

    console.log("Backend payload:", payload);

    const newRole: Role = {
      id: `r${Date.now()}`,
      activeUsers: 0,
      dateCreated: new Date().toISOString(),
      title: values.title,
      description: values.description,
      permissions: values.permissions, // keep original nested for FE
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

            <DialogFooter className="p-6 pt-4 flex flex-row justify-center gap-4 flex-shrink-0 border-t">
              <Button
                variant="ghost"
                onClick={handleCancel}
                type="button"
                className="rounded-full border border-input bg-transparent hover:bg-accent hover:text-accent-foreground px-8"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8"
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
