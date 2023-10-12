'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import BookCardComponent from '@/components/BookCardComponent';
import searchLogo from '../../public/search_icon.png'

export default function Home() {

  const [booksData, setBooksData] = useState<Array<object>>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const limit = 8;

  // Calculate the index range for the current page
  const startIndex = (pageNumber - 1) * limit;
  const endIndex = startIndex + limit;

  useEffect(()=>{
      const getBooksData = async()=>{
          // get the data from the api
          const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/books?page=${pageNumber}&limit=${limit}`, {
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
  }, [pageNumber]);

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
      <article className='w-full h-[600px]'>
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
                    <section key={index} className='w-full px-[8px] py-[16px]'>
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
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded"
          onClick={()=>{setPageNumber(pageNumber - 1)}}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={ booksData.length < limit}
        >
          Next
        </button>
      </div>
    </main>
  )
}