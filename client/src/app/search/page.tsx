'use client'
import React, { useEffect, useState } from 'react'
import searchLogo from '../../../public/search_icon.png'
import BookCardComponent from '@/components/BookCardComponent'
import Link from 'next/link'

type Props = {}

const Page = (props: Props) => {

  const [searchedData, setSearchedData] = useState<Array<object>>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const getBooksData = async()=>{
      // get the data from the api
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/books/search?query=${searchQuery}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include'
      });

      // convert the data to json
      const booksDetails = await response.json();
      setSearchedData(booksDetails.data);
      //console.log(booksDetails.data);
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      // Trigger the button click when Enter is pressed
      getBooksData();
    }
  };

  return (
    <article className='w-full flex flex-col'>
      <header className="w-full h-[120px] flex justify-center items-center text-black text-[56px] font-semibold">
        Digital Book Store
      </header>
      <nav className='w-full h-[40px] flex justify-center items-center text-gray-700 text-[28px] font-semibold'>
        <Link href='/' className='w-[120px] border-transparent rounded-xl bg-blue-200 text-center'>Home</Link>
      </nav>
      <section className='w-full p-[16px] flex flex-col justify-center items-center'>
        <section className="w-[563px] h-11 bg-white rounded-[24px] border border-blue-400 flex flex-row justify-between items-center">
          <section className="ml-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e)=>{setSearchQuery(e.target.value)}}
              className="px-1 py-2 border-transparent outline-none rounded-lg"
              placeholder="Enter your search query"
              onKeyDown={handleKeyDown}
            />
          </section>
          <section>
            <button onClick={getBooksData} className=" text-white px-4 py-2 rounded-lg">
              <img src={searchLogo.src} alt="" />
            </button>
          </section>
        </section>

        <section className='w-full pt-[10px]'>
            {
              searchedData.length === 0 ?
              (
                <section className='pt-[10px] w-full flex justify-center'>
                  Enter query to get results
                </section> 
              )
              :
              (
                <section className='w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4'>
                  {
                    searchedData.map((books: any, index)=>(
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
        </section>
      </section>
    </article>
  )
}

export default Page