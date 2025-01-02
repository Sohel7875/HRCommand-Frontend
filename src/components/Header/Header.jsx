import { useLocation } from 'react-router-dom';
import styles from './Header.module.css';
import { Avatar } from '../../assets';
import { FiMail, FiBell } from 'react-icons/fi';
import { useState } from 'react';

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    let pathname = location.pathname === '/' ? 'Candidates' : location.pathname.split('/')[1]

    return (
        <div className={styles.header}>
            <div className={styles.pathName}>
                <h2>{pathname}</h2>
            </div>
            <div className={styles.actionIcons}>
                <FiMail className={styles.icon} title="Mail" />
                <FiBell className={styles.icon} title="Notifications" />
                <div className={styles.avatarContainer} title="User Profile" onClick={toggleMenu}>
                    <img src={Avatar} alt="User Avatar" className={styles.avatar} />
                </div>
                {isMenuOpen && (
                    <div className={`${styles.dropdownMenu} ${styles.open}`}>
                        <ul>
                            <li>Edit Profile</li>
                            <li>Change Password</li>
                            <li>Manage Notifications</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
