const _  = require('lodash')
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.map(n => n.likes).reduce((a,b)=>a+b, 0)
  console.log(total)
  return total
}

const countBlogs = (blogs) => {
  return blogs.length 
}
const favoriteBlog = (blogs) => {
  let mostPopular = blogs[0]
  for (let blog of blogs) {
    if (blog.likes > mostPopular.likes) {
      mostPopular = blog
    }
  }
  return mostPopular
}

const mostBlogs = (blogs) => {
  const authors = _.groupBy(blogs,'author')
  const author = Object.keys(authors).reduce((a,b)=>authors[a].length > authors[b].length ? a : b)
  return {'author': author, 'blogs': authors[author].length} 
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs,'author')
  /* How do you do this with _lodash? */
  for (const author in authors) {
    authors[author] = authors[author].map(n => n.likes).reduce((a,b) => a+b,0)
  }
  const author = Object.keys(authors).reduce((a,b)=>authors[a] > authors[b] ? a : b)
  return {'author': author, 'likes': authors[author]} 
}

module.exports = {
  dummy,
  countBlogs,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
