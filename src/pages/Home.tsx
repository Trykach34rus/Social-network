import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import {
	Button,
	Container,
	Flex,
	Heading,
	Select,
	Text,
} from '@radix-ui/themes'
import { useEffect } from 'react'
import Filters from '../components/Filters'
import Header from '../components/Header'
import Post from '../components/Post'
import { getAllPosts, setPage } from '../redux/slices/postsReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'

type Props = {}

export default function Home({}: Props) {
	const dispatch = useAppDispatch()
	const { search, tag, sort } = useAppSelector(state => state.filter)
	const { postsData, limit, page, maxPage } = useAppSelector(
		state => state.posts
	)
	const skip = (page - 1) * limit
	const pagesArr = [...new Array(maxPage)].map((_, i) => i + 1)

	function nextPage() {
		dispatch(setPage(page + 1))
	}

	function prevPage() {
		dispatch(setPage(page - 1))
	}

	useEffect(() => {
		dispatch(getAllPosts({ skip, limit, search, tag, sort }))
	}, [page, limit, search, tag, sort])

	return (
		<Container size='4'>
			<Header />
			<Heading mt={'8'} size={'8'}>
				Recent Posts
			</Heading>
			<Flex mt={'4'} justify={'between'} align={'start'}>
				<Flex direction={'column'} gap={'4'}>
					{postsData.map(item => (
						<Post key={item.id} item={item} />
					))}
					<Flex gap={'3'} align={'center'} justify={'center'} mt={'4'} mb={'7'}>
						<Button
							size={'3'}
							variant='outline'
							onClick={prevPage}
							disabled={page === 1}
						>
							<ChevronLeftIcon style={{ width: '25px', height: '25px' }} />
							Previous
						</Button>
						<Flex gap={'1'} align={'center'}>
							<Select.Root
								size={'3'}
								defaultValue='1'
								value={String(page)}
								onValueChange={value => dispatch(setPage(Number(value)))}
							>
								<Select.Trigger />
								<Select.Content
									style={{
										maxHeight: '200px',
									}}
									position='popper'
								>
									{pagesArr.map(page => (
										<Select.Item value={String(page)}>{page}</Select.Item>
									))}
								</Select.Content>
							</Select.Root>
							<Text>of {maxPage}</Text>
						</Flex>
						<Button
							size={'3'}
							variant='outline'
							onClick={nextPage}
							disabled={page === maxPage}
						>
							Next
							<ChevronRightIcon style={{ width: '25px', height: '25px' }} />
						</Button>
					</Flex>
				</Flex>
				<Filters />
			</Flex>
		</Container>
	)
}
