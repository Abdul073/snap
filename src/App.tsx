import { Routes, Route } from 'react-router-dom';
import './index.css';
import SigninForm from './_auth/forms/SigninForm';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';

import { Toaster } from "@/components/ui/toaster"





const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/*public routes */}
        <Route element={<AuthLayout/>}>
          <Route path='/sigh-in' element={<SigninForm/>}/>
          <Route path='/sigh-up' element={<SignupForm/>}/>
        </Route>





        {/*private routes */}
        <Route element={<RootLayout/>}>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
      <Toaster/>
    </main>
  )
}

export default App