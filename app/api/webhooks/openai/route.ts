import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { processCompletedResearchResponse } from "@/app/lib/researchAutomation";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  const webhookSecret = process.env.OPENAI_WEBHOOK_SECRET;
  if (!apiKey || !webhookSecret) {
    console.error("OpenAI webhook environment variables are not configured");
    return NextResponse.json({ error: "Webhook is not configured" }, { status: 503 });
  }

  try {
    const rawBody = await request.text();
    const client = new OpenAI({ apiKey, webhookSecret });
    const event = await client.webhooks.unwrap(
      rawBody,
      request.headers,
      webhookSecret,
    );

    if (
      event.type !== "response.completed" &&
      event.type !== "response.incomplete" &&
      event.type !== "response.failed" &&
      event.type !== "response.cancelled"
    ) {
      return NextResponse.json({ received: true });
    }

    const result = await processCompletedResearchResponse(event.data.id);
    if (result.status === "failed") {
      console.error("Automated research publishing reached a terminal failure", result);
    }
    if (result.status === "published") {
      revalidatePath("/blog");
      revalidatePath(`/blog/${result.slug}`);
      revalidatePath("/sitemap.xml");
    }

    return NextResponse.json({ received: true, result });
  } catch (error) {
    if (error instanceof OpenAI.InvalidWebhookSignatureError) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    console.error("OpenAI webhook processing failed", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
