import React, { useState, useEffect } from 'react'
import Posts from './components/Posts'
import axios from 'axios'
import Pagination from './components/Pagination'

function App() {
	const [posts, setPosts] = useState([])
	const [filteredPosts, setFilteredPosts] = useState([])
	const [searchText, setSearchText] = useState('')
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [postsPerPage, setPostsPerPage] = useState(5)

	useEffect(() => {
		const fetchPosts = async () => {
			setLoading(true)
			const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
			setPosts(res.data)
			setLoading(false)
		}
		fetchPosts()
	}, [])

	const handleSelectChange = e => {
		setPostsPerPage(e.target.value)
	}

	const indexOfLastPost = currentPage * postsPerPage
	const indexOfFirstPost = indexOfLastPost - postsPerPage
	const currentPosts =
		filteredPosts.length === 0
			? posts.slice(indexOfFirstPost, indexOfLastPost)
			: filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

	const handleSearchTextChange = e => {
		setSearchText(e.target.value)
		const filteredPosts = posts.filter(post =>
			post.title.includes(searchText.trim().toLowerCase())
		)
		setFilteredPosts(filteredPosts)
	}

	const paginate = pageNumber => setCurrentPage(pageNumber)

	return (
		<div className='container mt-5'>
			<h1 className='text-primary mb-3'>My Blog</h1>
			<input
				type='text'
				className='form-control mb-4 col-4 d-inline-block mr-4'
				placeholder='Search by Title'
				value={searchText}
				onChange={handleSearchTextChange}
			/>
			<select
				className='custom-select mb-4 col-4 d-inline-block align-top'
				name='setPosts'
				onChange={handleSelectChange}
				value={postsPerPage}
			>
				<option value='5'>5</option>
				<option value='10'>10</option>
			</select>
			<Posts posts={currentPosts} loading={loading} />
			<Pagination
				totalPosts={
					filteredPosts.length === 0 ? posts.length : filteredPosts.length
				}
				postsPerPage={postsPerPage}
				paginate={paginate}
			/>
		</div>
	)
}

export default App
