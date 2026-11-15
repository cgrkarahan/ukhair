import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  ensureAutomatedBlogSchema,
  saveAutomatedBlogPost,
  type AutomatedPostRecord,
} from "@/app/lib/blogDatabase";

export const runtime = "nodejs";
export const maxDuration = 60;

function isApprovedRecord(value: unknown): value is AutomatedPostRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Partial<AutomatedPostRecord>;
  return Boolean(
    record.id &&
      record.publicationDate &&
      (record.slot === "morning" || record.slot === "afternoon") &&
      record.post?.slug &&
      record.post.isResearchDigest === true &&
      record.primaryPmid &&
      typeof record.qualityScore === "number" &&
      record.qualityScore >= 82 &&
      typeof record.similarityScore === "number" &&
      record.similarityScore <= 0.62,
  );
}

export async function POST(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await request.json()) as { records?: unknown[] };
  const records = payload.records ?? [];
  if (records.length < 1 || records.length > 2 || !records.every(isApprovedRecord)) {
    return NextResponse.json({ error: "One or two approved records are required" }, { status: 400 });
  }

  await ensureAutomatedBlogSchema();
  for (const record of records) {
    await saveAutomatedBlogPost(record);
    revalidatePath(`/blog/${record.post.slug}`);
  }
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  return NextResponse.json({
    imported: records.map((record) => ({
      slug: record.post.slug,
      qualityScore: record.qualityScore,
    })),
  });
}
