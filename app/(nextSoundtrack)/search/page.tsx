import { auth } from '@/auth'
import HeaderTop from '@/components/header/HeaderTop'
import SearchContainer from '@/components/search/SearchContainer'
import SearchInput from '@/components/search/SearchInput'

interface SearchParamInterface {
	searchParams: {
		title: string
	}
}

const SearchPage: React.FC<SearchParamInterface> = async ({ searchParams }) => {
	const session = await auth()

	return (
		<div className='w-full h-[calc(100vh-80px)] px-6 text-white flex flex-col'>
			<HeaderTop user={session?.user!} />
			<SearchInput className='mb-3' />
			<div className='pb-4 pt-8  flex-1 overflow-hidden overflow-y-auto scrollbar-hide'>
				<SearchContainer searchParam={searchParams.title!} />
			</div>
		</div>
	)
}

export default SearchPage
