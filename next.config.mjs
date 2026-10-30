/**
 * Product/category/article images uploaded in the Laravel admin are served from the API host.
 */
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_BASE_URL || "https://atest.flutterclone.com/api/v1")
const apiImagePattern = {
  protocol: apiUrl.protocol.replace(":", ""),
  hostname: apiUrl.hostname,
  ...(apiUrl.port ? { port: apiUrl.port } : {}),
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'atest.flutterclone.com',
      },
      apiImagePattern,
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/panchang',
        destination: '/dainik-panchang',
        permanent: true,
      },
      {
        source: '/category',
        destination: '/categories',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
      {
        source: '/shop',
        destination: '/myshop',
        permanent: true,
      },
      {
        source: '/product/:id',
        destination: '/myshop/product/:id',
        permanent: true,
      },
      {
        source: '/products/:id',
        destination: '/myshop/product/:id',
        permanent: true,
      },
      {
        source: '/shop/product/:id',
        destination: '/myshop/product/:id',
        permanent: true,
      },
      {
        source: '/vedic-shop',
        destination: '/myshop',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/refund',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/refund-policy',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/terms-conditions',
        destination: '/privacy-policy',
        permanent: true,
      },
      {
        source: '/forget-password',
        destination: '/forgot-password',
        permanent: true,
      },
      {
        source: '/reset-password',
        destination: '/forgot-password',
        permanent: true,
      },
      {
        source: '/mydashboard',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/my-dashboard',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/profile',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
