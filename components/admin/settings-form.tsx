"use client";

import { useActionState, useState } from "react";
import type { Settings } from "@/lib/types";
import {
  changePasswordAction,
  saveSettingsAction,
  type SaveState,
} from "@/lib/actions";
import LinksEditor from "./links-editor";
import { Field, TextArea, TextInput } from "./fields";

const initialSave: SaveState = { ok: false };
const initialPassword: SaveState = { ok: false };

export default function SettingsForm({ settings }: { settings: Settings }) {
  const [saveState, saveAction, savePending] = useActionState(saveSettingsAction, initialSave);
  const [passwordState, passwordAction, passwordPending] = useActionState(
    changePasswordAction,
    initialPassword
  );

  return (
    <div className="space-y-16">
      {/* Site settings */}
      <form className="space-y-6">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.35em] text-soft dark:text-ash">
          Site settings
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Site title">
            <TextInput name="siteTitle" value={settings.siteTitle} />
          </Field>
          <Field label="Tagline">
            <TextInput name="tagline" value={settings.tagline} placeholder="The Archive of Inquiry" />
          </Field>
          <Field label="Email" hint="Shown on the contact page and footer. Leave hidden if blank.">
            <TextInput name="email" value={settings.email} placeholder="hello@example.com" />
          </Field>
          <Field label="Location">
            <TextInput name="location" value={settings.location} placeholder="Bhopal, India" />
          </Field>
        </div>

        <Field label="Bio" hint="Shown on the About page and used as the default profile text.">
          <TextArea name="bio" value={settings.bio} rows={5} />
        </Field>

        <Field label="Portrait" hint="Paste an image URL from the media library.">
          <TextInput name="portrait" value={settings.portrait} placeholder="/uploads/…" />
        </Field>

        <Field label="Skills" hint="Comma-separated. Shown as an editorial index on the About page.">
          <TextInput name="skills" value={settings.skills.join(", ")} placeholder="Research, Data Analysis, Python" />
        </Field>

        <Field label="Social links">
          <LinksEditor initial={settings.socials} />
        </Field>

        <div className="flex items-center gap-4 border border-line bg-paper p-4 dark:bg-coal">
          <button
            type="submit"
            disabled={savePending}
            className="border border-ink bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory transition-opacity hover:opacity-85 disabled:opacity-50 dark:border-bone dark:bg-bone dark:text-night"
          >
            {savePending ? "Saving…" : "Save settings"}
          </button>
          {saveState?.ok && (
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent dark:text-ember">
              Saved
            </span>
          )}
          {saveState?.error && (
            <span role="alert" className="font-mono text-[11px] text-accent dark:text-ember">
              {saveState.error}
            </span>
          )}
        </div>
      </form>

      {/* Password */}
      <form className="space-y-6">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.35em] text-soft dark:text-ash">
          Change password
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Field label="Current password">
            <input
              type="password"
              name="currentPassword"
              required
              autoComplete="current-password"
              className="w-full border border-line bg-ivory px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none dark:bg-night dark:text-bone dark:focus:border-ember"
            />
          </Field>
          <Field label="New password" hint="At least 8 characters.">
            <input
              type="password"
              name="newPassword"
              required
              autoComplete="new-password"
              className="w-full border border-line bg-ivory px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none dark:bg-night dark:text-bone dark:focus:border-ember"
            />
          </Field>
          <Field label="Confirm new password">
            <input
              type="password"
              name="confirmPassword"
              required
              autoComplete="new-password"
              className="w-full border border-line bg-ivory px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none dark:bg-night dark:text-bone dark:focus:border-ember"
            />
          </Field>
        </div>
        <div className="flex items-center gap-4 border border-line bg-paper p-4 dark:bg-coal">
          <button
            type="submit"
            disabled={passwordPending}
            className="border border-ink bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ivory transition-opacity hover:opacity-85 disabled:opacity-50 dark:border-bone dark:bg-bone dark:text-night"
          >
            {passwordPending ? "Changing…" : "Change password"}
          </button>
          {passwordState?.ok && (
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent dark:text-ember">
              Password updated
            </span>
          )}
          {passwordState?.error && (
            <span role="alert" className="font-mono text-[11px] text-accent dark:text-ember">
              {passwordState.error}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
