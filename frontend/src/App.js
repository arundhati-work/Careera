import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import ResumeViewer from './ResumeViewer';
import CoverLetterViewer from './CoverLetterViewer';
import UserProfile from './UserProfile';
import ViewJob from './ViewJob';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard/>
          </PrivateRoute>  
          }/>
          <Route path="/resume/:id" element={<PrivateRoute><ResumeViewer /></PrivateRoute>} />
          <Route path="/coverletter/:id" element={<PrivateRoute><CoverLetterViewer /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/jobs/:id" element={<PrivateRoute><ViewJob /></PrivateRoute>} />

      </Routes>
    </Router>
  );
  
}

export default App;
