"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";

export interface DashboardFilterValues {
  storeId: string;
  businessId: string;
  businessType: string;
  days: number;
  historyDays: number;
  forecastDays: number;
  county: string;
  constituency: string;
  ward: string;
  limit: number;
}

interface DashboardFiltersProps {
  onFilterChange: (filters: DashboardFilterValues) => void;
  defaultValues?: Partial<DashboardFilterValues>;
}

const defaultFilterValues: DashboardFilterValues = {
  storeId: "",
  businessId: "",
  businessType: "",
  days: 30,
  historyDays: 30,
  forecastDays: 30,
  county: "",
  constituency: "",
  ward: "",
  limit: 10,
};

export function DashboardFilters({
  onFilterChange,
  defaultValues,
}: DashboardFiltersProps) {
  const [filters, setFilters] = useState<DashboardFilterValues>({
    ...defaultFilterValues,
    ...defaultValues,
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (
    key: keyof DashboardFilterValues,
    value: DashboardFilterValues[keyof DashboardFilterValues],
  ) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    setFilters(defaultFilterValues);
    onFilterChange(defaultFilterValues);
  };

  const activeFiltersCount = Object.entries(filters).filter(
    ([key, value]) =>
      value &&
      value !== defaultFilterValues[key as keyof DashboardFilterValues],
  ).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant={isExpanded ? "default" : "outline"}
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
        </Button>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-2 text-destructive hover:text-destructive"
          >
            <X className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>

      {isExpanded && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Store Section */}
            <div className="space-y-2">
              <Label htmlFor="storeId" className="text-sm font-medium">
                Store ID
              </Label>
              <Input
                id="storeId"
                placeholder="Enter store ID"
                value={filters.storeId}
                onChange={(e) => handleFilterChange("storeId", e.target.value)}
              />
            </div>

            {/* Business Section */}
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label htmlFor="businessId" className="text-sm font-medium">
                  Business ID
                </Label>
                <Input
                  id="businessId"
                  placeholder="Business ID"
                  value={filters.businessId}
                  onChange={(e) =>
                    handleFilterChange("businessId", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-sm font-medium">
                  Business Type
                </Label>
                <Select
                  value={filters.businessType}
                  onValueChange={(value) =>
                    handleFilterChange("businessType", value)
                  }
                >
                  <SelectTrigger id="businessType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Time Period Section */}
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-2">
                <Label htmlFor="days" className="text-sm font-medium">
                  Days
                </Label>
                <Input
                  id="days"
                  type="number"
                  min="1"
                  max="365"
                  value={filters.days}
                  onChange={(e) =>
                    handleFilterChange("days", parseInt(e.target.value) || 30)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="historyDays" className="text-sm font-medium">
                  History Days
                </Label>
                <Input
                  id="historyDays"
                  type="number"
                  min="1"
                  max="365"
                  value={filters.historyDays}
                  onChange={(e) =>
                    handleFilterChange(
                      "historyDays",
                      parseInt(e.target.value) || 30,
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="forecastDays" className="text-sm font-medium">
                  Forecast Days
                </Label>
                <Input
                  id="forecastDays"
                  type="number"
                  min="1"
                  max="365"
                  value={filters.forecastDays}
                  onChange={(e) =>
                    handleFilterChange(
                      "forecastDays",
                      parseInt(e.target.value) || 30,
                    )
                  }
                />
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-2 pt-2 border-t">
              <h3 className="text-sm font-semibold">Location</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="county" className="text-sm font-medium">
                    County
                  </Label>
                  <Input
                    id="county"
                    placeholder="County"
                    value={filters.county}
                    onChange={(e) =>
                      handleFilterChange("county", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="constituency" className="text-sm font-medium">
                    Constituency
                  </Label>
                  <Input
                    id="constituency"
                    placeholder="Constituency"
                    value={filters.constituency}
                    onChange={(e) =>
                      handleFilterChange("constituency", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ward" className="text-sm font-medium">
                    Ward
                  </Label>
                  <Input
                    id="ward"
                    placeholder="Ward"
                    value={filters.ward}
                    onChange={(e) => handleFilterChange("ward", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Limit Section */}
            <div className="space-y-2">
              <Label htmlFor="limit" className="text-sm font-medium">
                Results Limit
              </Label>
              <Input
                id="limit"
                type="number"
                min="1"
                max="100"
                value={filters.limit}
                onChange={(e) =>
                  handleFilterChange("limit", parseInt(e.target.value) || 10)
                }
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
