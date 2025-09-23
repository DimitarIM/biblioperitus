import { NextResponse } from "next/server";
import { sql } from "../../../lib/db";

export async function GET() {
    try {
        const users = await sql`SELECT * FROM user`;
        return NextResponse.json(users);
    } catch (err) {
        return NextResponse.json(
            { error: err, success: false },
            { status: 500 })
    }

}