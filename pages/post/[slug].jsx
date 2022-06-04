import {Author, Categories, Comments, CommentsForm, PostDetail, PostWidget} from "../../components/index";
import {getPostDetails, getPosts} from "../../services";
import Head from "next/head";

const PostDetails = ({ post } ) => {

    return <>
        <Head>
            <title>{post.title}</title>
        </Head>
        <div className='container mx-auto px-10 mb-8'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={post} />
                <Author author={post.author} />
                <CommentsForm slug={post.slug} />
                <Comments slug={post.slug} />
            </div>
            <div className="lg:col-span-4 col-span-1">
                <div className="lg:sticky relative top-8">
                    <PostWidget />
                    <Categories />
                </div>
            </div>
        </div>
    </div></>
}

export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug)

    return {
        props: { post: data }
    }
}

export async function getStaticPaths() {
    const posts = await getPosts()

    return {
        paths: posts.map(({node: {slug}}) => ({params: {slug}})),
        fallback: false,
    }
}

export default PostDetails