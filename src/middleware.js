export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard", "/dashboard/:path*", "/api/secure/:path*"] }