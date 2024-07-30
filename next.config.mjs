/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'music-stream.p4m.serv00.net',
				
			},
		],
	},

	env: {
		BACKEND_URL: process.env.BACKEND_URL,
	},
}

export default nextConfig
