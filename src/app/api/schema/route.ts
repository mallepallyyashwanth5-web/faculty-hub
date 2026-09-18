import { NextResponse } from "next/server";
import { SCHEMA_SQL } from "@/lib/supabase/schemaSql";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ sql: SCHEMA_SQL });
}
