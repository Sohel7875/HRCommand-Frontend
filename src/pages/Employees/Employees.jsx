import { FiMoreVertical, FiSearch } from 'react-icons/fi';
import styles from './Employees.module.css'
import { Avatar } from '../../assets';
import { useEffect,  useState } from 'react';
import axios from '../../api/axios';
import UpdateEmployee from '../../components/UpdateEmployee/UpdateEmployee';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';





const Employees = () => {


    const [employee, setEmployees] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [openMenuId, setOpenMenuId] = useState(null);

    const [isConfirmScreenOpen, setIsConfirmScreenOpen] = useState(false);
    const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);

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
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleClick = (employee) => {
        setSelectedEmployee(employee)
        handleOpenModal()
    }

   

    const handleMenuToggle = (id) => {
        setOpenMenuId((prev) => (prev === id ? null : id));
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest(`.${styles.dropdownMenu}`) && !event.target.closest(`.${styles.statusMenuItem}`)) {
            setOpenMenuId(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleEdit =(employee) =>{
        handleClick(employee)
        setOpenMenuId(null)
    }

    const onConfirmScreenOpen = (employeeID) => {
        setSelectedEmployeeID(employeeID);
        setIsConfirmScreenOpen(true);
      };
    
    
      const onConfirmScreenClose = () => {
        setIsConfirmScreenOpen(false);
        setSelectedEmployeeID(null);
      };
    
    
      const handleConfirmDelete = () => {
        if (selectedEmployeeID) {
          handleDelete(selectedEmployeeID);
          onConfirmScreenClose();
        }
      };

      const handleDelete =async(employeeID) =>{


         const prevEmployee = [...employee]
            const newCandidates = employee?.filter((emp) => emp?._id !== employeeID)
            setEmployees(newCandidates)
        
            try {
        
              const res = await axios.delete(`/employee/delete/${employeeID}`)
        
              if (res.status === 200) {
                setIsConfirmScreenOpen(false)
                setSelectedEmployeeID(null)
              }
        
            } catch (error) {
              console.error("Error deleting candidate:", error);
              setEmployees(prevEmployee);
            }
      }
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
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Date of Joining</th>


                            </tr>
                        </thead>
                        <tbody>
                            {employee?.length > 0 && employee.map((employee, index) => {
                                return <tr key={index} >
                                    <td><img src={Avatar} alt="profile" className={styles.Avatar} /></td>
                                    <td>{employee.fullname}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.Phone_Number}</td>
                                    <td>{employee.Position}</td>
                                    <td>{employee.Department}</td>
                                    <td>
                                        <div className={styles.actionContainer}>
                                            {formatDate(employee.dateOfJoining)}
                                            <button
                                                className={styles.statusMenuItem}
                                                onClick={() => handleMenuToggle(employee?._id)}
                                            >
                                                <FiMoreVertical />
                                            </button>
                                            {openMenuId === employee._id && (
                                                <div className={styles.dropdownMenu}>
                                                    <button
                                                        className={styles.dropdownItem}
                                                        onClick={() => {
                                                            handleEdit(employee);
                                                            setOpenMenuId(null);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className={styles.dropdownItem}
                                                        onClick={() => {
                                                            onConfirmScreenOpen(employee._id)
                                                            setOpenMenuId(null);
                                                        }}
                                                    >
                                                        Delete
                                                    </button>
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
            {isModalOpen && (
                <UpdateEmployee handleCloseModal={handleCloseModal} getAllEmployees={getAllEmployees}
                    formatDate={formatDate}
                    selectedEmployee={selectedEmployee}
                />
            )}

            <ConfirmModal
      isOpen={isConfirmScreenOpen}
      onClose={onConfirmScreenClose}
      onConfirm={handleConfirmDelete}
      message="Are you sure you want to delete this candidate? This action cannot be undone."
      title="Confirm Deletion"
    />

        </div>
    )
}

export default Employees