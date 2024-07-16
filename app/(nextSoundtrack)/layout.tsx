import Sidebar from '@/components/nav/Sidebar'
import MobilePlayer from '@/components/song/MobilePlayer'
import Player from '@/components/song/Player'
import AuthProvider from '@/providers/AuthProvider'
import ModalProvider from '@/providers/ModalProvider'
import { Toaster } from 'react-hot-toast'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<AuthProvider>
			<div className='flex h-screen flex-col'>
				<div className='flex flex-1'>
					<Sidebar />
					{children}
				</div>
				<Player />
				<ModalProvider />
				<Toaster />
			</div>
		</AuthProvider>
	)
}

export default HomeLayout
