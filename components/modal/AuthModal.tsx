'use client'

import * as Tabs from '@radix-ui/react-tabs'
import useAuthModal from '@/hooks/useAuthModal'
import Modal from './Modal'
import LoginForm from '../auth/LoginForm'
import RegisterForm from '../auth/RegisterForm'

const AuthModal = () => {
	const { isOpen, onClose } = useAuthModal()

	return (
		<Modal title='Login or register here' isOpen={isOpen} onClose={onClose}>
			<Tabs.Root defaultValue='login'>
				<Tabs.List
					className='grid grid-cols-2'
					aria-label='Manage your account'
				>
					<Tabs.Trigger
						className='py-2  text-neutral-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 border-b-white '
						value='login'
					>
						Login
					</Tabs.Trigger>
					<Tabs.Trigger
						className='py-2  text-neutral-400 hover:text-white data-[state=active]:text-white data-[state=active]:border-b-2 border-b-white'
						value='register'
					>
						Register
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content className='mt-3' value='login'>
					<LoginForm />
				</Tabs.Content>
				<Tabs.Content className='mt-3' value='register'>
					<RegisterForm />
				</Tabs.Content>
			</Tabs.Root>
		</Modal>
	)
}

export default AuthModal
