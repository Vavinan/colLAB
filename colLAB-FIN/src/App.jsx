import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { BrowserRouter as Router,Route,Routes, Navigate,Link } from "react-router-dom";
import "./style.scss"
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Posts from "./pages/Posts";
function App() {
  const {currentUser} = useContext(AuthContext)
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>;
    }
    return children
  };
  return (
     <Router>
        <Routes>
          <Route path="/">
            <Route index element={
               <ProtectedRoute>
                  <Home/>
               </ProtectedRoute>
               }/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>
             <Route path ="post" element ={<Posts/>} />
          </Route>
        </Routes>
     </Router>
    );
}

export default App;
