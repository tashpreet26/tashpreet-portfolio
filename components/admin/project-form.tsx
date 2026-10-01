"use client";

import { useActionState } from "react";
import type { MediaItem, Project, Publication } from "@/lib/types";
import {
  saveProjectDraftAction,
  saveProjectPublishAction,
  type SaveState,
} from "@/lib/actions";
import EditorActions from "./editor-actions";
import LinksEditor from "./links-editor";
import IdsPicker from "./ids-picker";
import { Field, TextArea, TextInput } from "./fields";

const initialState: SaveState = { ok: false };

interface ProjectFormProps {
  project: Project | null;
  publications: Publication[];
  media: MediaItem[];
}

export default function ProjectForm({ project, publications, media }: ProjectFormProps) {
  const [draftState, draftAction, draftPending] = useActionState(saveProjectDraftAction, initialState);
  const [publishState, publishAction, publishPending] = useActionState(saveProjectPublishAction, initialState);

  const latest = draftState ?? publishState;
  const pending = draftPending || publishPending;
  const mediaImages = media.filter((m) => m.type.startsWith("image/"));

  return (
    <form className="space-y-6">
      <input type="hidden" name="id" value={project?.id ?? ""} />

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title" required>
          <TextInput name="title" value={project?.title} placeholder="Project title" required />
        </Field>
        <Field label="Slug" hint="Leave blank to auto-generate from the title.">
          <TextInput name="slug" value={project?.slug} placeholder="project-slug" />
        </Field>
        <Field label="Year">
          <TextInput name="year" value={project?.year} placeholder="2026" />
        </Field>
        <Field label="Role">
          <TextInput name="role" value={project?.role} placeholder="Role on this project" />
        </Field>
        <Field label="Research area">
          <TextInput name="researchArea" value={project?.researchArea} placeholder="e.g. Machine Learning" />
        </Field>
        <Field label="Order" hint="Lower numbers appear first.">
          <TextInput name="order" value={project ? String(project.order) : "999"} />
        </Field>
      </div>

      <Field label="Summary" hint="One or two sentences shown in lists and at the top of the detail page.">
        <TextArea name="summary" value={project?.summary} placeholder="What is this project about?" rows={3} />
      </Field>

      <Field label="The problem">
        <TextArea name="problem" value={project?.problem} placeholder="What problem does this project address?" />
      </Field>

      <Field label="Method">
        <TextArea name="method" value={project?.method} placeholder="How was it approached?" />
      </Field>

      <Field label="Results">
        <TextArea name="results" value={project?.results} placeholder="What did it find or build?" />
      </Field>

      <Field label="Learnings">
        <TextArea name="learnings" value={project?.learnings} placeholder="What was learned along the way?" />
      </Field>

      <Field label="Technologies" hint="Comma-separated.">
        <TextInput
          name="technologies"
          value={project?.technologies.join(", ")}
          placeholder="Python, React, TensorFlow"
        />
      </Field>

      <Field label="Image" hint="Paste a URL from the media library, or upload one first.">
        <TextInput name="image" value={project?.image} placeholder="/uploads/…" list="media-images" />
        {mediaImages.length > 0 && (
          <datalist id="media-images">
            {mediaImages.map((m) => (
              <option key={m.id} value={m.url} />
            ))}
          </datalist>
        )}
      </Field>

      <Field label="Links">
        <LinksEditor initial={project?.links ?? []} />
      </Field>

      <IdsPicker
        name="publicationIds"
        label="Connected publications"
        options={publications.map((p) => ({ id: p.id, title: p.title }))}
        initial={project?.publicationIds ?? []}
      />

      <EditorActions
        draftAction={draftAction}
        publishAction={publishAction}
        state={latest}
        isPending={pending}
        published={project?.status === "published"}
        viewBasePath="/projects/"
      />
    </form>
  );
}
