"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AreaData, type Ward, type Constituency } from "./areaData";

interface LocationSelectorProps {
  form: any; // This remains any as it's a react-hook-form control type
}

export default function LocationSelector({ form }: LocationSelectorProps) {
  const [selectedCounty, setSelectedCounty] = useState<string>("");
  const [selectedConstituency, setSelectedConstituency] = useState<string>("");
  const [availableConstituencies, setAvailableConstituencies] = useState<
    Constituency[]
  >([]);
  const [availableWards, setAvailableWards] = useState<Ward[]>([]);

  // Update constituencies when county changes
  useEffect(() => {
    if (selectedCounty) {
      const county = AreaData.counties.find((c) => c.id === selectedCounty);
      setAvailableConstituencies(county?.constituencies || []);
      setSelectedConstituency("");
      setAvailableWards([]);
      form.setValue("constituency", "");
      form.setValue("ward", "");
    } else {
      setAvailableConstituencies([]);
      setAvailableWards([]);
    }
  }, [selectedCounty, form]);

  // Update wards when constituency changes
  useEffect(() => {
    if (selectedConstituency) {
      const constituency = availableConstituencies.find(
        (c) => c.id === selectedConstituency
      );
      setAvailableWards(constituency?.wards || []);
      form.setValue("ward", "");
    } else {
      setAvailableWards([]);
    }
  }, [selectedConstituency, availableConstituencies, form]);

  return (
    <div className="space-y-4">
      {/* County Selection */}
      <FormField
        control={form.control}
        name="county"
        render={({ field }) => (
          <FormItem>
            <FormLabel>County</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedCounty(value);
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your county" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {AreaData.counties.map((county) => (
                  <SelectItem key={county.id} value={county.id}>
                    {county.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Constituency Selection */}
      <FormField
        control={form.control}
        name="constituency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Constituency</FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedConstituency(value);
              }}
              defaultValue={field.value}
              disabled={!selectedCounty}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      selectedCounty
                        ? "Select your constituency"
                        : "Select county first"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableConstituencies.map((constituency) => (
                  <SelectItem key={constituency.id} value={constituency.id}>
                    {constituency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Ward Selection */}
      <FormField
        control={form.control}
        name="ward"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ward</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={!selectedConstituency}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      selectedConstituency
                        ? "Select your ward"
                        : "Select constituency first"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableWards.map((ward) => (
                  <SelectItem key={ward.id} value={ward.id}>
                    {ward.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
