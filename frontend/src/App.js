import React, { useState, createContext, Suspense  } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Routes, Route, useLocation , Outlet} from "react-router-dom";

import Header from "./includes/Header/Header";


import ViewEvent from "./Pages/ViewEvent/ViewEvent";
import { motion } from "framer-motion";
const Home = React.lazy(() => import('./Pages/Home/Home'));
const CreateEvent = React.lazy(() => import('./Pages/CreateEvent/CreateEvent'));
const Profile = React.lazy(() => import('./Pages/Profile/Profile'));

const Login = React.lazy(() => import('./Pages/Login/Login'));
const Register = React.lazy(() => import('./Pages/Register/Register'));
export const Data = createContext();

const PageLayout = ({ children }) => children;

const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5
};


const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
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
        <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AnimationLayout />}>
            <Route path='/'  element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create-events' element={<CreateEvent />} />

            <Route path='/event'>
              <Route path=':eventName' element={<ViewEvent />} />
            </Route>
          </Route>
        </Routes>
        </Suspense>
      </Router>
    </Data.Provider>
  );
}
