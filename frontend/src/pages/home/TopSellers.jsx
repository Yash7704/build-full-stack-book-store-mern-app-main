import React , {useEffect, useState}  from 'react'
import BookCard from '../books/BookCard';

import{ Swiper, SwiperSlide } from 'swiper/react';
import{Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useFetchAllBooksQuery } from '../../redux/features/cart/booksApi';


const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"];

const TopSellers = () => {
  
    const[books, setBooks] = useState([])
    const[selectesdCategory, setSelectedCategory] = useState("Choose a genre")
    // const { data: response = {} } = useFetchAllBooksQuery();
    // const books = response.book || [];


    useEffect(() => {
        fetch("books.json").then((res) => res.json())
        .then((data) => setBooks(data))
     }, [])

     const filterBooks = selectesdCategory === "Choose a genre" ? books : books.filter((book) => book.category === selectesdCategory.toLowerCase())

  return (
    <div className="py-10 ">
      <h1 className="text-3xl font-semibold mb-6">Top Sellers</h1>
      {/* category filtering */}
      <div>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md p-2 focus:outline-none"
        >
          {categories.map((category, index) => (
            <option value={category} key={index}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {filterBooks.length > 0 &&
          filterBooks.map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default TopSellers
