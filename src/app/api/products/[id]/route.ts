// app/api/[slug]/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = params;
    // Fetch or generate data based on slug
    const data = { message: `Data for slug: ${id}` };

    return NextResponse.json(data);
}
