import { NextResponse } from 'next/server';
import postgres from 'postgres';
import { unstable_noStore as noStore } from 'next/cache';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require', prepare: false });

export async function GET() {
    noStore();
    try {
        const data = await sql`SELECT * FROM announcements`;
        return NextResponse.json({ count: data.length, data });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
