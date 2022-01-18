/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "no-referrer-when-downgrade",
  },
];

module.exports = {
  reactStrictMode: true,
  trailingSlash: false,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};
