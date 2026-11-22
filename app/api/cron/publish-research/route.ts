import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  isResearchSlot,
  processCompletedResearchResponse,
  publishResearchArticle,
  recoverStaleResearchJobs,
  startResearchPublication,
} from "@/app/lib/researchAutomation";
import { removeAutomatedBlogPostBySlug } from "@/app/lib/blogDatabase";

export const runtime = "nodejs";
export const maxDuration = 60;

const legacyResponseIds = [
  "resp_0e95d7df2418cfe4006afddbecdbf087d2b0f717dfeb957c45",
  "resp_0c05c1a6b9519cbd006afe966cf9d487d2b8c0924faef3fe71",
  "resp_0967b509a97fe93a006affe7e443c887d2a83eab462d260210",
] as const;

const unrelatedJakArticleSlug =
  "pregnancy-outcome-after-first-trimester-exposure-to-jak-inhibitors-an-evaluation-of";

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (request.nextUrl.searchParams.get("maintenance") === "legacy-backfill") {
    const removal = await removeAutomatedBlogPostBySlug(unrelatedJakArticleSlug);
    const results = [];
    for (const legacyResponseId of legacyResponseIds) {
      results.push({
        responseId: legacyResponseId,
        result: await processCompletedResearchResponse(legacyResponseId),
      });
    }
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ removal, results });
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
