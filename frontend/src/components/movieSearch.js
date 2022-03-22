
import { MdOutlineScreenSearchDesktop, MdClose } from 'react-icons/md';
import React, { useState } from 'react';
import { show } from './movieSearchSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
const MovieSearch = () => {
    const [movie, setMovie] = useState('')
    const [movieList, setMovieList] = useState([])
    const dispatch = useDispatch()
    const showAlert = (msg, ok) => {
        return (swal(
            ' ', msg, ok
        )
        )
    }
    const userInfo = useSelector((state) => state.user.id)

    const searchMovie = async () => {
        axios.get("http://localhost:5000/movie.search/search",
            {
                params: {
                    movie: movie
                }

            }).then(function (response) {
                // console.log(movie);
                setMovieList([])
                setMovieList(response.data.results)
            }).catch(function (error) {

                showAlert(error.response.data.message, 'error');

            })

    }
    const uploadMovie = async (id, movieName, uid, poster, overview, score, releaseDate) => {
        console.log(uid)
        axios.post('http://localhost:5000/movie.route/movieUpload',
            {
                movieId: id.toString(),
                movieName: movieName,
                userId: uid,
                poster: poster || ' ',
                overview: overview || ' ',
                score: score || 0,
                releaseDate: releaseDate
            }
        ).then(function (response) {
            showAlert(response.data.message, 'success')
        }).catch(function (error) {
            console.log(error.response)
            console.log(error.message)
            console.log(error.request)
            // showAlert(error.response.data.message, 'error');
        })

    }

    return (
        <div className="   h-full mx-auto  
        bg-blue-600 shadow-lg">
            <div className="flex flex-row w-3/6 mx-auto place-self-center justify-center">
                <input type='text' placeholder="Movie Name" value={movie}
                    onChange={(e) => setMovie(e.target.value)}
                    className="  rounded  py-1  px-5 	my-3   mx-auto basis-7/9
                 text-gray-700" />
                <div onClick={() => searchMovie()} className='sidebar-icon  basis-1/9'>
                    <MdOutlineScreenSearchDesktop size={32} />
                </div>
                <MdClose onClick={() => dispatch(show())} size={32} className='sidebar-icon basis-1/9' />
            </div>
            <div className=''>
                {movieList.map(function (d, idx) {
                    let ural = "https://image.tmdb.org/t/p/original/"
                    let hello = ural.concat(d.poster_path)
                    console.log(hello)
                    return (
                        <div key={idx} className='rounded-lg shadow-lg shadow-cyan-500/50 grid  grid-cols-3 px-7 py-10 w-3/4 mx-auto gap-1 my-5'>
                            <img src={hello} alt='Poster' className=' h-60 w-44' />
                            <div className='col-span-2'>
                                <div className='font-bold'>{d.original_title}</div>
                                <div className='font-bold'>📅 {d.release_date}</div>
                                <div className='font-bold'>🌟{d.vote_average}</div>
                                <div className='font-bold pb-5'> {d.overview}</div>
                                <button onClick={() => uploadMovie(d.id, d.original_title, userInfo, d.poster_path, d.overview, d.vote_average, d.releaseDate)}
                                    className='text-yellow-100 font-bold py-2 px-5 mb-3 mx-auto bg-blue-500 -translate-y-1 hover:scale-110 hover:bg-indigo-500  transition-all duration-300'>
                                    Add
                                </button>
                            </div>


                        </div>

                        // <li key={idx}>{d.title}</li>
                    )
                })}
            </div>

        </div >
    );
};



export default MovieSearch;