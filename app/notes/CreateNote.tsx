'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./Notes.module.css";

export default function CreateNote(){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const router = useRouter();

    const create = async() => {
        console.log(title);
        console.log(content);

        await fetch('http://127.0.0.1:8090/api/collections/notes/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content
            }),
        });

        setTitle('');
        setContent('');

        router.refresh();
    }

    return (
        <form onSubmit={create}>
            <h3>Create a New Note</h3>
            <input 
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <button className={styles.action} type="submit">Create note</button>
        </form>
    );
}