import { useEffect, useState } from "react"
import { ApiResponse, Movie } from "../../types/Movies"
import { BASE_URL } from "../../globals/constants"
import axios from "axios"
import { API_TOKEN } from "../../globals/secrets"

const useSearch = () =>
{
    const [loading,setLoading] = useState<boolean>(false)
    const [movies,setMovies]  = useState<Movie[]>([])
    const [error,setError] = useState<string | null>(null)
    const [searchTerm,setSearchTerm] = useState<string>("")
    const getSearchResult = async() =>
    {
        try
        {
            const quary = `${BASE_URL}search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1`
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
            }
            else {
                console.log(response.data)
            }


        }
        catch(err)
        {

        }
    }
    useEffect(()=>{
        if(!searchTerm)
        return

        getSearchResult()
    },[searchTerm])

    return {
        movies,
        searchTerm,
        setSearchTerm
    }
}
export default useSearch