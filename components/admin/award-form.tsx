"use client";

import { useActionState } from "react";
import type { Award } from "@/lib/types";
import {
  saveAwardDraftAction,
  saveAwardPublishAction,
  type SaveState,
} from "@/lib/actions";
import EditorActions from "./editor-actions";
import { Field, TextArea, TextInput } from "./fields";

const initialState: SaveState = { ok: false };

export default function AwardForm({ award }: { award: Award | null }) {
  const [draftState, draftAction, draftPending] = useActionState(saveAwardDraftAction, initialState);
  const [publishState, publishAction, publishPending] = useActionState(saveAwardPublishAction, initialState);

  const latest = draftState ?? publishState;
  const pending = draftPending || publishPending;

  return (
    <form className="space-y-6">
      <input type="hidden" name="id" value={award?.id ?? ""} />

      <Field label="Title" required>
        <TextInput name="title" value={award?.title} placeholder="Award name" required />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Slug" hint="Leave blank to auto-generate from the title.">
          <TextInput name="slug" value={award?.slug} placeholder="award-slug" />
        </Field>
        <Field label="Year">
          <TextInput name="year" value={award?.year} placeholder="2026" />
        </Field>
      </div>

      <Field label="Organization">
        <TextInput name="organization" value={award?.organization} placeholder="Who granted it" />
      </Field>

      <Field label="Description">
        <TextArea name="description" value={award?.description} placeholder="What was recognized, and why?" rows={4} />
      </Field>

      <Field label="Related work" hint="Which project or research area does this connect to?">
        <TextInput name="relatedWork" value={award?.relatedWork} placeholder="e.g. Project — Title" />
      </Field>

      <EditorActions
        draftAction={draftAction}
        publishAction={publishAction}
        state={latest}
        isPending={pending}
        published={award?.status === "published"}
        viewBasePath="/awards"
      />
    </form>
  );
}
