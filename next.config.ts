/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "supabase.co",
        port: "",
        pathname: "/**", // Permite cualquier ruta dentro de supabase.co
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.local",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ernbcosfyinkfuoocxaf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig; // O module.exports = nextConfig; dependiendo de tu archivo
