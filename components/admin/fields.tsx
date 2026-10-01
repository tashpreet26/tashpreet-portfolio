import { cloneElement, isValidElement, type ReactNode } from "react";

export function Field({
  label,
  children,
  hint,
  required = false,
  className = "",
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="font-mono text-[10px] uppercase tracking-[0.25em] text-soft dark:text-ash">
        {label}
        {required && <span className="ml-1 text-accent dark:text-ember">*</span>}
      </label>
      <div className="mt-2">
        {isValidElement(children)
          ? cloneElement(children as React.ReactElement<{ required?: boolean }>, {
              ...(required ? { required: true } : {}),
            })
          : children}
      </div>
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

const inputClasses =
  "w-full border border-line bg-ivory px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/50 focus:border-accent focus:outline-none dark:bg-night dark:text-bone dark:focus:border-ember";

export function TextInput({
  name,
  value,
  placeholder,
  required,
  list,
}: {
  name: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  list?: string;
}) {
  return (
    <input
      type="text"
      name={name}
      defaultValue={value}
      placeholder={placeholder}
      required={required}
      list={list}
      className={inputClasses}
    />
  );
}

export function TextArea({
  name,
  value,
  placeholder,
  rows = 5,
  required,
}: {
  name: string;
  value?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}) {
  return (
    <textarea
      name={name}
      defaultValue={value}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className={`${inputClasses} resize-y leading-relaxed`}
    />
  );
}

export function Select({
  name,
  value,
  options,
  required,
}: {
  name: string;
  value?: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <select name={name} defaultValue={value ?? ""} required={required} className={inputClasses}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function StatusBadge({ status }: { status: "draft" | "published" }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] ${
        status === "published"
          ? "border-accent/50 text-accent dark:border-ember/50 dark:text-ember"
          : "border-line text-muted"
      }`}
    >
      {status}
    </span>
  );
}
