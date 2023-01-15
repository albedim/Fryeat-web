import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { ChangePassword } from './components/ChangePassword';
import { ForgetPassword } from './components/ForgetPassword';
import React from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { Menu } from './components/Menu';
import { AddPoll } from './components/AddPoll';
import { Vote } from './components/Vote';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/signup'
          element={
            <>
              <SignUp/>
            </>
          }
        />
        <Route
          path='/signin'
          element={
            <>
              <SignIn/>
            </>
          }
          />
        <Route
          path='/changepassword/request'
          element={
            <>
              <ForgetPassword/>
            </>
          }
        />
        <Route
          path='/changepassword/change'
          element={
            <>
              <ChangePassword/>
            </>
          }
        />
        <Route
          path='/myPolls'
          element={
            <>
              <Header page={"My Polls"}/>
              <Dashboard param={"ownPolls"}/>
              <Menu param={"ownpolls"}/>
            </>
          }
        />
        <Route
          path='/polls'
          element={
            <>
              <Header page={"Polls"}/>
              <Dashboard param={"polls"}/>
              <Menu param={"polls"}/>
            </>
          }
        />
        <Route
          path='/poll/:pollId'
          element={
            <>
              <Header page={"Poll"}/>
              <Vote/>
              <Menu param={'null'}/>
            </>
          }
        />
        <Route
          path='/addpoll'
          element={
            <>
              <Header page={"Add Poll"}/>
              <AddPoll/>
              <Menu param={"addpoll"}/>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
