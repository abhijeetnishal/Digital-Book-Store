import React, { useState } from 'react'
import styles from '../styles/EditPassword.module.css'

const CreateBookComponent = (props: any) => {
    const { onClose } = props;

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [pubYear, setPubYear] = useState('');
    const [isbn , setIsbn] = useState('');
    const [desc, setDesc] = useState('');
    const [message, setMessage] = useState('');

    async function addFunc(){
      if(title && author && pubYear && isbn && desc){
        const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/books`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title, 
            author: author, 
            publicationYear: pubYear, 
            isbn: isbn, 
            description: desc
        }),
        credentials: 'include',
        });
        response.json().then(data => ({
            data: data,
        })
        ).then(res => {
            //console.log(res);
            window.location.reload();
        })
      }
      else{
        setMessage('Enter All Details');
      }
    }
    
    return (
        <div onClick={onClose} className={styles.editOverlay}>
            <div onClick={(e) => {e.stopPropagation();}} className={styles.editModalContainer}>
                <div className={styles.editDataText}>Add New </div>
                <div className={styles.passwordContainer}>
                    
                    <div>
                        <input className={styles.inputField} type="text" value={title} placeholder='Title' onChange={(e)=>setTitle(e.target.value)} /> 
                    </div>
                </div>
                <div className={styles.passwordContainer}>
                    
                    <div>
                            <input className={styles.inputField} type="text" value={author} placeholder='Author' onChange={(e)=>setAuthor(e.target.value)} />
                    </div>
                </div>
                <div className={styles.passwordContainer}>
                    
                    <div>
                            <input className={styles.inputField} type="text" value={pubYear} placeholder='Publication Year' onChange={(e)=>setPubYear(e.target.value)} />
                    </div>
                </div>
                <div className={styles.passwordContainer}>
                    
                    <div>
                            <input className={styles.inputField} type="text" value={isbn} placeholder='ISBN' onChange={(e)=>setIsbn(e.target.value)} />
                    </div>
                </div>
                <div className={styles.passwordContainer}>
                    
                    <div>
                            <input className={styles.inputField} type="text" value={desc} placeholder='Description' onChange={(e)=>setDesc(e.target.value)} />
                    </div>
                </div>
                <div className={styles.editBtnContainer}>
                    <button className={styles.cancelBtn} onClick={onClose}>cancel </button>
                    <button className={styles.saveBtn} onClick={addFunc}>
                        <div className={styles.saveText}>Save</div>
                    </button>
                </div>
                <div className={styles.editMessage}>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default CreateBookComponent