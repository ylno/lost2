import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;

    // Zugriff verweigern, wenn der Benutzer nicht authentifiziert ist
    if (pathname.startsWith("/mail") && !req.nextauth.token) {
      const loginUrl = new URL("/login", req.url);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Benutzer ist autorisiert, wenn ein Token existiert
    },
  },
);

export const config = {
  matcher: ["/mail/:path*"],
};
