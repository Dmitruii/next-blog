import { PostCard, Categories, PostWidget } from './../components/index'
import { getPosts } from './../services/index'
import Head from "next/head";
import FeaturedPosts from "../sections/FeaturedPosts";

const Home = ({ posts }) => {
    return <>
        <Head>
            <title>Home</title>
        </Head>
        <div className="container mx-auto px-10 mb-8">
            <FeaturedPosts />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 col-span-1">
                    {posts.map((post, index) => (
                        <PostCard key={index} post={post.node} />
                    ))}
                </div>
                <div className="lg:col-span-4 col-span-1">
                    <div className="lg:sticky relative top-8">
                        <PostWidget />
                        <Categories />
                    </div>
                </div>
            </div>
        </div>
    </>
}

export async function getStaticProps() {
    const posts = (await getPosts()) || []

    return {
        props: { posts }
    }
}

export default Home
