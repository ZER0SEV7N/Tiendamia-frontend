/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**", // Permite cualquier ruta dentro de supabase.co
      },
    ],
  },
};

export default nextConfig; // O module.exports = nextConfig; dependiendo de tu archivo
