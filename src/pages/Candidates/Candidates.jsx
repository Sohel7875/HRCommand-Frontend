import { useEffect, useState } from 'react';
import AddCandidateModal from '../../components/AddCandidateModal/AddCandidateModal';
import styles from './Candidates.module.css';
import { FiSearch, FiDownload, FiTrash2 } from 'react-icons/fi';
import axios from '../../api/axios';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';





const colorMap = {
  New: '#121212',
  ongoing: '#1C982E',
  Rejected: '#FF3D3D',
  Selected: "#783FED",
  Scheduled: '#DAC400'

}

const Candidates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidates, setCandidates] = useState([])
  const [isConfirmScreenOpen, setIsConfirmScreenOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const handleStatusClick = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const onConfirmScreenOpen = (candidateId) => {
    setSelectedCandidateId(candidateId);
    setIsConfirmScreenOpen(true);
  };


  const onConfirmScreenClose = () => {
    setIsConfirmScreenOpen(false);
    setSelectedCandidateId(null);
  };


  const handleConfirmDelete = () => {
    if (selectedCandidateId) {
      handleDelete(selectedCandidateId);
      onConfirmScreenClose();
    }
  };

  const handleDelete = async (candidateID) => {

    const prevCandidate = [...candidates]
    const newCandidates = candidates?.filter((candidate) => candidate?._id !== candidateID)
    setCandidates(newCandidates)

    try {

      const res = await axios.delete(`/candidate/delete/${candidateID}`)

      if (res.status === 200) {
        setIsConfirmScreenOpen(false)
        setSelectedCandidateId(null)
      }

    } catch (error) {
      console.error("Error deleting candidate:", error);
      setCandidates(prevCandidate);
    }
  }

  const handleStatusChange = async (status, candidateID) => {

    const prevCandidate = [...candidates];

    const newCandidates = candidates?.map((candidate) => {
      if (candidate?._id === candidateID) {
        return { ...candidate, status };
      }
      return candidate;
    });

    setCandidates(newCandidates)

    try {
      const res = await axios.put('/candidate/update', { candidateID, status })
      if (res.status === 200) {
        setOpenMenuIndex(null)
      } else {
        setCandidates(prevCandidate)

      }

    } catch (error) {
      console.error("Error updating candidate status:", error);
      setCandidates(prevCandidate);
    }




  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const getAllCandidates = async () => {
    try {

      const res = await axios.get('/candidate/getAllCandidates')
      console.log(res)
      if (res.status === 200) {

        setCandidates(res.data.candidates)
      }

    } catch (error) {

    }
  }

  useEffect(() => {
    getAllCandidates()
  }, [])

  return (
    <div>
      <div className={styles.CandidatesHeader}>
        <div className={styles.FilterButtonsContainer}>
          <select name="" id="">
            <option value="All">All</option>
          </select>
          <select name="" id="">
            <option value="All">All</option>
          </select>
        </div>

        <div className={styles.searchAndAdd}>
          <div className={styles.searchContainer}>
            <FiSearch className={styles.searchIcon} />
            <input type="text" placeholder="Search" className={styles.searchInput} />
          </div>
          <button className={styles.addButton} onClick={handleOpenModal}>Add new Candidate</button>
        </div>
      </div>

      <div className={styles.CandidatesDetailsTable}>
        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Candidate Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>Status</th>
                <th>Experience</th>
                <th>Resume</th>

              </tr>
            </thead>
            <tbody>
              {candidates?.length > 0 && candidates.map((candidate, index) => {
                return <tr key={index} style={{
                  color: colorMap[candidate.status]
                }}>
                  <td>{index < 9 ? `0${index + 1}` : index + 1}</td>
                  <td>{candidate.fullname}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phoneNumber}</td>
                  <td>{candidate.position}</td>
                  <td>
                    <div
                      className={styles.statusCell}
                      onClick={() => handleStatusClick(index)}
                    >
                      {candidate.status}

                    </div>


                    {openMenuIndex === index && (
                      <div className={styles.statusMenu}>
                        {['New', 'Scheduled', 'Selected', 'Rejected'].map(status => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(status, candidate?._id)}
                            className={styles.statusMenuItem}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                  <td>{candidate.experience}</td>
                  <td>
                    <div className={styles.actionContainer}>
                      <a
                        href="#"
                        onClick={() => {
                          const fileUrl = `http://localhost:8080/${candidate.resume}`;
                          window.open(fileUrl, '_blank');
                          console.log(candidate);
                        }}
                      >
                        <FiDownload className={styles.downloadIcon} title="Download Resume" color={colorMap[candidate.status]} />
                      </a>
                      <button onClick={() => onConfirmScreenOpen(candidate._id)} className={styles.deleteButton}>
                        <FiTrash2 className={styles.trashIcon} title="Delete" />
                      </button>
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
        <AddCandidateModal handleCloseModal={handleCloseModal} getAllCandidates={getAllCandidates} />
      )}

      <ConfirmModal
        isOpen={isConfirmScreenOpen}
        onClose={onConfirmScreenClose}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this candidate? This action cannot be undone."
        title="Confirm Deletion"
      />

    </div>
  );
};

export default Candidates;
