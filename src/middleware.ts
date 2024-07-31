// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const protectedRoute = createRouteMatcher([
//   "/",
//   "/upcoming",
//   "/previous",
//   "/recordings",
//   "/personal-room",
//   "/meeting(.*)"
// ]);

// export default clerkMiddleware((auth, req) => {
//   if (protectedRoute(req)) auth().protect();
// });

// export const config = {
//   matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const protectedRoute = createRouteMatcher([
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meeting(.*)"
]);

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const url = req.nextUrl.clone();
  if (protectedRoute(req)) {
    if (!userId) {
      if(url.pathname === '/'){
        return NextResponse.redirect(new URL("/landing", req.url));
      }else{
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
    auth().protect();
  } else if (isPublicRoute(req)) {
    // Allow public routes to be accessed freely
    return NextResponse.next();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
