import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Home" />
            <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                <p>root page</p>
            </main>
        </AppLayout>
    );
}
