import { PostBrowser } from '@/components/post-browser';
import { getAllPosts, getCategories } from '@/lib/posts';
export default function Search() {
    return <section className="container-page py-14">
        <p className="text-sm font-bold text-brand">SEARCH</p><h1 className="mt-2 text-5xl font-black">Find a note</h1><p className="mt-3 text-zinc-500">Search across titles, descriptions, article text, tags, and categories.</p><div className="mt-10"><PostBrowser posts={getAllPosts()} categories={getCategories()} /></div></section>
}
