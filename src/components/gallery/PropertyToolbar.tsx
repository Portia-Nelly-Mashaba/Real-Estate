"use client";

import { Check, ChevronDown, LayoutGrid, List, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  BED_BATH_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  SORT_OPTIONS,
  formatPropertyPrice,
} from "@/lib/data/properties";
import {
  DEFAULT_FILTERS,
  MAX_PROPERTY_PRICE,
  type PropertyFilters,
  type SortOption,
  type ViewMode,
} from "@/lib/gallery/filters";

interface PropertyToolbarProps {
  filters: PropertyFilters;
  sort: SortOption;
  view: ViewMode;
  filtersOpen: boolean;
  onFiltersChange: (filters: PropertyFilters) => void;
  onSortChange: (sort: SortOption) => void;
  onViewChange: (view: ViewMode) => void;
  onToggleFilters: () => void;
  onResetFilters: () => void;
}

function SortMenu({
  value,
  onChange,
}: {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selected = SORT_OPTIONS.find((opt) => opt.value === value);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className="gallery-toolbar-btn min-w-[8.75rem] justify-between gap-1.5"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
      >
        <span>{selected?.label ?? "Sort"}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open ? (
        <ul id={listboxId} role="listbox" className="gallery-sort-menu">
          {SORT_OPTIONS.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`gallery-sort-option ${isSelected ? "gallery-sort-option-active" : ""}`}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  <span>{option.label}</span>
                  {isSelected ? (
                    <Check className="h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function PropertyToolbar({
  filters,
  sort,
  view,
  filtersOpen,
  onFiltersChange,
  onSortChange,
  onViewChange,
  onToggleFilters,
  onResetFilters,
}: PropertyToolbarProps) {
  return (
    <div className="gallery-toolbar">
      <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:gap-3">
        <input
          type="search"
          value={filters.search}
          onChange={(event) =>
            onFiltersChange({ ...filters, search: event.target.value })
          }
          placeholder="Search by name, suburb or region..."
          className="gallery-search-input min-w-0 flex-1"
          aria-label="Search properties"
        />

        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
          <SortMenu value={sort} onChange={onSortChange} />

          <button
            type="button"
            onClick={onToggleFilters}
            className={`gallery-toolbar-btn gap-1.5 ${
              filtersOpen ? "gallery-toolbar-btn-active" : ""
            }`}
            aria-expanded={filtersOpen}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
            Filters
          </button>

          <div className="gallery-view-toggle" role="group" aria-label="View mode">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              className={view === "grid" ? "gallery-view-btn-active" : "gallery-view-btn"}
              aria-pressed={view === "grid"}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onViewChange("list")}
              className={view === "list" ? "gallery-view-btn-active" : "gallery-view-btn"}
              aria-pressed={view === "list"}
              aria-label="List view"
            >
              <List className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {filtersOpen ? (
        <div className="gallery-filters-panel">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <label className="gallery-filter-field">
              <span className="gallery-filter-label">Type</span>
              <select
                value={filters.type}
                onChange={(event) =>
                  onFiltersChange({ ...filters, type: event.target.value })
                }
                className="gallery-filter-select"
              >
                {PROPERTY_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="gallery-filter-field">
              <span className="gallery-filter-label">Min bedrooms</span>
              <select
                value={filters.minBeds}
                onChange={(event) =>
                  onFiltersChange({ ...filters, minBeds: event.target.value })
                }
                className="gallery-filter-select"
              >
                {BED_BATH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="gallery-filter-field">
              <span className="gallery-filter-label">Min bathrooms</span>
              <select
                value={filters.minBaths}
                onChange={(event) =>
                  onFiltersChange({ ...filters, minBaths: event.target.value })
                }
                className="gallery-filter-select"
              >
                {BED_BATH_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="gallery-filter-field">
              <span className="gallery-filter-label">Price range</span>
              <input
                type="range"
                min={0}
                max={MAX_PROPERTY_PRICE}
                step={500_000}
                value={filters.maxPrice}
                onChange={(event) =>
                  onFiltersChange({
                    ...filters,
                    maxPrice: Number(event.target.value),
                  })
                }
                className="gallery-price-range mt-3 w-full"
                aria-valuemin={0}
                aria-valuemax={MAX_PROPERTY_PRICE}
                aria-valuenow={filters.maxPrice}
                aria-label="Maximum price"
              />
              <div className="mt-2 flex justify-between text-xs text-muted">
                <span>R 0</span>
                <span>{formatPropertyPrice(MAX_PROPERTY_PRICE)}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onResetFilters}
            className="gallery-reset-btn"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            Reset filters
          </button>
        </div>
      ) : null}
    </div>
  );
}
