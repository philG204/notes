'use client'

import styles from '../Notes.module.css';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const NotePage = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const router = useRouter();
    const [note, setNote] = useState({ id: '', title: '', content: '' });
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const loadNote = async () => {
        try {
            console.log("lade note Daten");
            const res = await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${id}`);
            const data = await res.json();
            setNote(data);
            setTitle(data.title);
            setContent(data.content);
        } catch (error) {
            console.error('Fehler beim Laden der Notiz:', error);
        }
    }

    const  updateNote = async () => {
        try{
            await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content
            }),
        });
        console.log('Notiz erfolgreich aktualisiert.');
        router.back();
        } catch(error){
            console.error('Fehler beim Aktualisieren der Notiz:', error);
        }
    }

    const deleteNode = async () => {
        try{
            await fetch(`http://127.0.0.1:8090/api/collections/notes/records/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id
            }),
        });
        console.log('Notiz erfolgreich gelöscht.');
        router.back();
        } catch(error){
            console.error('Fehler beim Löschen der Notiz:', error);
        }
    }
    useEffect(() => {
        loadNote();
    }, []);


    return(
        <div onLoad={loadNote}>
            <h1>notes/{note.id}</h1>
            <div className={styles.note}>
                <form>
                    <h3>Update note</h3>
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
                    <button onClick={() => updateNote} className={styles.action} >Update note</button>
                </form>
                <button onClick={() => deleteNode}>Delete</button>
            </div>
        </div>
    );
}

export default NotePage;


/** 
    const [formData, setFormData] = useState({
        title: '',
        content: ''
      });
    */
/** 
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    */

      /** 
 * const handleTitleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTitle(event.target.value);       
    };

    const handleContentChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setContent(event.target.value);
    };

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

const handleDelete = async (id: string) => {
        try {
          await deleteNode(id);
          router.refresh();
          router.back();
        } catch (error) {
          console.error('Fehler beim Löschen:', error);
        }
    };

    const handleUpdate = async (id: string, title: String, content: String) => {
        try {
            console.log(id);
            console.log(title);
            console.log(content);

            await update(id, title, content);
            //router.refresh();
            //router.back();
        } catch (error) {
          console.error('Fehler beim Aktuallisieren:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const noteData = await getNote(id);
            setNote(noteData);
            setTitle(noteData.title);
            setContent(noteData.content);

            console.log("inside useEffect");
            console.log(title);
            console.log(content);
        };
        fetchData();
    }, [id]);
    */
