import React from 'react'
import bookImg from '../../public/book_image.png'

interface book{
    title: string,
    author: string,
    publicationYear: string,
    isbn: string,
    description: string
}

const BookCardComponent = (props: book) => {
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
                <section className='text-neutral-500 text-sm font-normal pt-[16px]'>
                    {props.description}
                </section>
            </section>
        </section>
    )
}

export default BookCardComponent