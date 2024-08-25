import React, {useEffect, useState} from 'react'
import { Container, PostForm } from '../components'
import appwriteService from '../appwrite/config'
import { useParams, useNavigate } from 'react-router-dom'

function EditPosts() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                try {
                    const post = await appwriteService.getPost(slug);
                    if (post) {
                        setPosts(post);
                    }
                } catch (error) {
                    console.error("Failed to fetch post:", error);
                }
            } else {
                navigate('/');
            }
        };

        fetchPost();
    }, [slug, navigate]);

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null;
}

export default EditPosts

