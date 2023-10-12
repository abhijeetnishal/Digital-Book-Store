'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import BookCardComponent from '@/components/BookCardComponent';
import searchLogo from '../../public/search_icon.png'

export default function Home() {

  const [booksData, setBooksData] = useState<Array<object>>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(()=>{
      const getBooksData = async()=>{
          // get the data from the api
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/books?page=${2}&limit=${8}`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include'
          });

          // convert the data to json
          const booksDetails = await response.json();
          setBooksData(booksDetails.data);
          //console.log(booksDetails.data);
      }

      getBooksData()

      .catch(console.error);
  }, []);

  return (
    <main className="w-full flex flex-col p-[16px]">
      <header className="w-full h-[50px] flex justify-center items-center text-black text-[56px] font-semibold">
        Digital Book Store
      </header>
      <nav className="w-full h-[70px] flex flex-row">
        <section className="w-full h-[35px] flex justify-start pl-[8px]">
          <Link href='/search' className="w-[180px] flex justify-center items-center border rounded-lg bg-gray-200 text-black font-bold">
            Search Books <span className='pl-[4px]'><img className='h-[18px]' src={searchLogo.src} alt="" /></span>
          </Link>
        </section>
      </nav>
      <article className='w-full '>
          {
            booksData.length === 0 ?
            (
              <section>
                Loading...
              </section> 
            )
            :
            (
              <section className='w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
                {
                  booksData.map((books: any, index)=>(
                    <section key={index} className='w-full p-[8px]'>
                      <BookCardComponent title={books.title} author={books.author} 
                      publicationYear={books.publicationYear} isbn={books.isbn} 
                      description={books.description} />
                    </section>
                  ))
                }
              </section>
            )
          }
      </article>
    </main>
  )
}