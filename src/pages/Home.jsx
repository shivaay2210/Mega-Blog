import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config"
import {Container, PostCard, Loader} from "../components"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Query } from "appwrite"


function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    appwriteService.getPosts([Query.equal("status", "active")])
    .then((res) => {
        if (res) {
            setPosts(res.documents)
        }
    })
    .finally(() => {
        setLoading(false)
    })
  }, [])

  if(loading) {
      return (
        <div className="flex justify-center">
            <Loader />
        </div>
    )
  } else if(!authStatus) {
      return (
        <div className="mt-4 w-full py-8 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="w-full p-2">
                        <h1 className="text-2xl font-bold">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  } else if(posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
          <Container>
              <div className="flex flex-wrap">
                  <div className="p-2 w-full">
                      <h1 className="text-2xl font-bold">
                          No posts Available!{" "}
                          <Link
                              to="add-post"
                              className="text-blue-600 underline underline-offset-2"
                          >
                              Create
                          </Link>{" "}
                          one
                      </h1>
                  </div>
              </div>
          </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap justify-around'>
          {posts.map((post) => (
              <div key={post.$id} className='p-3 w-1/4 h-[400px]'>
                  <PostCard {...post} />
                  {/* <PostCard post={post} /> */}
              </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default Home