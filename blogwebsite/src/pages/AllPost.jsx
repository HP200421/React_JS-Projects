import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../components'

const AllPost = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {}, [])

    // If any error occurs put all in useEffect
    service.getPosts([]).then((posts) => {
        if(posts) {
            setPosts(posts.documents)
        }
    })
   
  return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div key={post.$id} className="p-2 w-1/2">
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost