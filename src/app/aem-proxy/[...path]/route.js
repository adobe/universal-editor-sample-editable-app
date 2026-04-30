import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    return handleProxy(request);
}

export async function POST(request, { params }) {
    return handleProxy(request);
}

export async function OPTIONS(request, { params }) {
    return handleProxy(request);
}

async function handleProxy(request) {
    const requestHeaders = new Headers(request.headers);
    
    // Remove host header to avoid SSL mismatch issues when proxying
    requestHeaders.delete('host');
    
    const token = process.env.NEXT_PUBLIC_AEM_ACCESS_TOKEN;
    const aemHost = process.env.NEXT_PUBLIC_AEM_HOST || "https://author-p117303-e1695777.adobeaemcloud.com";

    if (token) {
        if (token.includes(':')) {
            requestHeaders.set('Authorization', `Basic ${btoa(token)}`);
        } else {
            requestHeaders.set('Authorization', `Bearer ${token}`);
        }
    }

    const path = request.nextUrl.pathname.replace('/aem-proxy', '');
    const search = request.nextUrl.search;
    const targetUrl = `${aemHost}${path}${search}`;

    try {
        const fetchOptions = {
            method: request.method,
            headers: requestHeaders,
            redirect: 'manual'
        };

        if (request.method !== 'GET' && request.method !== 'HEAD') {
            fetchOptions.body = await request.arrayBuffer();
        }

        const response = await fetch(targetUrl, fetchOptions);
        
        const responseHeaders = new Headers(response.headers);
        // Clean up some headers that might cause issues
        responseHeaders.delete('content-encoding');
        
        return new NextResponse(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders
        });
    } catch (error) {
        console.error("Proxy error:", error);
        return new NextResponse("Failed to proxy: " + error.message, { status: 500 });
    }
}
