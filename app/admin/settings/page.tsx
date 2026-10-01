import type { Metadata } from "next";
import SettingsForm from "@/components/admin/settings-form";
import { getSettings } from "@/lib/db";

export const metadata: Metadata = { title: "Settings — Admin", robots: { index: false } };

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent dark:text-ember">
        Settings
      </p>
      <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-ink dark:text-bone">
        Archive settings
      </h1>
      <p className="mt-2 text-sm text-muted">
        These values flow into the public site — the footer, contact page, about page, and
        page metadata.
      </p>
      <div className="mt-10">
        <SettingsForm settings={settings} />
      </div>
    </div>
  );
}
