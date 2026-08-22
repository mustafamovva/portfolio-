"use client";

import Image from "next/image";
import {
  billOfMaterials,
  contactLinks,
  generalNotes,
  measures,
  revisions,
  type Project,
} from "@/lib/data";
import Axonometric from "./Axonometric";
import ReferenceSolid from "./ReferenceSolid";
import { Callout, Dimension, NoteMark, Redline } from "./primitives";

/* Shared body padding for every sheet's drawing area. */
const PAD = "px-[clamp(16px,3.4vw,54px)] py-[clamp(16px,3vh,40px)]";

/* ================================================================== *
 * A-101 · GENERAL ARRANGEMENT
 * ================================================================== */
export function GeneralArrangement() {
  return (
    <div className={`flex min-h-0 flex-1 flex-col ${PAD}`}>
      <div className="grid min-h-0 flex-1 items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <span className="lettering inline-flex items-center gap-2.5 border border-ink-3 px-2.5 py-1.5 text-ink-2">
            <span
              aria-hidden
              className="h-1.5 w-1.5 animate-blink rounded-full bg-redline"
            />
            Available for select projects
          </span>

          <h1 className="mt-6 font-display text-[clamp(30px,4.6vw,58px)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink [text-wrap:balance]">
            I build complete
            <br />
            web apps — from
            <br />
            <span className="text-redline">code to production.</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-[clamp(14px,1.15vw,16.5px)] leading-[1.65] text-ink-2">
            Full-stack developer and team lead. I take a product from the
            database schema through the API to the interface, and then all the
            way to something running in front of real users.
          </p>

          <div className="lettering mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-ink-3">
            <span className="font-medium text-ink">Mustafa Mahmoud</span>
            <span aria-hidden className="h-3 w-px bg-ink-4" />
            <span>Team Lead @ Eaalim</span>
            <span aria-hidden className="h-3 w-px bg-ink-4" />
            <span>Giza, Egypt</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={`mailto:${contactLinks.email}`}
              className="lettering group inline-flex items-center gap-2.5 border border-ink bg-ink px-5 py-3 font-medium text-paper-hi no-underline transition-colors duration-200 hover:bg-redline hover:border-redline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redline"
            >
              Get in touch
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href={contactLinks.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="lettering inline-flex items-center gap-2.5 border border-ink-3 px-5 py-3 font-medium text-ink no-underline transition-colors duration-200 hover:border-ink hover:bg-paper-hi focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redline"
            >
              Résumé ↗
            </a>
          </div>
        </div>

        {/* Shown at every size — it is line-art SVG, so it costs a phone
            almost nothing and it is the one image that states the work. */}
        <div className="relative flex h-full min-h-[200px] items-center justify-center lg:min-h-[240px]">
          <Axonometric />
        </div>
      </div>

      {/* The quantities, measured the way a drawing measures anything */}
      <div className="mt-6 shrink-0 border-t border-ink-4 pt-6">
        <div className="flex flex-wrap gap-x-10 gap-y-6">
          {measures.map((m) => (
            <Dimension key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </div>

      <div className="mt-6 hidden shrink-0 justify-end lg:flex">
        <Callout mark="1" sheet="A-201" />
      </div>
    </div>
  );
}

/* ================================================================== *
 * A-201 · GENERAL NOTES
 * ================================================================== */
export function GeneralNotes() {
  return (
    <div className={`flex min-h-0 flex-1 flex-col ${PAD}`}>
      <div className="grid min-h-0 flex-1 items-center gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        {/* Orthographic reference view — the counterpart to the pictorial
            drawing on A-101, carrying the hidden-line convention. */}
        <div className="relative order-last lg:order-none">
          <div className="relative border border-ink-3 bg-paper-hi p-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-sunk/60 lg:aspect-[4/5]">
              <ReferenceSolid className="h-full w-full" />
            </div>
            <div className="lettering mt-2 flex items-center justify-between text-ink-3">
              <span>Projection — orthographic</span>
              <span className="text-redline">Hidden edges dashed</span>
            </div>
          </div>
          {/* extension + dimension along the left edge */}
          <div aria-hidden className="absolute -left-6 bottom-0 top-0 flex flex-col items-center">
            <span className="h-px w-3 bg-ink-3" />
            <span className="w-px flex-1 bg-ink-3" />
            <span className="h-px w-3 bg-ink-3" />
          </div>
        </div>

        <div>
          <h2 className="lettering mb-6 border-b border-ink-4 pb-3 font-medium text-ink">
            General notes
          </h2>

          <ol className="flex list-none flex-col gap-[clamp(10px,1.6vh,18px)] p-0">
            {generalNotes.map((note, i) => (
              <li key={note} className="flex gap-3.5">
                <NoteMark n={String(i + 1).padStart(2, "0")} />
                <p className="m-0 max-w-[62ch] text-[clamp(13.5px,1.05vw,15.5px)] leading-[1.62] text-ink-2">
                  {note}
                </p>
              </li>
            ))}
          </ol>

          <Redline className="mt-7">
            promoted 15 months in — note 02
          </Redline>
        </div>
      </div>

      <div className="mt-4 hidden shrink-0 justify-end lg:flex">
        <Callout mark="2" sheet="A-301" />
      </div>
    </div>
  );
}

/* ================================================================== *
 * A-301 · BILL OF MATERIALS
 * ================================================================== */
export function BillOfMaterials() {
  return (
    <div className={`flex min-h-0 flex-1 flex-col ${PAD}`}>
      <div className="mb-5 flex shrink-0 flex-wrap items-end justify-between gap-4 border-b border-ink-4 pb-3">
        <h2 className="lettering m-0 font-medium text-ink">
          Bill of materials
        </h2>
        <span className="lettering text-ink-3">
          {billOfMaterials.length} items · in daily use
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="hatch border-y border-ink-3">
              <th scope="col" className="lettering px-2 py-2 font-medium text-ink sm:px-3">
                Item
              </th>
              <th scope="col" className="lettering px-2 py-2 font-medium text-ink sm:px-3">
                Qty
              </th>
              <th scope="col" className="lettering px-2 py-2 font-medium text-ink sm:px-3">
                Description
              </th>
              <th
                scope="col"
                className="lettering hidden px-2 py-2 font-medium text-ink sm:table-cell sm:px-3"
              >
                Specification
              </th>
            </tr>
          </thead>
          <tbody>
            {billOfMaterials.map((part, i) => (
              <tr
                key={part.item}
                className={`border-b border-ink-4/60 ${
                  i % 2 ? "bg-paper-hi/50" : ""
                }`}
              >
                <td className="lettering px-2 py-[clamp(5px,0.9vh,10px)] tabular-nums text-ink-3 sm:px-3">
                  {part.item}
                </td>
                <td className="lettering px-2 py-[clamp(5px,0.9vh,10px)] tabular-nums text-ink-3 sm:px-3">
                  {part.qty}
                </td>
                <td className="px-2 py-[clamp(5px,0.9vh,10px)] font-display text-[clamp(13px,1vw,15px)] font-semibold text-ink sm:px-3">
                  {part.name}
                </td>
                <td className="lettering hidden px-2 py-[clamp(5px,0.9vh,10px)] normal-case tracking-[0.04em] text-ink-2 sm:table-cell sm:px-3">
                  {part.spec}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 hidden shrink-0 items-end justify-between gap-6 lg:flex">
        <Redline>every item below is in a shipped product</Redline>
        <Callout mark="3" sheet="A-401" />
      </div>
    </div>
  );
}

/* ================================================================== *
 * A-401 … A-404 · DETAIL DRAWINGS  (printed as blueprints)
 * ================================================================== */
export function DetailSheet({
  project,
  next,
}: {
  project: Project;
  next?: string;
}) {
  return (
    <div className={`flex min-h-0 flex-1 flex-col ${PAD}`}>
      <div className="grid min-h-0 flex-1 items-center gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* The drawing itself */}
        <div className="relative">
          <div className="border border-blueprint-3/70 bg-blueprint-deep p-1.5">
            <div className="flex items-center justify-between border-b border-blueprint-3/50 px-2 py-1.5">
              <span className="lettering text-blueprint-2">
                {project.domain}
              </span>
              <span className="lettering text-blueprint-2">SCALE 1:1</span>
            </div>
            {/* Matches the screenshots' own 1.94 ratio, so a real screen is
                shown whole rather than cropped to fit a frame. */}
            <div className="relative aspect-[1.94] overflow-hidden">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.alt ?? project.title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 700px"
                  /* Cooled just enough to sit on the blueprint, not so much
                     that the product stops being legible — the screenshot is
                     the proof, so washing it out defeats the point. */
                  className="object-cover object-top contrast-[1.03] saturate-[0.88]"
                />
              ) : null}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-blueprint/10 mix-blend-multiply"
              />
            </div>
          </div>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lettering group mt-3 inline-flex items-center gap-2.5 border border-blueprint-line px-4 py-2.5 font-medium text-blueprint-line no-underline transition-colors duration-200 hover:bg-blueprint-line hover:text-blueprint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-line"
            >
              Open {project.domain}
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          ) : null}
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="lettering ml-3 mt-3 inline-flex items-center gap-2 border border-blueprint-3 px-4 py-2.5 text-blueprint-2 no-underline transition-colors duration-200 hover:border-blueprint-line hover:text-blueprint-line focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blueprint-line"
            >
              Source ↗
            </a>
          ) : null}
        </div>

        {/* The annotation column */}
        <div>
          <div className="flex items-center gap-3.5">
            <span className="lettering flex h-11 w-11 items-center justify-center rounded-full border border-blueprint-line font-medium text-blueprint-line">
              {project.mark}
            </span>
            <div>
              <div className="lettering text-blueprint-2">
                Detail {project.mark}
              </div>
              <div className="lettering text-blueprint-3">{project.period}</div>
            </div>
          </div>

          <h2 className="mt-5 font-display text-[clamp(22px,2.6vw,34px)] font-extrabold uppercase leading-[1.02] tracking-[-0.03em] text-blueprint-line">
            {project.title}
          </h2>

          {project.highlight ? (
            <p className="lettering mt-2.5 normal-case tracking-[0.06em] text-blueprint-2">
              {project.highlight}
            </p>
          ) : null}

          <p className="mt-4 max-w-[44ch] text-[clamp(13px,1vw,15px)] leading-[1.62] text-blueprint-2">
            {project.desc}
          </p>

          <ul className="mt-5 flex list-none flex-col gap-2.5 p-0">
            {project.notes.map((note, i) => (
              <li key={note} className="flex gap-3">
                <span
                  aria-hidden
                  className="lettering mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center border border-blueprint-3 text-blueprint-2"
                >
                  {i + 1}
                </span>
                <span className="max-w-[42ch] text-[clamp(12.5px,0.95vw,14px)] leading-[1.55] text-blueprint-2">
                  {note}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="lettering border border-blueprint-3/70 px-2 py-1 text-blueprint-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {next ? (
        <div className="mt-4 hidden shrink-0 justify-end lg:flex">
          <Callout mark={project.mark} sheet={next} invert />
        </div>
      ) : null}
    </div>
  );
}

/* ================================================================== *
 * A-501 · REVISION HISTORY
 * ================================================================== */
export function RevisionHistory() {
  return (
    <div className={`flex min-h-0 flex-1 flex-col ${PAD}`}>
      <div className="mb-5 flex shrink-0 flex-wrap items-end justify-between gap-4 border-b border-ink-4 pb-3">
        <h2 className="lettering m-0 font-medium text-ink">Revision history</h2>
        <span className="lettering text-ink-3">
          A career is a revision history
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="hatch border-y border-ink-3">
              <th scope="col" className="lettering px-2 py-2 font-medium text-ink sm:px-3">
                Rev
              </th>
              <th scope="col" className="lettering px-2 py-2 font-medium text-ink sm:px-3">
                Date
              </th>
              <th scope="col" className="lettering px-2 py-2 font-medium text-ink sm:px-3">
                Description
              </th>
              <th
                scope="col"
                className="lettering hidden px-2 py-2 font-medium text-ink sm:table-cell sm:px-3"
              >
                By
              </th>
            </tr>
          </thead>
          <tbody>
            {revisions.map((r, i) => {
              const latest = i === revisions.length - 1;
              return (
                <tr
                  key={r.rev}
                  className={`border-b border-ink-4/60 ${
                    latest ? "bg-redline/[0.07]" : ""
                  }`}
                >
                  <td className="lettering px-2 py-[clamp(6px,1.1vh,13px)] align-top tabular-nums sm:px-3">
                    <span
                      className={
                        latest ? "font-medium text-redline" : "text-ink-3"
                      }
                    >
                      {r.rev}
                    </span>
                  </td>
                  <td className="lettering whitespace-nowrap px-2 py-[clamp(6px,1.1vh,13px)] align-top text-ink-2 sm:px-3">
                    {r.date}
                  </td>
                  <td className="px-2 py-[clamp(6px,1.1vh,13px)] align-top text-[clamp(13px,1vw,15px)] leading-[1.55] text-ink-2 sm:px-3">
                    {r.description}
                  </td>
                  <td className="lettering hidden px-2 py-[clamp(6px,1.1vh,13px)] align-top text-ink-3 sm:table-cell sm:px-3">
                    {r.by}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 hidden shrink-0 items-end justify-between gap-6 lg:flex">
        <Redline>rev 05 is current — the set is still being drawn</Redline>
        <Callout mark="5" sheet="A-601" />
      </div>
    </div>
  );
}

/* ================================================================== *
 * A-601 · ISSUE & APPROVAL
 * ================================================================== */
export function IssueApproval() {
  const rows = [
    { label: "Email", value: contactLinks.email, href: `mailto:${contactLinks.email}` },
    { label: "LinkedIn", value: "linkedin.com/in/mustafa-movva", href: contactLinks.linkedin },
    { label: "GitHub", value: "github.com/mustafamovva", href: contactLinks.github },
    { label: "Résumé", value: "Mustafa-Mahmoud-CV.pdf", href: contactLinks.resume },
  ];

  return (
    <div className={`flex min-h-0 flex-1 flex-col justify-center ${PAD}`}>
      <div className="grid items-center gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <h2 className="lettering mb-5 border-b border-ink-4 pb-3 font-medium text-ink">
            Issue &amp; approval
          </h2>
          <p className="m-0 max-w-[24ch] font-display text-[clamp(26px,3.6vw,46px)] font-extrabold uppercase leading-[0.98] tracking-[-0.035em] text-ink [text-wrap:balance]">
            Have something to build?
            <span className="block text-redline">Let&apos;s issue it.</span>
          </p>
          <p className="mt-5 max-w-[44ch] text-[clamp(13.5px,1.05vw,15.5px)] leading-[1.62] text-ink-2">
            Open to freelance projects and full-time roles, remote or in Egypt.
            Send a line and you will hear back quickly.
          </p>

          {/* An approval stamp, which is how a drawing gets released */}
          <div className="mt-8 inline-block -rotate-[7deg] border-[2.5px] border-redline px-5 py-2.5">
            <div className="lettering font-medium text-redline">
              Available for work
            </div>
            <div className="lettering mt-0.5 text-redline/75">
              Aug 2026 · Giza, EG · remote
            </div>
          </div>
        </div>

        <dl className="m-0 grid gap-0 border border-ink-4">
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[6.5rem_1fr] items-center ${
                i ? "border-t border-ink-4" : ""
              }`}
            >
              <dt className="lettering border-r border-ink-4 px-3 py-3.5 text-ink-3">
                {row.label}
              </dt>
              <dd className="m-0 px-3 py-3.5">
                <a
                  href={row.href}
                  target={row.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="lettering group inline-flex items-center gap-2 normal-case tracking-[0.06em] text-ink no-underline transition-colors duration-200 hover:text-redline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-redline"
                >
                  {row.value}
                  <span
                    aria-hidden
                    className="text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-redline"
                  >
                    ↗
                  </span>
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="lettering mt-10 flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-ink-4 pt-4 text-ink-3">
        <span>Drawn by M. Mahmoud · Next.js · TypeScript</span>
        <span>End of set · 09 of 09</span>
      </div>
    </div>
  );
}
