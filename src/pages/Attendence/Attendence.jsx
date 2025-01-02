import styles from './Attendence.module.css'
import { FiMoreVertical, FiSearch } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';



const colorMap = {
    'Present': '#1C982E',
    'Work from Home': '#62C9CD',
    'Medical Leave': '#DAC400',
    'Absent': "#FF3D3D",

}

const Attendence = () => {
    const [employee, setEmployees] = useState([])
    const [openMenuIndex, setOpenMenuIndex] = useState(null);
    const [attendenceError,setAttendeceError] = useState('')
    const getAllEmployees = async () => {
        try {

            const res = await axios.get('/employee/getAllEmployees')

            //   console.log(res)
            if (res.status === 200) {
                setEmployees(res.data.employees)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllEmployees()
    }, [])

    const handleStatusClick = (index) => {
        setAttendeceError('')
        setOpenMenuIndex(openMenuIndex === index ? null : index);
      };


      const handleClickOutside = (event) => {
        if (!event.target.closest(`.${styles.statusMenu}`)) {
            setOpenMenuIndex(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



      const handleStatusChange = async (status, employeeID) => {
    
        const prevEmployee = [...employee];
    
        const newEmployee = employee?.map((emp) => {
          if (emp?._id === employeeID) {
            return { ...emp, Status:status};
          }
          return emp;
        });

    
        setEmployees(newEmployee)
    
        try {
          const res = await axios.post('/employee/attendence/update', {  employeeID, status })
          if (res.status === 201) {
            setAttendeceError('')
            setOpenMenuIndex(null)
          } else {
            setEmployees(prevEmployee)
    
          }
    
        } catch (error) {
          console.error("Error updating employee status:", error?.response?.data?.message);
          setAttendeceError( error?.response?.data?.message)
          setEmployees(prevEmployee);
        }
    
    
    
    
      };
    return (
        <div>
            <div className={styles.CandidatesHeader}>
                <div className={styles.FilterButtonsContainer}>
                    <select name="" id="">
                        <option value="All">All</option>
                    </select>

                </div>

                <div className={styles.searchAndAdd}>
                    <div className={styles.searchContainer}>
                        <FiSearch className={styles.searchIcon} />
                        <input type="text" placeholder="Search" className={styles.searchInput} />
                    </div>

                </div>
            </div>

            <div className={styles.CandidatesDetailsTable}>
                <div className={styles.tableWrapper}>
                    <table>
                        <thead>
                            <tr>
                                <th>Profile</th>
                                <th>Employee Name</th>
                                <th>Designation</th>
                                <th>Department</th>
                                <th>Tasks</th>
                                <th>Status</th>


                            </tr>
                        </thead>
                        <tbody>
                            {employee?.length > 0 && employee.map((employee, index) => {
                                return <tr key={index} style={{
                                    color: employee.Status === 'Work from Home' || employee.Status === 'Present' ? '#121212' : colorMap[employee.Status]
                                }}>
                                    <td><img src={employee.profilePicture} alt="profile" className={styles.Avatar} /></td>
                                    <td>{employee.fullname}</td>
                                    <td>{employee.Position}</td>
                                    <td>{employee.Department}</td>
                                    <td>{employee.Task}</td>
                                    <td>
                                        <div className={styles.actionContainer}>
                                            <span 
                                            className={styles.Employeestatus}
                                            style={{ color: colorMap[employee.Status] }}  
                                            onClick={() => handleStatusClick(index)}> {employee?.Status}
                                            
                                            </span>
                                            <button
                                                className={styles.statusMenuItem}
                                                // onClick={() => handleMenuToggle(employee?._id)}
                                            >
                                                <FiMoreVertical />
                                            </button>
                                            {openMenuIndex === index && (
                                                <div className={styles.statusMenu}>
                                                    {attendenceError?.length>0 && <span>{attendenceError}</span>}

                                                    {['Present', 'Work from Home', 'Medical Leave', 'Absent'].map(status => (
                                                        <button
                                                            key={status}
                                                            onClick={() => handleStatusChange(status, employee?._id)}
                                                            className={styles.statusMenuItem}
                                                        >
                                                            
                                                            {status}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>


                                    </td>



                                </tr>
                            }

                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* {isModalOpen && (
        <UpdateEmployee handleCloseModal={handleCloseModal} getAllEmployees={getAllEmployees}
            formatDate={formatDate}
            selectedEmployee={selectedEmployee}
        />
    )} */}

            {/* <ConfirmModal
isOpen={isConfirmScreenOpen}
onClose={onConfirmScreenClose}
onConfirm={handleConfirmDelete}
message="Are you sure you want to delete this candidate? This action cannot be undone."
title="Confirm Deletion"
/> */}

        </div>
    )
}

export default Attendence