import {
	Button,
	CheckboxCards,
	Dialog,
	Flex,
	Text,
	TextArea,
	TextField,
} from '@radix-ui/themes'
import { useState } from 'react'
import { addNewPost } from '../redux/slices/postsReducer'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { FormData } from '../types'

export default function PostForm() {
	const [formState, setFormState] = useState<FormData>({
		title: '',
		body: '',
		tags: [],
	})
	const dispatch = useAppDispatch()

	const { tagList } = useAppSelector(state => state.posts)
	const { userId } = useAppSelector(state => state.user)

	function handleChange(name: string, value: string | string[]) {
		setFormState(prev => ({
			...prev,
			[name]: value,
		}))
	}
	function handleSubmit() {
		if (userId && formState.title) {
			dispatch(
				addNewPost({
					...formState,
					userId: userId,
					reactions: { likes: 0, dislikes: 0 },
					views: 1,
				})
			)
		}
	}
	return (
		<Dialog.Root>
			<Dialog.Trigger>
				<Button size={'3'}>New Post</Button>
			</Dialog.Trigger>
			<Dialog.Content maxWidth='650px'>
				<Dialog.Title align={'center'}>Add New Post</Dialog.Title>
				<Flex direction='column' gap='3'>
					<label>
						<Text as='div' size='2' mb='1' weight='bold'>
							Title
						</Text>
						<TextField.Root
							placeholder='Enter post title'
							value={formState.title}
							onChange={e => handleChange('title', e.target.value)}
						/>
					</label>
					<label>
						<Text as='div' size='2' mb='1' weight='bold'>
							Description
						</Text>
						<TextArea
							placeholder='Enter post description'
							value={formState.body}
							onChange={e => handleChange('body', e.target.value)}
						/>
					</label>
					<label>
						<Text as='div' size='2' mb='1' weight='bold'>
							Select Post Tags
						</Text>

						<CheckboxCards.Root
							size='1'
							columns={{ initial: '1', sm: '4' }}
							value={formState.tags}
							onValueChange={value => handleChange('tags', value)}
						>
							{tagList.map(tag => (
								<CheckboxCards.Item
									disabled={
										formState.tags.length >= 4 && !formState.tags.includes(tag)
									}
									value={tag}
								>
									{tag}
								</CheckboxCards.Item>
							))}
						</CheckboxCards.Root>
					</label>
				</Flex>

				<Flex gap='3' mt='4' justify='end'>
					<Dialog.Close>
						<Button variant='soft' color='gray'>
							Cancel
						</Button>
					</Dialog.Close>
					<Dialog.Close>
						<Button
							onClick={handleSubmit}
							disabled={
								formState.title.trim().length === 0 ||
								formState.body.trim().length === 0
							}
						>
							Save
						</Button>
					</Dialog.Close>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	)
}
