import Header from '../components/Header/Header';
import { Outlet } from 'react-router-dom';
import styles from './AuthLayout.module.css'
import SideMenu from '../components/SideMenu/SideMenu';

const AuthLayout = () => {
  return (
    <div className={styles.pageWrapper}>
      <aside className={styles.sideMenu}>
      <SideMenu />
      </aside>
      <section className={styles.mainContainer}>
        <header className={styles.header}>
          <Header />
        </header>
        <main className={styles.content}>
          <Outlet />
        </main>
      </section>
    </div>
  );
};

export default AuthLayout;
