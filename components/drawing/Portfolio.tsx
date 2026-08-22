"use client";

import { projects } from "@/lib/data";
import DrawingSet, { type Plate } from "./DrawingSet";
import {
  BillOfMaterials,
  DetailSheet,
  GeneralArrangement,
  GeneralNotes,
  IssueApproval,
  RevisionHistory,
} from "./sheets";

/**
 * The drawing set, in issue order.
 *
 * Sheet numbers follow the convention a real set uses — the hundreds digit is
 * the series, so every detail drawing lives in the 400s — which is why the
 * projects read as one group without needing a heading to say so.
 */
const DETAIL_CODES = ["A-401", "A-402", "A-403", "A-404"];

export default function Portfolio() {
  const plates: Plate[] = [
    {
      code: "A-101",
      title: "General arrangement",
      render: () => <GeneralArrangement />,
    },
    {
      code: "A-201",
      title: "General notes",
      render: () => <GeneralNotes />,
    },
    {
      code: "A-301",
      title: "Bill of materials",
      render: () => <BillOfMaterials />,
    },
    ...projects.map((project, i) => ({
      code: DETAIL_CODES[i],
      title: `Detail ${project.mark} — ${project.title}`,
      invert: true,
      render: () => (
        <DetailSheet
          project={project}
          next={DETAIL_CODES[i + 1] ?? "A-501"}
        />
      ),
    })),
    {
      code: "A-501",
      title: "Revision history",
      render: () => <RevisionHistory />,
    },
    {
      code: "A-601",
      title: "Issue & approval",
      render: () => <IssueApproval />,
    },
  ];

  return <DrawingSet plates={plates} />;
}
