export function formatTime(time: number): string {
	const minutes = Math.floor(time / 60)
	const seconds = Math.floor(time % 60)
	return `${minutes < 10 ? '0' : ''}${minutes}:${
		seconds < 10 ? '0' : ''
	}${seconds}`
}

export const sleep = (time: number): Promise<number> => {
	return new Promise((resolve) => setTimeout(resolve, time))
}
