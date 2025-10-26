import createNextIntlPlugin from "next-intl/plugin";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
    publicRuntimeConfig: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "147.79.118.212",
        port: "7099",
        pathname: "/storage/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
