'use client'

import { login } from '@/actions/login'
import { useFormState, useFormStatus } from 'react-dom'
import InputError from '../error/InputError'
import SubmitBtn from './SubmitBtn'

const LoginForm = () => {
	const [state, formAction] = useFormState(login, undefined)

	// console.log(state)

	return (
		<div className='flex min-h-full flex-col justify-center px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<form action={formAction} className='space-y-2'>
					{state?.errors?.incorrect && (
						<InputError error={state?.errors?.incorrect} />
					)}
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
						</div>
						{state?.errors?.email && (
							<InputError error={state?.errors?.email?.[0]} />
						)}
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
						</div>
						{state?.errors?.password && (
							<InputError error={state?.errors?.password?.[0]} />
						)}
					</div>
					<div>
						<SubmitBtn>Login</SubmitBtn>
					</div>
				</form>
			</div>
		</div>
	)
}

export default LoginForm
