import { FC, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface BoxProps {
	className?: string
	children: ReactNode
}

const Box: FC<BoxProps> = ({ className, children }) => {
	return (
		<div
			className={twMerge(
				`rounded-md h-fit w-[300px] px-6 bg-side-color text-white flex flex-col`,
				className
			)}
		>
			{children}
		</div>
	)
}

export default Box
