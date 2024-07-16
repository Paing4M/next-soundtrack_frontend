'use client'

import useAddSongModal from '@/hooks/useAddSongModal'
import Modal from './Modal'
import { useFormState } from 'react-dom'
import InputError from '../error/InputError'
import SubmitBtn from '../auth/SubmitBtn'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { addSong } from '@/actions/song'
import toast from 'react-hot-toast'
import { useEventBus } from '@/providers/EventBusProvider'

const AddSongModal = () => {
	const { isOpen, onClose } = useAddSongModal()
	const [state, formAction] = useFormState(addSong, undefined)
	const [file, setFile] = useState<FileList | null>()
	const [image, setImage] = useState<File | null>()

	const { emit } = useEventBus()

	const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const img = e.target?.files?.[0]
		if (img) setImage(img)
	}

	useEffect(() => {
		if (state?.succss) {
			emit('musicAdded', state?.data?.music)
			onClose()
			setFile(null)
			setImage(null)
			toast.success('Song is added successfully.')
		}
	}, [state])

	return (
		<Modal isOpen={isOpen} onClose={onClose} title='Add Song'>
			<form action={formAction} className='space-y-2'>
				<div>
					<label htmlFor='song'>Song</label>
					<div className='px-3 py-2 border-none outline-none bg-neutral-800 rounded-md w-full flex items-center gap-3'>
						<label
							htmlFor='song'
							className='cursor-pointer px-2 bg-neutral-300 rounded-md text-black py-[2px] w-fit'
						>
							Select song
						</label>

						<div className='w-full flex-1 h-full px-2 overflow-hidden truncate'>
							{file?.[0]?.name}
						</div>

						<input
							name='song'
							onChange={(e) => setFile(e.target?.files!)}
							type='file'
							className='hidden'
							id='song'
						/>
					</div>
					{state?.errors?.song && (
						<InputError error={state?.errors?.song?.[0]} />
					)}
				</div>

				<div>
					<label
						htmlFor='title'
						className='block text-sm font-medium leading-6 '
					>
						Title
					</label>
					<div className='mt-1'>
						<input
							id='title'
							name='title'
							type='text'
							className='px-3 py-2 border-none outline-none bg-neutral-800 rounded-md w-full'
						/>
					</div>
					{state?.errors?.title && (
						<InputError error={state?.errors?.title?.[0]} />
					)}
				</div>
				<div>
					<div className='flex items-center justify-between'>
						<label
							htmlFor='author'
							className='block text-sm font-medium leading-6 '
						>
							Author
						</label>
					</div>
					<div className='mt-1'>
						<input
							id='author'
							name='author'
							className='px-3 py-2 border-none outline-none bg-neutral-800 rounded-md w-full'
						/>
					</div>
					{state?.errors?.author && (
						<InputError error={state?.errors?.author?.[0]} />
					)}
				</div>

				<div>
					<label htmlFor='image'>Image (option)</label>
					<div className='px-3 py-2  w-full flex items-center gap-3 justify-between'>
						<label
							htmlFor='image'
							className='cursor-pointer px-2 bg-neutral-300 rounded-md text-black py-[2px] w-fit'
						>
							Select image
						</label>

						<div>
							<input
								name='image'
								onChange={handleImage}
								type='file'
								hidden
								id='image'
								className='hidden'
								accept='image/*'
							/>
							{image && (
								<Image
									src={URL.createObjectURL(image!)}
									width={100}
									height={80}
									className='w-[100px] object-cover h-[80px] rounded-md'
									alt='img'
								/>
							)}
						</div>
					</div>
					{state?.errors?.image && (
						<InputError error={state?.errors?.image?.[0]} />
					)}
				</div>

				<div>
					<SubmitBtn>Add Song</SubmitBtn>
				</div>
			</form>
		</Modal>
	)
}

export default AddSongModal
