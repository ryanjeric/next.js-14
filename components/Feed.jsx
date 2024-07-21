'use client';

import {useEffect,useState} from 'react'

import PromptCard from './PromptCard';

const PromptCardList = ({data,handleTagClick}) =>{
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) =>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [posts, setPosts] = useState([])

  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([])


  const filterPrompts = (searchtext) =>{
    const regex = new RegExp(searchtext, "i");

    return posts.filter(
      (item) => 
      regex.test(item.creator.username) ||
      regex.test(item.tag) ||
      regex.test(item.prompt)
    );
  }

  const handleSearchChange = (e) =>{
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchResults(searchResult)
      },500)
    )
  }

  const handleTagClick = (tag) =>{
    const searchResult = filterPrompts(tag);
    setSearchText(tag);
    setSearchResults(searchResult)
  }

  useEffect(() =>{
    const fetchPosts = async() => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input 
          type="text" 
          className="search_input peer"
          placeholder='Seach for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
         />
      </form>

      <PromptCardList
        data={searchResults ? searchResults: posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed