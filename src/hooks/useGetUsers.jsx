import axios from "../api/axios"

const useGetUsers =(uri,setterFucntion,ErrorSetterFuction) =>{
    const getAllUsers = async() =>{
 try {

            const res = await axios.get(uri)
            if (res.status === 200) {
                setterFucntion(res.data.employees)
            }

        } catch (error) {
            console.log(error)
        }
    }

    return getAllUsers
}

export default useGetUsers