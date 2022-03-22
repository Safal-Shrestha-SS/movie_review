
import React from 'react';
import useAxios from 'axios-hooks'

import { useSelector } from 'react-redux';
import swal from 'sweetalert';
const MovieShow = () => {
    const userInfo = useSelector((state) => state.user.id);
    const home = useSelector((state) => state.search.value)
    const [{ data, loading, error }, refetch, cancelRequest] = useAxios({
        method: 'GET',
        url: 'http://localhost:5000/movie.route/allmovies',
        params: { userId: userInfo },


    });


    const showAlert = (msg, ok) => {
        return (swal(
            ' ', msg, ok
        )
        )
    }


    if (loading) {
        return <div></div>;
    }
    if (data.size === 0) {
        return <div className=' h-3/4 mx-auto  
        bg-blue-800 shadow-lg'></div>
    }
    return (
        <div>
            {home === 1 && refetch()}
            {home === 0 && <div className="   mx-auto  
        bg-blue-800 shadow-lg">
                <div className='' onScroll={refetch}>
                    {data.map(function (d, idx) {
                        let ural = "https://image.tmdb.org/t/p/original/"
                        let hello = ural.concat(d.poster)
                        console.log(hello)
                        return (
                            <div key={idx} className='rounded-lg shadow-lg shadow-cyan-500/50 grid  grid-cols-3 px-7 py-10 w-3/4 mx-auto gap-1 my-5'>
                                <img src={hello} alt='Poster' className=' h-60 w-44' />
                                <div className='col-span-2'>
                                    <div className='font-bold'>{d.movieName}</div>
                                    <div className='font-bold'>📅 {d.releaseDate}</div>
                                    <div className='font-bold'>🌟{d.score}</div>
                                    <div className='font-bold pb-5'> {d.overview}</div>

                                </div>


                            </div>

                            // <li key={idx}>{d.title}</li>
                        )
                    })}
                </div>

            </div >}</div>
    );
};



export default MovieShow;