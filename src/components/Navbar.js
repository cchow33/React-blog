import React from 'react'

const Navbar = ({ search, setSearch }) => {
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search">Search Posts</label>
      <input 
        id='search'
        type='text'
        placeholder='Search posts'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </form>
    </nav>
  )
}

export default Navbar

// constrolled input - form data handled by React (e.target.value) instead of the DOM