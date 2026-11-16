import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  isResearchSlot,
  processCompletedResearchResponse,
  publishResearchArticle,
  recoverStaleResearchJobs,
  startResearchPublication,
} from "@/app/lib/researchAutomation";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const responseId = request.nextUrl.searchParams.get("responseId");
  if (responseId) {
    const result = await processCompletedResearchResponse(responseId);
    if (result.status === "published") {
      revalidatePath("/blog");
      revalidatePath(`/blog/${result.slug}`);
      revalidatePath("/sitemap.xml");
    }
    return NextResponse.json(result);
  }

  const slot = request.nextUrl.searchParams.get("slot");
  if (!isResearchSlot(slot)) {
    return NextResponse.json({ error: "slot must be morning or afternoon" }, { status: 400 });
  }

  try {
    const dryRun = request.nextUrl.searchParams.get("dryRun") === "1";
    const recovered = dryRun ? [] : await recoverStaleResearchJobs();
    const result = dryRun
      ? await publishResearchArticle(slot, { dryRun: true })
      : await startResearchPublication(slot, {
          publicationDate: request.nextUrl.searchParams.get("publicationDate") ?? undefined,
        });
    if (result.status === "published") {
      revalidatePath("/blog");
      revalidatePath(`/blog/${result.slug}`);
      revalidatePath("/sitemap.xml");
    }
    return NextResponse.json({ ...result, recovered });
  } catch (error) {
    console.error("Automated research publishing failed", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Publishing failed" },
      { status: 422 },
    );
  }
}
