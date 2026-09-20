import { NextRequest, NextResponse } from "next/server";
import { advisoryHistoryKeySchema, advisoryHistorySaveSchema } from "@/lib/advisory-history/contract";
import {
  listAdvisoryHistory,
  resolveAdvisoryClientIp,
  saveAdvisoryHistory,
} from "@/lib/advisory-history/service";
import { getFormsPrisma, isMissingFormsDatabaseUrlError } from "@/lib/forms/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function historyKey(request: NextRequest) {
  return advisoryHistoryKeySchema.safeParse(request.headers.get("x-profitia-history-key"));
}

function response(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "cache-control": "no-store, max-age=0" },
  });
}

export async function GET(request: NextRequest) {
  const key = historyKey(request);
  if (!key.success) return response({ error: "INVALID_HISTORY_KEY" }, 400);
  try {
    const conversations = await listAdvisoryHistory(getFormsPrisma(), key.data);
    return response({ conversations });
  } catch (error) {
    if (isMissingFormsDatabaseUrlError(error)) return response({ error: "HISTORY_UNAVAILABLE" }, 503);
    return response({ error: "HISTORY_LOAD_FAILED" }, 500);
  }
}

export async function PUT(request: NextRequest) {
  const key = historyKey(request);
  if (!key.success) return response({ error: "INVALID_HISTORY_KEY" }, 400);
  const declaredSize = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredSize) && declaredSize > 100_000) return response({ error: "PAYLOAD_TOO_LARGE" }, 413);

  try {
    const body = advisoryHistorySaveSchema.safeParse(await request.json());
    if (!body.success) return response({ error: "INVALID_HISTORY_PAYLOAD" }, 400);
    await saveAdvisoryHistory(getFormsPrisma(), key.data, body.data, resolveAdvisoryClientIp(request.headers));
    return response({ ok: true });
  } catch (error) {
    if (isMissingFormsDatabaseUrlError(error)) return response({ error: "HISTORY_UNAVAILABLE" }, 503);
    return response({ error: "HISTORY_SAVE_FAILED" }, 500);
  }
}
