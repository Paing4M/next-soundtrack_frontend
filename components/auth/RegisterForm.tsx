'use client'

import { register } from '@/actions/register'
import { useFormState } from 'react-dom'
import InputError from '../error/InputError'
import SubmitBtn from './SubmitBtn'

const RegisterForm = () => {
	const [state, formAction] = useFormState(register, undefined)

	return (
		<div className='flex min-h-full flex-col  justify-center px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<form action={formAction} className='space-y-2'>
					<div>
						<label
							htmlFor='name'
							className='block text-sm font-medium leading-6 '
						>
							Name
						</label>
						<div className='mt-1'>
							<input
								id='name'
								name='name'
								type='text'
								className='px-3 py-2 border-none outline-none bg-neutral-800 rounded-md w-full'
							/>
							<InputError error={state?.errors?.name?.[0]} />
						</div>
					</div>
					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 '
						>
							Email address
						</label>
						<div className='mt-1'>
							<input
								id='email'
								name='email'
								type='text'
								className='px-3 py-2 border-none outline-none bg-neutral-800 rounded-md w-full'
							/>
							<InputError error={state?.errors?.email?.[0]} />
						</div>
					</div>
					<div>
						<div className='flex items-center justify-between'>
							<label
								htmlFor='password'
								className='block text-sm font-medium leading-6 '
							>
								Password
							</label>
						</div>
						<div className='mt-1'>
							<input
								id='password'
								name='password'
								type='password'
								className='px-3 py-2 border-none outline-none bg-neutral-800 rounded-md w-full'
							/>
							<InputError error={state?.errors?.password?.[0]} />
						</div>
					</div>
					<div>
						<SubmitBtn>Register</SubmitBtn>
					</div>
				</form>
			</div>
		</div>
	)
}

export default RegisterForm
