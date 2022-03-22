import React from 'react';
import { useSelector } from 'react-redux';
import MovieSearch from '../components/movieSearch';
import MovieShow from '../components/movieShow';
import SideBar from '../components/sidebar';
import { Top } from '../components/top';

export function Home() {

    const home = useSelector((state) => state.search.value)

    return (
        <div className='bg-white ' >
            <SideBar />
            <Top />
            <div className='bg-yellow-200  mx-auto w-10/12 '>

                {home === 1 && <MovieSearch />}
                {<MovieShow />}
            </div>

        </div>
    )


}
