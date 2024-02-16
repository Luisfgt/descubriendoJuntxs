'use client'
import { onAuthStateChanged, getAuth, User, sendEmailVerification } from 'firebase/auth';
import firebase_app from '../firebase/firebase-config';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';  // Importa ReactNode

interface AuthContextProps {
  user: User | null;
  infoUserGlobal: string | null;
  setInfoUserGlobal: React.Dispatch<SetStateAction<string | null>>
  persistirSesion: (user: any) => void;
  logged: any;
  logoutReal: any
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext debe utilizarse dentro de un AuthContextProvider');
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {


  let savedUser: any = ''
  let savedLoggin: any = 'false'



  useEffect(() => {
    savedUser = localStorage.getItem('user')
    savedLoggin = localStorage.getItem('userLogged')
    setInfoUserGlobal(savedUser)
    setLogged(savedLoggin)
  }, [])

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [infoUserGlobal, setInfoUserGlobal] = useState(savedUser ?? '')
  const [logged, setLogged] = useState(savedLoggin ?? 'false')

  const auth = getAuth(firebase_app);

  const persistirSesion = (user: any) => {
    try {
      console.log(user);
      
      const trueWord: any = 'true'
      setInfoUserGlobal(JSON.stringify(user))
      setLogged(trueWord)
      window.localStorage.setItem('user', JSON.stringify(user))
      window.localStorage.setItem('userLogged', 'true')
      console.log(logged);

    } catch (error) {
      alert(error);
    }
  }

  const logoutReal = () => {
    const falseWord: any = 'false'
    setLogged(falseWord)
    window.localStorage.setItem('userLogged', 'false')
  }

 
  useEffect(() => {
    if(!localStorage.getItem('userLogged'))setLogged('false')
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      if (!authUser?.emailVerified && authUser) {
        sendEmailVerification(authUser)
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);


  return (
    <AuthContext.Provider value={{ user, infoUserGlobal, persistirSesion, setInfoUserGlobal, logged, logoutReal }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};