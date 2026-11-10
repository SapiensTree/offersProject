import { resolveDealRedirectUseCase } from "@/infraestructure/container";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {

    const { slug } = await params;

    const targetUrl = await resolveDealRedirectUseCase.execute(slug);

    if (!targetUrl) return NextResponse.redirect(new URL('/', request.url), 302);

    return NextResponse.redirect(targetUrl, {
        status: 302,
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate'
        }
    });

}