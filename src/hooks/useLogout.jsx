import axios from "../api/axios.js";
import useAuth from "./useAuth";



const useLogout = () => {
    const { setAuth } = useAuth()
    const logout = async () => {
        setAuth({})
        try {
            await axios.get('/auth/logout', {
                withCredentials: true
            })
        } catch (error) {
            console.error(error)
        }
    }
    return logout
}

export default useLogout