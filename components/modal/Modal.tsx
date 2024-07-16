import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	title: string
	description?: string
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	title,
	description,
}) => {
	return (
		<Dialog
			open={isOpen}
			as='div'
			className='relative z-10 focus:outline-none'
			onClose={() => null}
		>
			<div className='fixed bg-neutral-900/90 backdrop-blur-sm inset-0 z-10 w-screen overflow-y-auto'>
				<div className='flex min-h-full items-center justify-center p-4'>
					<DialogPanel
						transition
						className='w-full max-w-md rounded-xl bg-white/10 p-6 backdrop-blur-2xl h-full min-h-auto duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0'
					>
						<DialogTitle
							as='h2'
							className='text-xl  capitalize text-center font-medium text-white'
						>
							{title}
						</DialogTitle>
						{description && (
							<p className='mt-2 text-center text-sm/6 text-white/50'>
								{description}
							</p>
						)}
						<div className='mt-4 text-white'>{children}</div>
						<button
							onClick={onClose}
							className='absolute top-2 right-2 h-[25px] w-[25px] appearance-none rounded-full items-center justify-center inline-flex text-neutral-400 hover:text-white transition'
						>
							<XMarkIcon className='w-5 ' />
						</button>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}

export default Modal
