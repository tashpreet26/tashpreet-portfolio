"use client";

import { useActionState } from "react";
import type { Project, Publication, Research } from "@/lib/types";
import {
  saveResearchDraftAction,
  saveResearchPublishAction,
  type SaveState,
} from "@/lib/actions";
import EditorActions from "./editor-actions";
import IdsPicker from "./ids-picker";
import { Field, TextArea, TextInput } from "./fields";

const initialState: SaveState = { ok: false };

interface ResearchFormProps {
  research: Research | null;
  projects: Project[];
  publications: Publication[];
}

export default function ResearchForm({ research, projects, publications }: ResearchFormProps) {
  const [draftState, draftAction, draftPending] = useActionState(saveResearchDraftAction, initialState);
  const [publishState, publishAction, publishPending] = useActionState(saveResearchPublishAction, initialState);

  const latest = draftState ?? publishState;
  const pending = draftPending || publishPending;

  return (
    <form className="space-y-6">
      <input type="hidden" name="id" value={research?.id ?? ""} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title" required>
          <TextInput name="title" value={research?.title} placeholder="Research area title" required />
        </Field>
        <Field label="Slug" hint="Leave blank to auto-generate from the title.">
          <TextInput name="slug" value={research?.slug} placeholder="research-slug" />
        </Field>
      </div>

      <Field label="The question" hint="The open question driving this research area.">
        <TextArea name="question" value={research?.question} placeholder="What are you trying to understand?" rows={3} />
      </Field>

      <Field label="Why it matters">
        <TextArea name="whyItMatters" value={research?.whyItMatters} placeholder="Why does this question deserve attention?" />
      </Field>

      <Field label="The approach">
        <TextArea name="approach" value={research?.approach} placeholder="How are you exploring it?" />
      </Field>

      <Field label="The work">
        <TextArea name="work" value={research?.work} placeholder="What has been done so far?" />
      </Field>

      <Field label="Results">
        <TextArea name="results" value={research?.results} placeholder="What has been found?" />
      </Field>

      <Field label="Learnings">
        <TextArea name="learnings" value={research?.learnings} placeholder="What did the process teach you?" />
      </Field>

      <Field label="Order" hint="Lower numbers appear first.">
        <TextInput name="order" value={research ? String(research.order) : "999"} />
      </Field>

      <IdsPicker
        name="projectIds"
        label="Connected projects"
        options={projects.map((p) => ({ id: p.id, title: p.title }))}
        initial={research?.projectIds ?? []}
      />

      <IdsPicker
        name="publicationIds"
        label="Connected publications"
        options={publications.map((p) => ({ id: p.id, title: p.title }))}
        initial={research?.publicationIds ?? []}
      />

      <EditorActions
        draftAction={draftAction}
        publishAction={publishAction}
        state={latest}
        isPending={pending}
        published={research?.status === "published"}
        viewBasePath="/research/"
      />
    </form>
  );
}
