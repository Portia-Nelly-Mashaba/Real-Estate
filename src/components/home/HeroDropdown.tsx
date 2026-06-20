"use client";

import { useEffect, useId, useRef, useState } from "react";

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
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 text-foreground/50 transition-transform duration-200 ${
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
}: HeroDropdownProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption?.label ?? label;

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

  useEffect(() => {
    if (open) {
      const selectedIndex = options.findIndex((opt) => opt.value === value);
      setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [open, options, value]);

  function selectOption(option: DropdownOption) {
    onChange(option.value);
    setOpen(false);
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (!open) {
      if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((i) => (i + 1) % options.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((i) => (i - 1 + options.length) % options.length);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(options[highlightedIndex]);
    }
  }

  return (
    <div ref={rootRef} className="hero-dropdown relative w-full shrink-0 sm:w-auto">
      <button
        id={id}
        type="button"
        className="hero-dropdown-trigger"
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
      >
        {icon}
        <span className="inline-flex min-w-0 items-center gap-2.5">
          <span
            className={`truncate text-left text-sm sm:text-[0.9375rem] ${
              selectedOption ? "text-foreground" : "text-foreground/45"
            }`}
          >
            {displayLabel}
          </span>
          <ChevronIcon open={open} />
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="hero-dropdown-menu"
        >
          {options.map((option, index) => {
            const isHighlighted = highlightedIndex === index;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={value === option.value}
                  className={`hero-dropdown-option ${
                    isHighlighted ? "hero-dropdown-option-active" : ""
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
