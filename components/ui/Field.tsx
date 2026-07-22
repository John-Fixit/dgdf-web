"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldLabelClass =
  "mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary/70";

const fieldShellClass =
  "group flex w-full items-center gap-3 rounded-xl border border-border/80 bg-muted/40 px-4 transition-colors duration-200 focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_0_0_3px_hsla(210,56%,23%,0.12)]";

const fieldControlClass =
  "w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50";

export interface FieldInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  startContent?: React.ReactNode;
  isRequired?: boolean;
}

/**
 * Bordered input with outside label and optional leading icon.
 */
export const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  (
    { className, label, id, startContent, isRequired, ...props },
    ref
  ) => {
    const inputId = id ?? props.name;

    return (
      <div className={cn("w-full", className)}>
        <label htmlFor={inputId} className={fieldLabelClass}>
          {label}
          {isRequired ? (
            <span className="ml-0.5 text-destructive" aria-hidden>
              *
            </span>
          ) : null}
        </label>
        <div className={cn(fieldShellClass, "h-14")}>
          {startContent ? (
            <span className="shrink-0 text-primary/45" aria-hidden>
              {startContent}
            </span>
          ) : null}
          <input
            id={inputId}
            ref={ref}
            required={isRequired}
            className={fieldControlClass}
            {...props}
          />
        </div>
      </div>
    );
  }
);
FieldInput.displayName = "FieldInput";

export interface FieldTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  startContent?: React.ReactNode;
  isRequired?: boolean;
}

/**
 * Bordered textarea with outside label and optional leading icon.
 */
export const FieldTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FieldTextareaProps
>(({ className, label, id, startContent, isRequired, ...props }, ref) => {
  const inputId = id ?? props.name;

  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={inputId} className={fieldLabelClass}>
        {label}
        {isRequired ? (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      <div className={cn(fieldShellClass, "items-start py-3.5")}>
        {startContent ? (
          <span className="mt-0.5 shrink-0 text-primary/45" aria-hidden>
            {startContent}
          </span>
        ) : null}
        <textarea
          id={inputId}
          ref={ref}
          required={isRequired}
          className={cn(fieldControlClass, "min-h-[132px] resize-none")}
          {...props}
        />
      </div>
    </div>
  );
});
FieldTextarea.displayName = "FieldTextarea";

export interface FieldSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  isRequired?: boolean;
  options: string[];
}

/**
 * Bordered select with outside label.
 */
export const FieldSelect = React.forwardRef<
  HTMLSelectElement,
  FieldSelectProps
>(({ className, label, id, isRequired, options, ...props }, ref) => {
  const inputId = id ?? props.name;

  return (
    <div className={cn("w-full", className)}>
      <label htmlFor={inputId} className={fieldLabelClass}>
        {label}
        {isRequired ? (
          <span className="ml-0.5 text-destructive" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      <div className={cn(fieldShellClass, "relative h-14 pr-3")}>
        <select
          id={inputId}
          ref={ref}
          required={isRequired}
          className={cn(
            fieldControlClass,
            "h-full appearance-none cursor-pointer pr-8"
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-4 h-4 w-4 text-primary/45"
          aria-hidden
        />
      </div>
    </div>
  );
});
FieldSelect.displayName = "FieldSelect";
