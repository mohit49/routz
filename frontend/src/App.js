import React, { useState, createContext, Suspense } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import '../src/App.scss';
import Spinner from 'react-bootstrap/Spinner';
import Header from "../src/includes/Header/Header";
import { motion } from "framer-motion";

import Login from "./Pages/Login/Login";

import Profile from "./Pages/Profile/Profile"
 
import ViewEvent from "./Pages/ViewEvent/ViewEvent";
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Register = React.lazy(() => import("./Pages/Register/Register"));
const CreateEvent = React.lazy(() => import("./Pages/CreateEvent/CreateEvent"));
export const Data = createContext();

const PageLayout = ({ children }) => children;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5,
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <Suspense>
        <motion.div
          key={pathname}
          initial='initial'
          animate='in'
          variants={pageVariants}
          transition={pageTransition}>
          <Outlet />
        </motion.div>
      </Suspense>
    </PageLayout>
  );
};
export function App() {
  const [loginState, setLoginState] = useState(false);

  const [profileData, setProfileData] = useState();
  const webStore = {
    setLoginState,
    loginState,
    setProfileData,
    profileData,
  };
  return (
    <Data.Provider value={webStore}>
      <Router>
        <Header />

        <Routes>
          <Route element={<AnimationLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create-events' element={<CreateEvent />} />

            <Route path='/event'>
              <Route path=':eventName' element={<ViewEvent />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Data.Provider>
  );
}
