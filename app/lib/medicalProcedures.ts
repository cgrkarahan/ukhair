/**
 * Procedure facts used to build `MedicalProcedure` markup.
 *
 * Only the facts that are specific to the procedure live here. Name and
 * description are taken from the page's own content at build time so the markup
 * cannot drift away from the visible copy.
 *
 * Pages absent from this map are described as `MedicalWebPage` with no
 * `about` node, which is correct for pages that are about choosing, comparing,
 * or pricing rather than about a procedure.
 */

export type ProcedureType = "SurgicalProcedure" | "TherapeuticProcedure";

export type ProcedureFacts = {
  /** Overrides the page title where the page title is not the procedure name. */
  name?: string;
  procedureType: ProcedureType;
  bodyLocation: string[];
  howPerformed?: string;
  preparation?: string;
  followup?: string;
};

const graftPreparation =
  "Assessment of donor supply, pattern of loss, and suitability at consultation, with a planned graft number and hairline design agreed before the treatment date.";

const graftFollowup =
  "Staged recovery over the first two weeks with washing guidance, then shedding and regrowth assessed at review points across the following months.";

export const procedureFactsByPath: Record<string, ProcedureFacts> = {
  "/hair-transplant-london": {
    name: "Hair transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Scalp"],
    howPerformed:
      "Follicular units are taken from the donor area at the back and sides of the scalp and placed into the thinning or receded area under local anaesthetic.",
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/how-hair-transplant-works": {
    name: "Hair transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Scalp"],
    howPerformed:
      "Follicular units are extracted individually from the donor area and implanted into the recipient area, with the angle, direction, and density planned in advance.",
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/fue-vs-dhi": {
    name: "Hair transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Scalp"],
    howPerformed:
      "Grafts are extracted individually. They are then placed either into pre-made incisions or directly through an implanter pen, depending on the technique used.",
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/female-hair-transplant-london": {
    name: "Female hair transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Scalp"],
    howPerformed:
      "Grafts are placed to rebuild frontal framing, temple points, or part-line density, usually without shaving the whole head.",
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/hair-transplant-without-shaving": {
    name: "Unshaven hair transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Scalp"],
    howPerformed:
      "Donor hair is trimmed selectively rather than shaving the whole head, so surrounding hair can cover the donor area during recovery.",
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/services/male-hair-transplant": {
    name: "Male hair transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Scalp"],
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/services/female-hair-transplant": {
    name: "Female hair transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Scalp"],
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/services/eyebrow-transplant": {
    name: "Eyebrow transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Eyebrow"],
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/services/beard-transplant": {
    name: "Beard transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Face", "Jawline"],
    preparation: graftPreparation,
    followup: graftFollowup,
  },
  "/services/moustache-transplant": {
    name: "Moustache transplant",
    procedureType: "SurgicalProcedure",
    bodyLocation: ["Upper lip"],
    preparation: graftPreparation,
    followup: graftFollowup,
  },
};

export function getProcedureFacts(path: string): ProcedureFacts | undefined {
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");

  return procedureFactsByPath[normalized];
}
