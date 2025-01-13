import { FiSearch } from 'react-icons/fi'
import styles from './Leaves.module.css'
import { GrDocument } from 'react-icons/gr'
import { useEffect, useState } from 'react'
import axios from '../../api/axios'
import LeaveCalender from '../../components/LeaveCalender/LeaveCalender'


const colorMap = {
    'Approved': '#1C982E',
    'Pending': '#62C9CD',
    'Rejected': '#FF3D3D',

}

const Leaves = () => {


    const [employeeOnLeave,setEmployeeOnLeave] = useState([])
    const [selectedDate,setSelectedDate] = useState(null)

    const fetchLeaveData = async() =>{
        try {
            const res = await axios.get('/leave/get')

            console.log(res)
            
            if(res?.status===200){

                setEmployeeOnLeave(res?.data?.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() =>{
        fetchLeaveData()
    },[])
    return (
        <div>
            <div className={styles.CandidatesHeader}>
                <div className={styles.FilterButtonsContainer}>
                    <select name="" id="">
                        <option value="All">status</option>
                    </select>

                </div>

                <div className={styles.searchAndAdd}>
                    <div className={styles.searchContainer}>
                        <FiSearch className={styles.searchIcon} />
                        <input type="text" placeholder="Search" className={styles.searchInput} />
                    </div>
                    <button className={styles.addButton} >Add new Leave</button>
                </div>
            </div>
            <div className={styles.tableContainer}>
                <div className={styles.CandidatesDetailsTable}>

                    <div className={styles.tableWrapper}>
                        <div className={styles.tableHeadHeading}>Applied Leaves</div>
                        <table>
                            <thead>


                                <tr>
                                    <th>Sr No.</th>
                                    <th>Profile</th>
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Docs</th>

                                </tr>
                            </thead>

                            <tbody>

                                {
                                    employeeOnLeave?.length > 0 && employeeOnLeave?.map((leave, index) => {
                                        return (
                                            <tr>
                                                <td>{index < 9 ? `0${index + 1}` : index + 1}</td>
                                                <td><img src={leave?.userId?.profilePicture} alt="profile" className={styles.Avatar} /></td>
                                                <td>{leave?.userId?.fullname}</td>
                                                <td>{leave?.startDate?.split('T')[0]}</td>
                                                <td>{leave?.reason}</td>
                                                <td
                                                
                                                style={{ color: colorMap[leave?.status] }}
                                               >{leave?.status}</td>
                                                <td style={{
                                                    display:'flex',
                                                    alignItems:'center',
                                                }}>
                                                    <a 
                                                    style={{
                                                        display:'flex',
                                                        justifyContent:'center',
                                                        alignItems:'center',
                                                        margin:'auto'
                                                    }}
                                                    href={`http://localhost:8080/${leave?.documents[0]}`} target='_blank'>
                                                        <GrDocument />
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>

                        </table>
                    </div>


                </div>


                <div className={styles.CandidatesLeaveCalender}>
                    <div className={styles.leaveCalenderWrapper}>

                        <table>
                            <thead>
                                <tr>
                                    <th>Leave Calender</th>


                                </tr>
                            </thead>
                      <tbody>
                        <tr>
                            <td><LeaveCalender selectedDate={selectedDate} setSelectedDate={setSelectedDate}/></td>
                        </tr>
                        <tr>
                            <td>
                                <p>Approved Leaves</p>
                            </td>
                        </tr>
                      </tbody>


                        </table>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default Leaves