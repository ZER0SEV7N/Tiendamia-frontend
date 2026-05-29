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
    ],
  },
};

export default nextConfig; // O module.exports = nextConfig; dependiendo de tu archivo
