import {useEffect, useState} from "react";
import {getRecentPosts, getSimilarPosts} from '../services/index'
import moment from "moment";
import Link from "next/link";


const PostWidget = ({categories, slug}) => {
    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect((categories, slug) => {
        if (slug) {
            getSimilarPosts(categories, slug)
                .then(result => setRelatedPosts(result))
        } else {
            getRecentPosts()
                .then(result => setRelatedPosts(result))
        }
    }, [slug])

    return <div className='bg-white text-shadow-lg rounded-lg p-8 mb-8'>
        <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
            {slug ? 'Related Posts' : 'Recent Post'}
        </h3>
        {relatedPosts.map(post => <div key={post.title} className='flex items-center w-full mb-4'>
            <div className='w-16 flex-none'>
                <img height='60px' width='60px' alt={post.title}
                     className='align-middle rounded-full' src={post.featuredImage.url}/>
            </div>
            <div className='flex-grow ml-4 font-xs'>
                <p className='text-gray-500 '>{moment(post.createdAt).format('MMM DD, YYYY')}</p>
                <Link href={`/post/${post.slug}`} className='text-md' key={post.title}>
                    {post.title}
                </Link>
            </div>
        </div>)}
    </div>
}


export default PostWidget