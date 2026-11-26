/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Covers are served at 90 so screenshots and text stay sharp.
  images: { qualities: [75, 90] },
}

export default nextConfig
