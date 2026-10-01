"use client";

import { useActionState } from "react";
import type { Education } from "@/lib/types";
import {
  saveEducationDraftAction,
  saveEducationPublishAction,
  type SaveState,
} from "@/lib/actions";
import EditorActions from "./editor-actions";
import { Field, TextArea, TextInput } from "./fields";

const initialState: SaveState = { ok: false };

export default function EducationForm({ education }: { education: Education | null }) {
  const [draftState, draftAction, draftPending] = useActionState(saveEducationDraftAction, initialState);
  const [publishState, publishAction, publishPending] = useActionState(saveEducationPublishAction, initialState);

  const latest = draftState ?? publishState;
  const pending = draftPending || publishPending;

  return (
    <form className="space-y-6">
      <input type="hidden" name="id" value={education?.id ?? ""} />

      <Field label="Title" required hint="Degree or certification.">
        <TextInput name="title" value={education?.title} placeholder="B.Sc. Computer Science" required />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Slug" hint="Leave blank to auto-generate from the title.">
          <TextInput name="slug" value={education?.slug} placeholder="education-slug" />
        </Field>
        <Field label="Period" hint="e.g. 2022 — 2026">
          <TextInput name="period" value={education?.period} placeholder="2022 — 2026" />
        </Field>
      </div>

      <Field label="Institution">
        <TextInput name="institution" value={education?.institution} placeholder="University or institution" />
      </Field>

      <Field label="Description">
        <TextArea name="description" value={education?.description} placeholder="Focus, achievements, relevant coursework…" rows={4} />
      </Field>

      <Field label="Order" hint="Lower numbers appear first.">
        <TextInput name="order" value={education ? String(education.order) : "999"} />
      </Field>

      <EditorActions
        draftAction={draftAction}
        publishAction={publishAction}
        state={latest}
        isPending={pending}
        published={education?.status === "published"}
        viewBasePath="/education"
      />
    </form>
  );
}
