import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import {
	Box,
	Button,
	Card,
	Flex,
	Heading,
	RadioCards,
	Select,
	Skeleton,
	Text,
	TextField,
} from '@radix-ui/themes'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import {
	clearFilters,
	setSearch,
	setSort,
	setTag,
} from '../redux/slices/filterReducer'
import { getAllTags, setLimit } from '../redux/slices/postsReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { Sort } from '../types'

const sortArray: Sort[] = [
	{ id: 1, sortBy: 'id', order: 'asc', name: 'Default' },
	{ id: 2, sortBy: 'title', order: 'asc', name: 'Title' },
	{ id: 3, sortBy: 'body', order: 'asc', name: 'Body' },
	{ id: 4, sortBy: 'views', order: 'asc', name: 'Views ↑' },
	{ id: 5, sortBy: 'views', order: 'desc', name: 'Views ↓' },
]

export default function Filters() {
	const dispatch = useAppDispatch()
	const { tagList, limit, tagsLoading } = useAppSelector(state => state.posts)
	const { search, tag, sort } = useAppSelector(state => state.filter)
	const { isMobile } = useAppSelector(state => state.user)

	const [searchValue, setSearchValue] = useState(search)
	const tagsSkeleton = [...new Array(24)].map((_, i) => (
		<Skeleton height={'48px'} width={'107px'} key={i}></Skeleton>
	))

	function clearAll() {
		dispatch(clearFilters())
		dispatch(setLimit(10))
	}
	const handleSearch = useCallback(
		debounce((value: string) => {
			dispatch(setSearch(value))
		}, 300),
		[]
	)

	useEffect(() => {
		dispatch(getAllTags())
	}, [])
	return (
		<Box
			width={isMobile ? '100%' : '500px'}
			style={{
				position: isMobile ? 'static' : 'sticky',
				top: '20px',
				zIndex: 1,
			}}
		>
			<Card>
				<TextField.Root
					placeholder='Search the posts…'
					style={{ width: '100%' }}
					size={'3'}
					value={searchValue}
					onChange={e => {
						handleSearch(e.target.value)
						setSearchValue(e.target.value)
					}}
				>
					<TextField.Slot>
						<MagnifyingGlassIcon height='16' width='16' />
					</TextField.Slot>
				</TextField.Root>
				<Flex direction={'column'} gap={'4'} mt={'6'}>
					<Flex align={'center'} gap={'4'}>
						<Heading>Limit:</Heading>
						<Select.Root
							size={'3'}
							defaultValue='10'
							value={String(limit)}
							onValueChange={value => dispatch(setLimit(Number(value)))}
						>
							<Select.Trigger />
							<Select.Content>
								<Select.Item value='5'>5</Select.Item>
								<Select.Item value='10'>10</Select.Item>
								<Select.Item value='15'>15</Select.Item>
								<Select.Item value='20'>20</Select.Item>
							</Select.Content>
						</Select.Root>
					</Flex>
					<Flex align={'center'} gap={'4'}>
						<Heading>Sort By:</Heading>
						<Select.Root
							size={'3'}
							defaultValue='1'
							value={String(sort.id)}
							onValueChange={value =>
								dispatch(
									setSort(sortArray.find(el => el.id === Number(value)) as Sort)
								)
							}
						>
							<Select.Trigger />
							<Select.Content>
								{sortArray.map(item => {
									return (
										<Select.Item key={item.id} value={String(item.id)}>
											{item.name}
										</Select.Item>
									)
								})}
							</Select.Content>
						</Select.Root>
					</Flex>
					<RadioCards.Root
						columns={{ initial: '4', sm: '4' }}
						value={tag}
						onValueChange={value => dispatch(setTag(value))}
					>
						{tagsLoading
							? tagsSkeleton
							: tagList.map(tag => (
									<RadioCards.Item value={tag}>
										<Text>{tag}</Text>
									</RadioCards.Item>
							  ))}
					</RadioCards.Root>
					<Button size={'4'} onClick={clearAll}>
						Clear All
					</Button>
				</Flex>
			</Card>
		</Box>
	)
}
