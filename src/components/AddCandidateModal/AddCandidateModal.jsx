import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUpload, FiX } from 'react-icons/fi'
import styles from './AddCandidateModal.module.css'

import axios from "../../api/axios";


const AddCandidateModal = ({ handleCloseModal ,getAllCandidates}) => {

    const [fileName, setFileName] = useState('')
    const [apiError, setApiError] = useState('')
    const {
        register,
        handleSubmit,
        formState: { errors,isValid  },
        trigger
    } = useForm({
        mode: 'onChange', 
    });

    const onSubmit = async (data) => {
        setApiError('')
        const formData = new FormData();
        formData.append('file', data.resume[0]);
        formData.append('fullName', data.fullName);
        formData.append('email', data.email);
        formData.append('experience', data.experience);
        formData.append('phoneNumber', data.phoneNumber);
        formData.append('department', data.department);

        try {
            const res = await axios.post('/candidate/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            if (res.status === 201) {
                getAllCandidates()
                handleCloseModal()
            }
        } catch (error) {
            setApiError( error.response?.data?.error)
            console.error(error.response?.data?.error);
        }
    };

  

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Add New Candidate</h2>
                    <button className={styles.closeButton} onClick={handleCloseModal}>
                        <FiX />
                    </button>
                </div>
              
                <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
                {apiError?.length>0 && <span className={styles.error}>{apiError}</span>}
                    <div className={styles.row}>
                        <div className={styles.inputField}>

                            <input
                                placeholder="Full Name"
                                type="text"
                                {...register("fullName", { required: "Full Name is required" })}
                            />
                            {errors.fullName && (
                                <span className={styles.error}>{errors.fullName.message}</span>
                            )}
                        </div>
                        <div className={styles.inputField}>

                            <input
                                placeholder="Email Address"
                                type="text"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className={styles.error}>{errors.email.message}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputField}>

                            <input
                                type="text"
                                placeholder="Phone Number"
                                {...register("phoneNumber", {
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Invalid phone number",
                                    },
                                })}
                            />
                            {errors.phoneNumber && (
                                <span className={styles.error}>
                                    {errors.phoneNumber.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.inputField}>

                            <input
                                type="text"
                                placeholder="Department"
                                {...register("department", {
                                    required: "Department is required",
                                })}
                            />
                            {errors.department && (
                                <span className={styles.error}>
                                    {errors.department.message}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputField}>

                            <input
                                type="text"
                                placeholder="Experience"
                                {...register("experience", {
                                    required: "Experience is required",
                                })}
                            />
                            {errors.experience && (
                                <span className={styles.error}>
                                    {errors.experience.message}
                                </span>
                            )}
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.customFileInput}>
                                <input
                                    type="file"
                                    id="resume"
                                    {...register("resume", { required: "Resume is required" })}
                                    onChange={(e) =>{ 
                                        trigger("resume"); 
                                        setFileName(e.target.files[0]?.name || "")}}
                                />
                                <span className={styles.placeholder}>
                                    {fileName || "Resume *"}
                                </span>
                                <span className={styles.uploadIcon}>
                                    <FiUpload />
                                </span>
                            </div>
                            {errors.resume && (
                                <span className={styles.error}>{errors.resume.message}</span>
                            )}
                        </div>

                    </div>

                    <div className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            {...register("declaration", {
                                required: "You must agree to the declaration",
                            })}
                        />
                        <label>
                            I hereby declare that the above information is true to the best
                            of my knowledge and belief.
                        </label>
                        {errors.declaration && (
                            <span className={styles.error}>
                                {errors.declaration.message}
                            </span>
                        )}
                    </div>

                    <button type="submit" className={`${styles.saveButton} ${!isValid?styles.disabledButton:null}`} disabled={!isValid} >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddCandidateModal;