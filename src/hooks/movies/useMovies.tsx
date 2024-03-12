import { useEffect, useState } from "react"
import { ApiResponse, Movie, MovieCategory } from "../../types/Movies"
import { BASE_URL } from "../../globals/constants"
import axios from "axios"
import { API_TOKEN } from "../../globals/secrets"
import { fecthMovies } from "../../apis/MovieApi"
import { Alert } from "react-native"

const useMovies = () => {
    const [movies, setMovies] = useState<Movie[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [category, setCategory] = useState<MovieCategory>("now_playing")
    const getMovies = async () => {
        try {
            const response = await fecthMovies(category, 1)
            const { results, page, total_pages } = response as ApiResponse
            setMovies(results)
            setTotalPages(total_pages)
        }
        catch (err) {
            Alert.alert("Error",JSON.stringify(err))
        }
    }
    const getMoreMovies = async () => {
        try {

            if (currentPage >= totalPages) {
                return
            }
            const nextPage = currentPage + 1
            const response = await fecthMovies(category, nextPage)
            const { results } = response as ApiResponse
            setMovies((prevResults) => [...prevResults, ...results])
            setCurrentPage((prevPage) => prevPage + 1)
        }
        catch (err) {
            Alert.alert("Error",JSON.stringify(err))
        }
    }

    useEffect(() => {
        getMovies()
    }, [category])

    return { movies, loading, error, category, setCategory, getMoreMovies }

}
export default useMovies