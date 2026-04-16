import { NextResponse } from 'next/server';

export function proxy(request) {
  if (request.nextUrl.pathname.startsWith('/aem-proxy/')) {
    // Clone the request headers to manipulate them
    const requestHeaders = new Headers(request.headers);
    
    const token = process.env.NEXT_PUBLIC_AEM_ACCESS_TOKEN;
    const aemHost = process.env.NEXT_PUBLIC_AEM_HOST || "https://author-p117303-e1695777.adobeaemcloud.com";

    // Add the Authorization header so AEM allows fetching the protected images
    if (token) {
        requestHeaders.set('Authorization', `Bearer ${token}`);
    }

    // Rewrite the URL to point to AEM
    const path = request.nextUrl.pathname.replace('/aem-proxy', '');
    const search = request.nextUrl.search;

    return NextResponse.rewrite(`${aemHost}${path}${search}`, {
      request: {
        headers: requestHeaders,
      },
    });
  }
}

// Only match /aem-proxy paths
export const config = {
  matcher: '/aem-proxy/:path*',
};
