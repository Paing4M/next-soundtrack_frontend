import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Next Soundtrack | Home',
	description:
		'Elevate your auditory experience with NextSoundtrack today!',
	icons: {
		icon: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/assets/logo.dark.png',
				href: '/assets/logo.dark.png',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/assets/logo.png',
				href: '/assets/logo.png',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className} suppressHydrationWarning>
				{children}
			</body>
		</html>
	)
}
