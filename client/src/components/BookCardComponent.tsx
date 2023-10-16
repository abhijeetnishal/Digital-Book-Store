'use client'
import React, { useState } from 'react'
import bookImg from '../../public/book_image.png'
import EditBookComponent from './EditBookComponent'
import DeleteBookComponent from './DeleteBookComponent'

interface book{
    bookId: string,
    title: string,
    author: string,
    publicationYear: string,
    isbn: string,
    description: string
}

const BookCardComponent = (props: book) => {
    const [showPopUpDelete, setShowPopUpDelete] = useState<boolean>(false);
    const [showPopUpEdit, setShowPopUpEdit] = useState<boolean>(false);

    function handleCloseDialogDelete(){
        setShowPopUpDelete(false);
    }
  
    function handleCloseDialogEdit(){
        setShowPopUpEdit(false);
    }
    return (
        <section className='w-full h-[240px] bg-white rounded-lg shadow p-[16px]'>
            <section className='w-full flex flex-col'>
                <section className='w-full flex flex-row pb-[8px]'>
                    <img className='w-[90px] h-full' src={bookImg.src} alt="" />
                    <section className='w-[calc(100%-70px)] pl-[8px] flex flex-col '>
                        <section className='text-neutral-800 text-md font-semibold'>
                            {props.title}
                        </section>
                        <section className='pt-[5px] text-neutral-600 text-md font-medium'>
                            By {props.author}
                        </section>
                        <section className='pt-[18px] text-neutral-800 text-[16px] font-normal'>
                            Publication Year - {props.publicationYear}
                        </section>
                        <section className='text-neutral-800 text-[16px] font-normal'>
                            ISBN :- {props.isbn} 
                        </section>
                    </section>
                </section>
                <section className='text-neutral-500 text-sm font-normal pb-[5px]'>
                    {props.description}
                </section>
                <section className='w-full flex flex-row'>
                    <button onClick={()=>setShowPopUpEdit(true)} className='w-[50px] mr-[8px] items-center border rounded-lg bg-gray-200 text-black font-bold'>
                        Edit
                    </button>
                    {
                        (showPopUpEdit) && (
                            <EditBookComponent
                                bookId = {props.bookId}
                                onClose={handleCloseDialogEdit}
                            />
                        )
                    }
                    <button onClick={()=>setShowPopUpDelete(true)} className='w-[70px] items-center border rounded-lg bg-gray-200 text-black font-bold'>
                        Delete
                    </button>
                    {
                        (showPopUpDelete) && (
                            <DeleteBookComponent
                                bookId = {props.bookId}
                                onClose={handleCloseDialogDelete}
                            />
                        )
                    }
                </section>
            </section>
        </section>
    )
}

export default BookCardComponent