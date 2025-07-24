import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useCallback } from 'react';

import { Editor, EditorContent, EditorContext } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { BlockquoteButton } from '@/components/tiptap-ui/blockquote-button';
import { CodeBlockButton } from '@/components/tiptap-ui/code-block-button';
import { ListDropdownMenu } from '@/components/tiptap-ui/list-dropdown-menu';
import { MarkButton } from '@/components/tiptap-ui/mark-button';
import { TextAlignButton } from '@/components/tiptap-ui/text-align-button';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { BulletList, ListItem, OrderedList, TaskItem, TaskList } from '@tiptap/extension-list';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';

import { Button } from '@/components/tiptap-ui-primitive/button';
import { HeadingDropdownMenu } from '@/components/tiptap-ui/heading-dropdown-menu';
import { LinkPopover } from '@/components/tiptap-ui/link-popover';
import { Input } from '@/components/ui/input';
import { ImageIcon, LucideSave, Redo2Icon, Undo2Icon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'New post',
        href: '/posts/new',
    },
];

interface PostForm {
    title: string;
    content: string;
    published: boolean;
}

export default function Profile() {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<PostForm>>({
        title: '',
        content: '',
        published: false,
    });

    const editor = new Editor({
        content: '',
        extensions: [
            Link,
            CodeBlock,
            Image,
            Document,
            Paragraph,
            Text,
            Heading,
            Blockquote,
            BulletList,
            OrderedList,
            ListItem,
            TaskList,
            TaskItem,
            TextAlign,
            StarterKit.configure(),
        ],
        onUpdate: (e) => {
            data.content = e.editor.getHTML();
        },
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            preserveScroll: true,
        });
    };

    if (!editor) {
        return null;
    }

    const addImage = useCallback(() => {
        const url = window.prompt('URL');

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New post" />
            <div className="editor-parent max-w-[80%]">
                <EditorContext.Provider value={{ editor }}>
                    <div className="tiptap-button-group" data-orientation="horizontal">
                        <Button tooltip={'Save'} onClick={() => console.log(data)} className={editor.isActive('bold') ? 'is-active' : ''}>
                            <LucideSave strokeWidth={2} size={18} />
                        </Button>

                        <Input className="mx-2 max-w-[30%]" onChange={(e) => (data.title = e.target.value)} placeholder="Title..." />

                        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />

                        <ListDropdownMenu types={['bulletList', 'orderedList', 'taskList']} />

                        <MarkButton type="bold" />
                        <MarkButton type="italic" />
                        <MarkButton type="strike" />
                        <MarkButton type="code" />
                        <MarkButton type="underline" />

                        <TextAlignButton align="left" />
                        <TextAlignButton align="center" />
                        <TextAlignButton align="right" />
                        <TextAlignButton align="justify" />

                        <BlockquoteButton />
                        <CodeBlockButton />

                        <Button onClick={addImage}>
                            <ImageIcon size={16} strokeWidth={2} />
                        </Button>

                        <LinkPopover editor={editor} />

                        <Button onClick={() => editor.chain().focus().undo().run()}>
                            <Undo2Icon size={16} strokeWidth={2} />
                        </Button>
                        <Button onClick={() => editor.chain().focus().redo().run()}>
                            <Redo2Icon size={16} strokeWidth={2} />
                        </Button>
                    </div>

                    <EditorContent className="editor" editor={editor} role="presentation" />
                </EditorContext.Provider>
            </div>
        </AppLayout>
    );
}
