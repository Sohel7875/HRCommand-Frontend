import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import { Onboarding, Logo } from '../assets'

const NormalLayout = () => {
  return (
    <div className={styles.NormalLayoutContainer}>
      <div className={styles.NormalLayoutAuthContainer}>
        <div className={styles.NormalLayoutAuth}>
          <div className={styles.AppLogoContainer}>
            <img src={Logo} alt="Logo" />
          </div>
          <div className={styles.AuthContainer}>
            <h3>Welcome to Dashboard</h3>
            <Outlet />
          </div>

        </div>
        <div className={styles.NormalLayoutOnBoardSlider}>
          <img src={Onboarding} alt="onBoarding" />
        </div>

      </div>
    </div>
  )
}

export default NormalLayout