'use client'
import React, { useState } from 'react'
import styles from '../styles/DeletePassword.module.css'

const DeleteBookComponent = (props: any) => {
    const { onClose, bookId } = props;
    //console.log(bookId)

    const [bookid, setBookid] = useState('');

    async function addFunc(){
            //console.log(props.bookId);
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/books/${bookId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
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
    
    return (
        <div onClick={onClose} className={styles.editOverlay}>
            <div onClick={(e) => {e.stopPropagation();}} className={styles.editModalContainer}>
                <div className={styles.editDataText}> Delete </div>
                <div className={styles.editBtnContainer}>
                    <button className={styles.cancelBtn} onClick={onClose}>cancel</button>
                    <button className={styles.saveBtn} onClick={addFunc}>
                        <div className={styles.saveText}>Delete</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBookComponent