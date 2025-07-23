import PostItem from '@/components/posts/PostItem';
import AppLayout from '@/layouts/app-layout';
import { Post } from '@/types';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    const posts: Post[] = [
        {
            id: 'dnqwodnqw',
            title: 'testing',
            content: '',
            created_at: '2025-07-23',
            updated_at: '2025-07-23',
        },
        {
            id: 'dnqwodnqw',
            title: 'testing',
            content: '',
            created_at: '2025-07-23',
            updated_at: '2025-07-23',
        },
        {
            id: 'dnqwodnqw',
            title: 'testing',
            content: '',
            created_at: '2025-07-23',
            updated_at: '2025-07-23',
        },
        {
            id: 'dnqwodnqw',
            title: 'testing',
            content: '',
            created_at: '2025-07-23',
            updated_at: '2025-07-23',
        },
    ];

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Home" />
            <main className="w-full">
                <div className="max-w-[60%] mx-auto mt-10">
                    {posts.map((post, index) => (
                        <PostItem post={post} index={index} key={index} />
                    ))}
                </div>
            </main>
        </AppLayout>
    );
}
