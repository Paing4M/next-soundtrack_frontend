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

	
}

export default nextConfig
