'use client'

import styles from '../Notes.module.css';
import { useRouter } from 'next/navigation';
import { useState } from "react";

 async function getNote(noteId: string){
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await res.json();
    return data;
}

async function deleteNode(id: number){
    const res = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id
        }),
    });
}

export default async function NotePage({ params }: any){
    const id = params.id;
    const router = useRouter();
    const note = await getNote(id);
    /** 
    const [formData, setFormData] = useState({
        title: '',
        content: ''
      });
*/
    const update = async() => {
        await fetch('http://127.0.0.1:8090/api/collections/notes', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            }),
        });
    }
/** 
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
*/
    const handleDelete = async (id: number) => {
        try {
          await deleteNode(id);
          router.refresh();
          router.back();
        } catch (error) {
          console.error('Fehler beim Löschen:', error);
        }
    };

    return(
        <div>
            <h1>notes/{note.id}</h1>
            <div className={styles.note}>
                <form onSubmit={update}>
                    <h3>Update note</h3>
                    <input 
                        type="text"
                        placeholder="Title" /** 
                        value={formData.title}
                        onChange={handleChange}
                        */
                    />
                    <textarea
                        placeholder="Content"/** 
                        value={formData.content}
                        onChange={handleChange}
                        */
                    />
                    <button className={styles.action} type="submit">Update note</button>
                </form>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
        </div>
    );
}
