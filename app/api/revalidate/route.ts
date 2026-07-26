import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";

/**
 * On-demand CMS cache bust — called by the backend after admin content updates.
 * Auth: Bearer REVALIDATE_SECRET (or ?secret=).
 */
export async function POST(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET?.trim();
  if (!secret) {
    return NextResponse.json(
      { success: false, message: "REVALIDATE_SECRET is not configured" },
      { status: 503 }
    );
  }

  const header = request.headers.get("authorization") ?? "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  const querySecret = request.nextUrl.searchParams.get("secret")?.trim() ?? "";
  const provided = bearer || querySecret;

  if (provided !== secret) {
    return NextResponse.json(
      { success: false, message: "Invalid revalidate secret" },
      { status: 401 }
    );
  }

  revalidateTag("cms");
  revalidatePath("/", "layout");

  return NextResponse.json({
    success: true,
    message: "CMS cache revalidated",
    revalidatedAt: new Date().toISOString(),
  });
}
