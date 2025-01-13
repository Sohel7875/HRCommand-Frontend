import styles from './SideMenu.module.css';
import { Logo } from '../../assets/index';
import {  NavLink, useLocation } from 'react-router-dom';
import { FiSearch, FiUsers, FiUserCheck, FiLogOut, FiCheckSquare, FiSquare } from 'react-icons/fi';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { useState } from 'react';
import useLogout from '../../hooks/useLogout';


const SideMenuLinks = [
    {
        sectionName: 'Recruitment',
        sectionLinks: [
            {
                itemLink: 'Candidates',
                link: '/candidates',
                activeIcon: <FiUserCheck />,
                inactiveIcon: <FiUsers />,
            },
        ],
    },
    {
        sectionName: 'Organization',
        sectionLinks: [
            {
                itemLink: 'Employees',
                link: '/employees',
                activeIcon: <FiUserCheck />,
                inactiveIcon: <FiUsers />,
            },
            {
                itemLink: 'Attendance',
                link: '/attendance',
                activeIcon: <FiCheckSquare />,
                inactiveIcon: <FiSquare />,
            },
            {
                itemLink: 'Leaves',
                link: '/leaves',
                activeIcon: <FiCheckSquare />,
                inactiveIcon: <FiSquare />,
            },
            {
                itemLink: 'Testing',
                link: '/testing',
                activeIcon: <FiCheckSquare />,
                inactiveIcon: <FiSquare />,
            },
        ],
    },
    {
        sectionName: 'Other',
        sectionLinks: [
            {
                itemLink: 'Log out',
                link: '/logout',
                activeIcon: <FiLogOut />,
                inactiveIcon: <FiLogOut />,
            },
        ],
    },
];

const SideMenu = () => {
    const location = useLocation()

    const [isConfirmScreenOpen, setIsConfirmScreenOpen] = useState(false);
    const logout = useLogout()

    const onConfirmScreenClose = () => {
        setIsConfirmScreenOpen(false);
    };


    const handleConfirmDelete = () => {
      
            logout()
            onConfirmScreenClose();
      
    };

    const onConfirmScreenOpen = (employeeID) => {
        setIsConfirmScreenOpen(true);
      };

    return (
        <nav className={styles.sideMenu}>
            <div className={styles.logoContainer}>
                <img src={Logo} alt="Company Logo" className={styles.logo} />
            </div>
            <div className={styles.searchContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search..."
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.menuContainer}>
                {SideMenuLinks.map((section, index) => (
                    <div className={styles.section} key={index}>
                        <p className={styles.sectionName}>{section.sectionName}</p>
                        <ul className={styles.linkList}>
                            {section.sectionLinks.map((link, indx) => {

                                let isActive = location.pathname === link.link

                                if (location.pathname === '/' && link.link === '/candidates') {
                                    isActive = true
                                }

                                return <li className={styles.linkItem} key={indx}>
                                    {link.link === '/logout' ? (
                                        <button
                                            className={`${styles.inactiveLink} ${styles.logoutButton}`}
                                            onClick={() => {
                                                onConfirmScreenOpen()
                                               
                                            }}
                                        >
                                            <span className={`${styles.icon}`}>{link.inactiveIcon}</span>
                                            LogOut
                                        </button>
                                    ) : (<NavLink
                                        to={link.link}
                                        className={isActive ? styles.activeLink : styles.inactiveLink}
                                    >
                                        <span className={`${styles.icon} ${isActive ? styles.activeIcon : ''}`}>
                                            {isActive ? link.activeIcon : link.inactiveIcon}
                                        </span>
                                        {link.itemLink}
                                    </NavLink>
                                    )
                                    }
                                </li>
                            }
                            )}
                        </ul>
                    </div>
                ))}
            </div>
            <ConfirmModal
                isOpen={isConfirmScreenOpen}
                onClose={onConfirmScreenClose}
                onConfirm={handleConfirmDelete}
                message="Are you sure you want to log out?"
                title="Log Out"
            />
        </nav>
    );
};

export default SideMenu;
