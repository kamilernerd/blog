import { Post } from '@/types';

interface IPost {
    index: number;
    post: Post;
}

export default function PostItem(props: IPost) {
    const { index, post } = props;
    return (
        <div className="">
            <a className="post-link flex w-full justify-between gap-4 tabular-nums" href={`/posts/${post.id}`}>
                <span>
                    <span className="mr-2">{`[${index}]`}</span>
                    <span>{post.title}</span>
                </span>
                <span>{post.created_at}</span>
            </a>
        </div>
    );
}
