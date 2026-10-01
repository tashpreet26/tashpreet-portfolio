"use client";

import { useActionState, useRef, useState } from "react";
import {
  deleteMediaAction,
  uploadMediaAction,
  type UploadState,
} from "@/lib/actions";
import { CopyIcon, FileIcon, TrashIcon, UploadIcon } from "@/components/icons";

const initialUpload: UploadState = { url: null, error: null };

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export default function MediaLibrary({ media }: { media: MediaItem[] }) {
  const [uploadState, uploadAction, uploadPending] = useActionState(uploadMediaAction, initialUpload);
  const [copied, setCopied] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Media library
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        {media.length} {media.length === 1 ? "file" : "files"}
      </h1>

      {/* Upload */}
      <form action={uploadAction} className="mt-8 border border-dashed border-line bg-paper p-6 dark:bg-coal">
        <input ref={fileRef} type="file" name="file" className="hidden" aria-label="Upload file" />
        <div className="flex flex-col items-center gap-4 text-center">
          <UploadIcon className="h-6 w-6 text-muted" />
          <div>
            <p className="text-sm text-ink dark:text-bone">
              Drop files here, or{" "}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="text-accent underline underline-offset-4 dark:text-ember"
              >
                browse
              </button>
            </p>
            <p className="mt-1 text-xs text-muted">
              Images, PDFs, documents, videos — up to 25MB each.
            </p>
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="border border-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-colors hover:bg-ink hover:text-ivory dark:border-bone dark:text-bone dark:hover:bg-bone dark:hover:text-night"
          >
            Choose file
          </button>
          {uploadPending && (
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Uploading…
            </p>
          )}
          {uploadState?.url && (
            <p className="font-mono text-[11px] text-accent dark:text-ember">
              Uploaded — {uploadState.url}
            </p>
          )}
          {uploadState?.error && (
            <p role="alert" className="font-mono text-[11px] text-accent dark:text-ember">
              {uploadState.error}
            </p>
          )}
        </div>
      </form>

      {/* Grid */}
      {media.length === 0 ? (
        <p className="mt-8 border border-dashed border-line p-12 text-center text-sm text-muted">
          The library is empty. Upload your first file above.
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <li key={item.id} className="group bg-paper p-4 dark:bg-coal">
              <div className="flex aspect-square items-center justify-center border border-line bg-ivory dark:bg-night">
                {item.type.startsWith("image/") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <FileIcon className="h-8 w-8 text-muted" />
                )}
              </div>
              <p className="mt-3 truncate text-xs text-ink dark:text-bone" title={item.name}>
                {item.name}
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted">
                {formatSize(item.size)}
              </p>
              <div className="mt-3 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => copyUrl(item.url)}
                  aria-label={`Copy URL of ${item.name}`}
                  className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-accent dark:hover:text-ember"
                >
                  <CopyIcon className="h-3.5 w-3.5" />
                </button>
                <span className="mr-auto font-mono text-[9px] text-muted">
                  {copied === item.url ? "Copied" : ""}
                </span>
                <form action={deleteMediaAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button
                    type="submit"
                    aria-label={`Delete ${item.name}`}
                    onClick={(e) => {
                      if (!window.confirm(`Delete “${item.name}”?`)) e.preventDefault();
                    }}
                    className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-accent dark:hover:text-ember"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
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
