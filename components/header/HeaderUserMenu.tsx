import { logout } from '@/actions/logout'
import { CustomUser } from '@/auth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import * as Tooltip from '@radix-ui/react-tooltip'
import AddSong from '../song/AddSong'

const HeaderUserMenu = ({ user }: { user: CustomUser }) => {
	return (
		<div className='flex items-center gap-2'>
			<form action={logout}>
				<button className='hidden xs:inline-block px-3 py-1 bg-white text-black rounded-full'>
					Logout
				</button>
			</form>
			<Menu>
				<MenuButton>
					<Tooltip.Provider>
						<Tooltip.Root>
							<Tooltip.Trigger asChild>
								<UserCircleIcon className='w-10 h-10' />
							</Tooltip.Trigger>
							<Tooltip.Portal>
								<Tooltip.Content
									className='data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[10px] py-[8px] text-[13px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]'
									sideOffset={5}
								>
									{user?.name}
									<Tooltip.Arrow className='fill-white' />
								</Tooltip.Content>
							</Tooltip.Portal>
						</Tooltip.Root>
					</Tooltip.Provider>
				</MenuButton>

				<MenuItems
					transition
					anchor='bottom end'
					className='w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 space-y-2'
				>
					{user?.role == 1 && (
						<MenuItem as={'div'}>
							<AddSong />
						</MenuItem>
					)}

					<div className='my-1 h-px bg-white/5' />
					<MenuItem>
						<form action={logout}>
							<button
								type='submit'
								className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 hover:bg-white/10'
							>
								<svg
									fill='none'
									height={24}
									viewBox='0 0 24 24'
									width={22}
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8'
										stroke='#fff'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={1}
									/>
								</svg>
								Logout
							</button>
						</form>
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	)
}

export default HeaderUserMenu
