'use client'

import useDebounce from '@/hooks/useDebounce'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import qs from 'query-string'
import { twMerge } from 'tailwind-merge'

const SearchInput = ({ className }: { className?: string }) => {
	const router = useRouter()

	const [value, setValue] = useState<string>('')
	const debounceValue = useDebounce<string>(value, 500)

	useEffect(() => {
		const query = {
			title: debounceValue,
		}

		const url = qs.stringifyUrl({
			url: '/search',
			query: query,
		})

		router.push(url)
	}, [router, debounceValue])

	return (
		<div className='w-full'>
			<input
				onChange={(e) => setValue(e.target.value)}
				className={twMerge(
					`bg-neutral-400/10 px-4 py-2  w-full md:w-[400px] outline-none border-none rounded-md`,
					className
				)}
				placeholder='What do you want to listen'
			/>
		</div>
	)
}

export default SearchInput
