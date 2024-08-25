import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, Loader, PostCard} from '../components'
import { useNavigate } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const loginBtn = (e) => {
        e.preventDefault();
        navigate('/login')
    }
  
    if(loading) {
        return (
            <div className="flex justify-center">
                <Loader />
            </div>
        )
    }

    else if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <button className="text-2xl font-bold text-white hover:text-slate-400 cursor-pointer" onClick={loginBtn}>
                            Login to read posts
                            </button>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home