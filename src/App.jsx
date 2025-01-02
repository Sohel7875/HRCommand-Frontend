import { Routes, Route } from 'react-router-dom'
import NormalLayout from './layout/NormalLayout'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import AuthLayout from './layout/AuthLayout'
import Candidates from './pages/Candidates/Candidates'
import RequireAuth from './components/RequireAuth/RequireAuth'
import PersistLogin from './components/PersistLogin/PersistLogin'
import Employees from './pages/Employees/Employees'
import Attendence from './pages/Attendence/Attendence'

const App = () => {
  return (
    <Routes>
      <Route path='/auth' element={<NormalLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
      </Route>

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<AuthLayout />} >
            <Route index element={<Candidates />} />
            <Route path='/candidates' element={<Candidates />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/attendance' element={<Attendence />} />
            <Route path='/leaves' element={<Candidates />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>

  )
}

export default App