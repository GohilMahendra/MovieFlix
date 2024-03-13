import { useEffect, useState } from "react"
import { ApiResponse, Movie } from "../../types/Movies"
import { searchMovies } from "../../apis/MovieApi"
import { Alert } from "react-native"
import { debounce } from "lodash";
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
            Alert.alert("Error", err as string)
            console.log(err)
            setLoading(false)
            setError(error)
        }
    }

    const debouncedGetSearchResult = debounce(getSearchResult, 500);
    useEffect(() => {
        if (!searchTerm)
            return
        debouncedGetSearchResult()

        return(()=>debouncedGetSearchResult.cancel())
    }, [searchTerm])

    return {
        loading,
        movies,
        searchTerm,
        setSearchTerm
    }
}
export default useSearch