/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '127.0.0.1',
				port: '8000',
			},
		],
	},

	env: {
		BACKEND_URL: process.env.BACKEND_URL,
	},
}

export default nextConfig
