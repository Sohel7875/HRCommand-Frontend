import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiCalendar, FiX } from "react-icons/fi";
import styles from "./UpdateEmployee.module.css";
import axios from "../../api/axios";

const UpdateEmployee = ({ handleCloseModal, getAllEmployees, selectedEmployee, formatDate }) => {
    const [apiError, setApiError] = useState("");
    const [selectedDate,setSelectedDate] = useState(formatDate(selectedEmployee?.dateOfJoining) || "")
    const [defaultValues, setDefaultValues] = useState({});
  
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        trigger,
        watch,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            fullname: selectedEmployee?.fullname || "",
            email: selectedEmployee?.email || "",
            Phone_Number: selectedEmployee?.Phone_Number || "",
            Department: selectedEmployee?.Department || "",
            Position: selectedEmployee?.Position || "",
            dateOfJoining: formatDate(selectedEmployee?.dateOfJoining) || "",
        },
    });

    useEffect(() => {
        setDefaultValues({
            fullname: selectedEmployee?.fullname || "",
            email: selectedEmployee?.email || "",
            Phone_Number: selectedEmployee?.Phone_Number || "",
            Department: selectedEmployee?.Department || "",
            Position: selectedEmployee?.Position || "",
            dateOfJoining: formatDate(selectedEmployee?.dateOfJoining) || "",
        });
    }, [selectedEmployee, formatDate]);

    const currentValues = watch();

    const hasChanges = JSON.stringify(currentValues) !== JSON.stringify(defaultValues);

    const onSubmit = async (data) => {
        setApiError("");

        try {

            console.log(data)
            const res = await axios.put(`/employee/update`,{employeeID:selectedEmployee?._id,UpdatedValues:data}, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.status === 200) {
                // console.log(res)
                getAllEmployees(); 
                handleCloseModal(); 
            }
        } catch (error) {
            setApiError(error.response?.data?.error || "Failed to update employee details.");
            console.error(error.response?.data?.error || error.message);
        }
    };

    const handleInputChange = (name, value) => {
        if(name ==='dateOfJoining'){
            setSelectedDate(value)
        }
        setValue(name, value, { shouldValidate: true });
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h2>Edit Employee Details</h2>
                    <button className={styles.closeButton} onClick={handleCloseModal}>
                        <FiX />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
                    {apiError && <span className={styles.error}>{apiError}</span>}

                    <div className={styles.row}>
                        <div className={styles.inputField}>
                            <input
                                placeholder="Full Name"
                                type="text"
                                {...register("fullname", { required: "Full Name is required" })}
                                onChange={(e) => handleInputChange("fullname", e.target.value)}
                            />
                            {errors.fullname && (
                                <span className={styles.error}>{errors.fullname.message}</span>
                            )}
                        </div>
                        <div className={styles.inputField}>
                            <input
                                placeholder="Email Address"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                            {errors.email && (
                                <span className={styles.error}>{errors.email.message}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputField}>
                            <input
                                placeholder="Phone Number"
                                type="text"
                                {...register("Phone_Number", {
                                    required: "Phone Number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message: "Invalid phone number",
                                    },
                                })}
                                onChange={(e) => handleInputChange("Phone_Number", e.target.value)}
                            />
                            {errors.Phone_Number && (
                                <span className={styles.error}>{errors.Phone_Number.message}</span>
                            )}
                        </div>
                        <div className={styles.inputField}>
                            <input
                                placeholder="Department"
                                type="text"
                                {...register("Department", { required: "Department is required" })}
                                onChange={(e) => handleInputChange("Department", e.target.value)}
                            />
                            {errors.Department && (
                                <span className={styles.error}>{errors.Department.message}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.inputField}>
                            <input
                                placeholder="Position"
                                type="text"
                                {...register("Position", { required: "Position is required" })}
                                onChange={(e) => handleInputChange("Position", e.target.value)}
                            />
                            {errors.Position && (
                                <span className={styles.error}>{errors.Position.message}</span>
                            )}
                        </div>
                        <div className={styles.inputField}>
                            <div className={styles.customFileInput}>
                                <input
                                    type="date"
                                    {...register("dateOfJoining", {
                                        required: "Date of Joining is required",
                                    })}
                                    onChange={(e) => handleInputChange("dateOfJoining", e.target.value)}
                                />
                                <span className={styles.placeholder}>
                                    {selectedDate || "Date of Joining *"}
                                </span>
                                <span className={styles.uploadIcon}>
                                    <FiCalendar />
                                </span>
                            </div>
                            {errors.dateOfJoining && (
                                <span className={styles.error}>{errors.dateOfJoining.message}</span>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`${styles.saveButton} ${!isValid || !hasChanges ? styles.disabledButton : ""}`}
                        disabled={!isValid || !hasChanges}
                    >
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateEmployee;
