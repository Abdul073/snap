
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react"
import { IContextType, IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";
export const INITIAL_USER = {
    id: '',
    name:'',
    username: '',
    email:'',
    imageUrl:'',
    bio:'',

};
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: ()=> {},
    setIsAuthenticated: ()=> {},
    checkAuthUser: async () => false as boolean,
}

const Authcontex = createContext<IContextType>(INITIAL_STATE)

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user , setUser] = useState<IUser>(INITIAL_USER);
  const[isAuthenticated , setIsAuthenticated] = useState( false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const checkAuthUser = async()=> {
    try {
      const currentAccount = await getCurrentUser();
      if(currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio : currentAccount.bio,
        })
        setIsAuthenticated(true);
        return true;
      }
        return false;

    } catch (error) {
      console.log(error);
      return false;

    }finally{
      setIsLoading(false);
    }
  };
   
  useEffect(() => {
    // localStorage.getItem('cookieFallback') === null
    if(
      localStorage.getItem('cookieFallback') === '[]'
    ) navigate('/src/_auth/forms/SigninForm.tsx');
    
    checkAuthUser();
  }, []);

  const value ={
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }


  return (
    <Authcontex.Provider value={value}>
      {children}

    </Authcontex.Provider>
  )
}

export default AuthProvider
export const useUsersContext = ()=> useContext(Authcontex);