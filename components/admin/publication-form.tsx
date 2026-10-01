"use client";

import { useActionState } from "react";
import type { Project, Publication, Research } from "@/lib/types";
import {
  savePublicationDraftAction,
  savePublicationPublishAction,
  type SaveState,
} from "@/lib/actions";
import EditorActions from "./editor-actions";
import IdsPicker from "./ids-picker";
import { Field, TextArea, TextInput } from "./fields";

const initialState: SaveState = { ok: false };

interface PublicationFormProps {
  publication: Publication | null;
  research: Research[];
  projects: Project[];
}

export default function PublicationForm({ publication, research, projects }: PublicationFormProps) {
  const [draftState, draftAction, draftPending] = useActionState(savePublicationDraftAction, initialState);
  const [publishState, publishAction, publishPending] = useActionState(savePublicationPublishAction, initialState);

  const latest = draftState ?? publishState;
  const pending = draftPending || publishPending;

  return (
    <form className="space-y-6">
      <input type="hidden" name="id" value={publication?.id ?? ""} />

      <Field label="Title" required>
        <TextInput name="title" value={publication?.title} placeholder="Publication title" required />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Slug" hint="Leave blank to auto-generate from the title.">
          <TextInput name="slug" value={publication?.slug} placeholder="publication-slug" />
        </Field>
        <Field label="Year">
          <TextInput name="year" value={publication?.year} placeholder="2026" />
        </Field>
        <Field label="Venue" hint="Journal, conference, or publisher.">
          <TextInput name="venue" value={publication?.venue} placeholder="Journal of…" />
        </Field>
        <Field label="DOI">
          <TextInput name="doi" value={publication?.doi} placeholder="10.1000/xyz123" />
        </Field>
      </div>

      <Field label="Authors" hint="Comma-separated, in order.">
        <TextInput
          name="authors"
          value={publication?.authors.join(", ")}
          placeholder="Tashpreet Kaur, Co-Author Name"
        />
      </Field>

      <Field label="Abstract">
        <TextArea name="abstract" value={publication?.abstract} placeholder="The abstract of the publication…" rows={6} />
      </Field>

      <IdsPicker
        name="researchIds"
        label="Connected research areas"
        options={research.map((r) => ({ id: r.id, title: r.title }))}
        initial={publication?.researchIds ?? []}
      />

      <IdsPicker
        name="projectIds"
        label="Connected projects"
        options={projects.map((p) => ({ id: p.id, title: p.title }))}
        initial={publication?.projectIds ?? []}
      />

      <EditorActions
        draftAction={draftAction}
        publishAction={publishAction}
        state={latest}
        isPending={pending}
        published={publication?.status === "published"}
        viewBasePath="/publications/"
      />
    </form>
  );
}
