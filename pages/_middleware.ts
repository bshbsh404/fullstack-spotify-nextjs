import { NextResponse } from "next/server";

const signedInPages = ["/", "playlist", "library"];

export default function middleware(req) {
  if (signedInPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.SPOTIFY_ACCESS_TOKEN;
    if (!token) {
      return NextResponse.redirect("/login");
    }
  }
}
