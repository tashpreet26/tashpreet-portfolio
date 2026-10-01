import Link from "next/link";
import { StatusBadge } from "./fields";
import { DuplicateIcon, EditIcon, EyeIcon, PlusIcon, TrashIcon } from "@/components/icons";

export interface AdminListItem {
  id: string;
  title: string;
  meta: string;
  status: "draft" | "published";
  updatedAt: string;
  previewHref?: string;
}

interface ItemListProps {
  title: string;
  count: number;
  newHref: string;
  newLabel: string;
  editHref: (id: string) => string;
  duplicateAction: (formData: FormData) => void;
  deleteAction: (formData: FormData) => void;
  items: AdminListItem[];
}

export default function ItemList({
  title,
  count,
  newHref,
  newLabel,
  editHref,
  duplicateAction,
  deleteAction,
  items,
}: ItemListProps) {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
            {title}
          </p>
          <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
            {count} {count === 1 ? "entry" : "entries"}
          </h1>
        </div>
        <Link
          href={newHref}
          className="inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory transition-opacity hover:opacity-85 dark:border-bone dark:bg-bone dark:text-night"
        >
          <PlusIcon className="h-3.5 w-3.5" /> {newLabel}
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-10 border border-dashed border-line p-12 text-center text-sm text-muted">
          Nothing here yet. Create the first entry to begin.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border border-line bg-paper dark:bg-coal">
          {items.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center gap-3 px-4 py-3.5">
              <div className="min-w-0 flex-1">
                <Link
                  href={editHref(item.id)}
                  className="block truncate text-sm font-medium text-ink hover:text-accent dark:text-bone dark:hover:text-ember"
                >
                  {item.title}
                </Link>
                <p className="mt-0.5 truncate font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                  {item.meta} — updated {new Date(item.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <StatusBadge status={item.status} />
              <div className="flex items-center gap-1">
                {item.previewHref && (
                  <Link
                    href={item.previewHref}
                    aria-label={`Preview ${item.title}`}
                    className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-accent dark:hover:text-ember"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Link>
                )}
                <Link
                  href={editHref(item.id)}
                  aria-label={`Edit ${item.title}`}
                  className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-accent dark:hover:text-ember"
                >
                  <EditIcon className="h-4 w-4" />
                </Link>
                <form action={duplicateAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    aria-label={`Duplicate ${item.title}`}
                    className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-accent dark:hover:text-ember"
                  >
                    <DuplicateIcon className="h-4 w-4" />
                  </button>
                </form>
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    aria-label={`Delete ${item.title}`}
                    onClick={(e) => {
                      if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) {
                        e.preventDefault();
                      }
                    }}
                    className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-accent dark:hover:text-ember"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
