import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const time = setTimeout(() => {
			setDebouncedValue(value)
		}, delay || 500)

		return () => {
			clearTimeout(time)
		}
	}, [value, delay])

	return debouncedValue
}

export default useDebounce
