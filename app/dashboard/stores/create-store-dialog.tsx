"use client";

import * as React from "react";
import { Store, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CreateStoreFormData,
  createStoreSchema,
} from "@/schemas/stores/createStoreSchema";
import { AreaData, Constituency, Ward } from "@/app/auth/register/areaData";
import { toast } from "sonner";
import { useCreateStore } from "@/server-queries/storeQueries";

interface StoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateStoreFormData) => void;
  initialData?: Partial<CreateStoreFormData>;
}

export function CreateStoreDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: StoreDialogProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateStoreFormData>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
      county: "",
      constituency: "",
      ward: "",
      storeStatus: undefined,
      ...initialData,
    },
  });

  const watchedCounty = watch("county");
  const watchedConstituency = watch("constituency");
  const watchedWard = watch("ward");
  const watchedStoreStatus = watch("storeStatus");

  const [availableConstituencies, setAvailableConstituencies] = React.useState<
    Constituency[]
  >([]);
  const [availableWards, setAvailableWards] = React.useState<Ward[]>([]);
  const { mutate: createStore, isPending } = useCreateStore();

  React.useEffect(() => {
    if (!open) {
      reset();
      setAvailableConstituencies([]);
      setAvailableWards([]);
    }
  }, [open, reset]);

  React.useEffect(() => {
    if (watchedCounty) {
      const selectedCounty = AreaData.counties.find(
        (county) => county.id === watchedCounty
      );
      if (selectedCounty) {
        setAvailableConstituencies(selectedCounty.constituencies);
        setValue("constituency", "");
        setValue("ward", "");
        setAvailableWards([]);
      }
    } else {
      setAvailableConstituencies([]);
      setAvailableWards([]);
      setValue("constituency", "");
      setValue("ward", "");
    }
  }, [watchedCounty, setValue]);

  React.useEffect(() => {
    if (watchedConstituency && availableConstituencies.length > 0) {
      const selectedConstituency = availableConstituencies.find(
        (constituency) => constituency.id === watchedConstituency
      );
      if (selectedConstituency) {
        setAvailableWards(selectedConstituency.wards);
        setValue("ward", "");
      }
    } else {
      setAvailableWards([]);
      setValue("ward", "");
    }
  }, [watchedConstituency, availableConstituencies, setValue]);

  const onFormSubmit = async (data: CreateStoreFormData) => {
    const loadingId = toast.loading("Creating store...");

    createStore(data, {
      onSuccess: (result) => {
        toast.dismiss(loadingId);
        if (result.success) {
          toast.success(result.message ?? "Store created successfully");
          onSubmit?.(data);
          onOpenChange(false);
        } else {
          toast.error(result.message ?? "Failed to create store");
        }
      },
      onError: (error) => {
        toast.dismiss(loadingId);
        toast.error(error.message ?? "Failed to create store");
      },
    });
  };

  const getSelectValue = (value: string | undefined) => value || "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-gradient-to-br from-primary/30 via-background to-secondary/30 bg-muted border border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold text-foreground">
            <Store className="h-5 w-5 text-primary" />{" "}
            <PlusCircle className="h-4 w-4 text-muted-foreground" /> Create a
            new store
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new store to your business. Select county first, then
            constituency and ward for precise location.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Store Name */}
          <div className="space-y-2 w-full">
            <Label htmlFor="name" className="text-foreground">
              Store Name
            </Label>
            <Input
              id="name"
              placeholder="Enter store name"
              {...register("name")}
              className={`rounded-full border-border bg-background ${
                errors.name ? "border-destructive" : ""
              }`}
              disabled={isPending}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* County */}
            <div className="space-y-2 w-full">
              <Label className="text-foreground">County</Label>
              <Select
                value={getSelectValue(watchedCounty)}
                onValueChange={(value) => setValue("county", value || "")}
                disabled={isPending}
              >
                <SelectTrigger
                  className={`rounded-full border-border bg-background w-full ${
                    errors.county ? "border-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Select county..." />
                </SelectTrigger>
                <SelectContent>
                  {AreaData.counties.map((county) => (
                    <SelectItem key={county.id} value={county.id}>
                      {county.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.county && (
                <p className="text-sm text-destructive">
                  {errors.county.message}
                </p>
              )}
            </div>

            {/* Constituency */}
            <div className="space-y-2 w-full">
              <Label className="text-foreground">Constituency</Label>
              <Select
                value={getSelectValue(watchedConstituency)}
                onValueChange={(value) => setValue("constituency", value || "")}
                disabled={
                  isPending || // Disable during submission
                  !watchedCounty ||
                  availableConstituencies.length === 0
                }
              >
                <SelectTrigger
                  className={`rounded-full border-border bg-background w-full ${
                    errors.constituency ? "border-destructive" : ""
                  } ${
                    isPending ||
                    !watchedCounty ||
                    availableConstituencies.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select constituency..." />
                </SelectTrigger>
                <SelectContent>
                  {availableConstituencies.map((constituency) => (
                    <SelectItem key={constituency.id} value={constituency.id}>
                      {constituency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.constituency && (
                <p className="text-sm text-destructive">
                  {errors.constituency.message}
                </p>
              )}
              {!watchedCounty && (
                <p className="text-sm text-muted-foreground">
                  Select a county first
                </p>
              )}
            </div>

            {/* Ward */}
            <div className="space-y-2 w-ful">
              <Label className="text-foreground">Ward</Label>
              <Select
                value={getSelectValue(watchedWard)}
                onValueChange={(value) => setValue("ward", value || "")}
                disabled={
                  isPending ||
                  !watchedConstituency ||
                  availableWards.length === 0
                }
              >
                <SelectTrigger
                  className={`rounded-full border-border bg-background w-full ${
                    errors.ward ? "border-destructive" : ""
                  } ${
                    isPending ||
                    !watchedConstituency ||
                    availableWards.length === 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select ward..." />
                </SelectTrigger>
                <SelectContent>
                  {availableWards.map((ward) => (
                    <SelectItem key={ward.id} value={ward.id}>
                      {ward.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.ward && (
                <p className="text-sm text-destructive">
                  {errors.ward.message}
                </p>
              )}
              {!watchedConstituency && (
                <p className="text-sm text-muted-foreground">
                  Select a constituency first
                </p>
              )}
            </div>

            {/* Store Status */}
            <div className="space-y-2 w-full">
              <Label className="text-foreground">Status</Label>
              <Select
                value={watchedStoreStatus || ""}
                onValueChange={(value: "OPENED" | "CLOSED") =>
                  setValue("storeStatus", value)
                }
                disabled={isPending}
              >
                <SelectTrigger
                  className={`rounded-full border-border bg-background w-full ${
                    errors.storeStatus ? "border-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Select store status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OPENED">Open</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
              {errors.storeStatus && (
                <p className="text-sm text-destructive">
                  {errors.storeStatus.message}
                </p>
              )}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="px-8 rounded-full border border-border bg-white dark:bg-transparent hover:bg-muted"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="px-8 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
