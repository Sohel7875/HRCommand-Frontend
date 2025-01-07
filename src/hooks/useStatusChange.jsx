import axios from "../api/axios";

const useStatusChange = () =>{
    const handleStatusChangeHook = async(uri,status, userId,existingData,setterFucntion,errorSetterFunction,modalSetterFunction) =>{
      console.log(uri,status, userId,existingData,setterFucntion,errorSetterFunction,modalSetterFunction)
   const prevEmployee = [...existingData];
    
        const newEmployee = existingData?.map((emp) => {
          if (emp?._id === userId) {
            return { ...emp, Status:status};
          }
          return emp;
        });

    
        setterFucntion(newEmployee)
    
        try {
          const res = await axios.post(uri, {  employeeID:userId, status })
          if (res.status === 201) {
            errorSetterFunction('')
            modalSetterFunction(null)
          } else {
            setterFucntion(prevEmployee)
    
          }
    
        } catch (error) {
          console.error("Error updating employee status:",error);
          errorSetterFunction( error?.response?.data?.message)
          setterFucntion(prevEmployee);
        }
    
    }

    return handleStatusChangeHook
}

export default useStatusChange