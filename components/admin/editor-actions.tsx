"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { SaveState } from "@/lib/actions";
import { EyeIcon } from "@/components/icons";

type FormActionProp = (formData: FormData) => void;

interface EditorActionsProps {
  draftAction: FormActionProp;
  publishAction: FormActionProp;
  state: SaveState;
  isPending: boolean;
  published: boolean;
  viewBasePath?: string;
}

export default function EditorActions({
  draftAction,
  publishAction,
  state,
  isPending,
  published,
  viewBasePath,
}: EditorActionsProps) {
  const viewHref =
    published && state?.slug && viewBasePath ? `${viewBasePath}${state.slug}` : undefined;
  return (
    <div className="flex flex-wrap items-center gap-3 border border-line bg-paper p-4 dark:bg-coal">
      <button
        type="submit"
        formAction={draftAction}
        disabled={isPending}
        className="border border-line px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-soft transition-colors hover:border-ink hover:text-ink disabled:opacity-50 dark:text-ash dark:hover:border-bone dark:hover:text-bone"
      >
        Save draft
      </button>
      <button
        type="submit"
        formAction={publishAction}
        disabled={isPending}
        className="border border-ink bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory transition-opacity hover:opacity-85 disabled:opacity-50 dark:border-bone dark:bg-bone dark:text-night"
      >
        {isPending ? "Saving…" : published ? "Save & keep published" : "Publish"}
      </button>
      {state?.ok && (
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent dark:text-ember">
          Saved
          {viewHref && published && (
            <>
              {" — "}
              <Link href={viewHref} className="underline underline-offset-4">
                <EyeIcon className="mr-1 inline h-3.5 w-3.5" />
                View live
              </Link>
            </>
          )}
        </span>
      )}
      {state?.error && (
        <span role="alert" className="font-mono text-[11px] text-accent dark:text-ember">
          {state.error}
        </span>
      )}
    </div>
  );
}
