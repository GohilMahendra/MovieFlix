import { useEffect, useState } from "react"
import { ApiResponse, Movie } from "../../types/Movies"
import { searchMovies } from "../../apis/MovieApi"
import { Alert } from "react-native"

const useSearch = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [movies, setMovies] = useState<Movie[]>([])
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState<string>("")
    const getSearchResult = async () => {
        try {
            setLoading(true)
            const response = await searchMovies(searchTerm)
            const apiResponse = response as ApiResponse
            const results = apiResponse.results
            setMovies(results)

            setLoading(false)
        }
        catch (err: any) {
            Alert.alert("Error", JSON.stringify(err))
            console.log(err)
            setLoading(false)
            setError(error)
        }
    }
    useEffect(() => {
        if (!searchTerm)
            return

        getSearchResult()
    }, [searchTerm])

    return {
        loading,
        movies,
        searchTerm,
        setSearchTerm
    }
}
export default useSearch