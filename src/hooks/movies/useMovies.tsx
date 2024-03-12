import { useEffect, useState } from "react"
import { ApiResponse, Movie, MovieCategory } from "../../types/Movies"
import { BASE_URL } from "../../globals/constants"
import axios from "axios"
import { API_TOKEN } from "../../globals/secrets"

const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [category, setCategory] = useState<MovieCategory>("now_playing")
    const getMovies = async () => {
        try {
            const quary = BASE_URL + `movie/${category}?language=en-US&page=1`
            console.log(quary)
            const response = await axios.get(quary, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${API_TOKEN}`
                }
            })
            if (response.data) {
                const apiResponse = response.data as ApiResponse
                const results = apiResponse.results
                setMovies(results)
                setTotalPages(apiResponse.total_pages)
            }
            else {
                console.log(response.data)
            }

        }
        catch (err) {
            console.log(err)
        }
    }
    const getMoreMovies = async () => {
        try {

            if(currentPage >= totalPages)
            {
                return
            }
            const quary = BASE_URL + `movie/${category}?language=en-US&page=${currentPage + 1}`
            const response = await axios.get(quary, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `bearer ${API_TOKEN}`
                }
            })
            if (response.data) {
                const apiResponse = response.data as ApiResponse
                const results = apiResponse.results
                setMovies((prevMovies)=>[...prevMovies,...results])
                setCurrentPage((prevCurrent)=> prevCurrent+1)
            }
            else {
                console.log(response.data)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getMovies()
    }, [category])

    return { movies, loading, error, category, setCategory,getMoreMovies }

}
export default useMovies