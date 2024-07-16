import { SessionProvider } from 'next-auth/react'
import { EventBusProvider } from './EventBusProvider'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<EventBusProvider>{children}</EventBusProvider>
		</SessionProvider>
	)
}

export default AuthProvider
