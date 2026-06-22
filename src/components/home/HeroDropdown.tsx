"use client";

import { useEffect, useId, useRef } from "react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface HeroDropdownProps {
  id: string;
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  icon: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  highlightedIndex: number;
  onHighlightChange: (index: number) => void;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 text-hero-text/70 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

export function HeroDropdown({
  id,
  label,
  value,
  options,
  onChange,
  icon,
  isOpen,
  onOpenChange,
  highlightedIndex,
  onHighlightChange,
}: HeroDropdownProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption?.label ?? label;

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (isOpen) {
      const selectedIndex = options.findIndex((opt) => opt.value === value);
      onHighlightChange(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [isOpen, options, value, onHighlightChange]);

  function selectOption(option: DropdownOption) {
    onChange(option.value);
    onOpenChange(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!isOpen) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault();
        onOpenChange(true);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      onOpenChange(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      onHighlightChange((highlightedIndex + 1) % options.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      onHighlightChange((highlightedIndex - 1 + options.length) % options.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(options[highlightedIndex]);
    }
  }

  return (
    <div ref={rootRef} className="hero-dropdown">
      <button
        id={id}
        type="button"
        className="hero-dropdown-trigger"
        onClick={() => onOpenChange(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
      >
        {icon}
        <span className="inline-flex min-w-0 items-center gap-2">
          <span
            className={`truncate text-left text-sm sm:text-[0.9375rem] ${
              selectedOption && value
                ? "text-hero-text"
                : "text-hero-text/70"
            }`}
          >
            {displayLabel}
          </span>
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="hero-dropdown-menu"
        >
          {options.map((option, index) => {
            const isHighlighted = highlightedIndex === index;
            const isSelected = value === option.value;
            const isActive = isHighlighted || isSelected;
            const isFirst = index === 0;
            const isLast = index === options.length - 1;

            return (
              <li key={option.value || "any"} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`hero-dropdown-option ${
                    isActive ? "hero-dropdown-option-active" : ""
                  } ${isFirst && isActive ? "hero-dropdown-option-first" : ""} ${
                    isLast && isActive ? "hero-dropdown-option-last" : ""
                  }`}
                  onMouseEnter={() => onHighlightChange(index)}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
