import { useEffect, useState } from "react"
import { ApiResponse, Movie } from "../../types/Movies"
import { searchMovies } from "../../apis/MovieApi"

const useSearch = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const getSearchResult = async () => {
        try {
            const response = await searchMovies(searchTerm)
            if (response.data) {
                const apiResponse = response.data as ApiResponse
                const results = apiResponse.results
                setMovies(results)
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
        if (!searchTerm)
            return

        getSearchResult()
    }, [searchTerm])

    return {
        movies,
        searchTerm,
        setSearchTerm
    }
}
export default useSearch