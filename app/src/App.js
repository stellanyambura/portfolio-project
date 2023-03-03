import React from 'react';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from './components/Navbar';
import Home from './components/Home';
 import './App.css';
import Login from './components/Login';
import 'semantic-ui-css/semantic.min.css'
import ProjectList from './components/Projects';
import Users from './components/Users';





function App() {
  return (
      <div>
        
      
          <BrowserRouter>
          <Nav/>
              <Routes>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/users' element={<Users/>}/>
                  <Route path='/Projectlist' element={<ProjectList/>}/>
                 </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
