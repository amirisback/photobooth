"use client";

import React from "react";
import { FILTER_OPTIONS } from "@/lib/booth-config";
import { cn } from "@/lib/utils";

interface FilterSelectionProps {
  activeFilterId: string;
  onSelectFilter: (id: string) => void;
  isDisabled?: boolean;
}

export const FilterSelection: React.FC<FilterSelectionProps> = ({
  activeFilterId,
  onSelectFilter,
  isDisabled = false,
}) => {
  return (
    <div className="w-full mt-6">
      <h4 className="text-label mb-3 text-text-headline">Filter</h4>
      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
        {FILTER_OPTIONS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelectFilter(filter.id)}
            disabled={isDisabled}
            className={cn(
              "flex flex-col items-center gap-2 min-w-[72px] transition-transform",
              isDisabled && "opacity-50 cursor-not-allowed",
              !isDisabled && "hover:scale-105"
            )}
          >
            <div 
              className={cn(
                "w-16 h-16 rounded-full border-2 overflow-hidden bg-surface-neutral/20 shadow-sm",
                activeFilterId === filter.id ? "border-primary" : "border-transparent"
              )}
            >
              {/* Dummy preview area - in a real app this could be a static image with the filter applied */}
              <div 
                className="w-full h-full bg-[url('/frames/classic.svg')] bg-cover bg-center"
                style={{ filter: filter.cssString }}
              />
            </div>
            <span className={cn(
              "text-micro font-medium",
              activeFilterId === filter.id ? "text-primary" : "text-text-body"
            )}>
              {filter.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
