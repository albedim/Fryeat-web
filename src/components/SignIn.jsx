import './styles/pattern.css';
import './styles/components.css';
import { useState } from 'react';
import axios from 'axios';
import { FORGET_PASSWORD_URL, API } from '../utils.ts';
import { SpinnerCircular } from 'spinners-react';
import { Navigate, useNavigate } from 'react-router-dom';
import React from 'react';
import { IonIcon } from 'react-ion-icon';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 13/01/23
 * Created at: 17:14
 * Version: 1.0.0
 * Description: SignIn Component
 */

export const SignIn = () => {

  const [data, setData] = useState({
    'email_username': null,
    'password': null
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const signin = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await axios.post(API + '/user/signin', data)
    .then((response) => {
      if(response.data.success){
        window.localStorage.setItem('id', response.data.id)
        navigate("/myPolls");
      }
      // console.log(response.data);
    })
    .catch((error) => console.log(error))
    setIsLoading(false);
  }
  
  const handleData = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }


  return(
    <div className='width-full height-1000 display-flex space-around align-center'>
    <div className='height-410 white-backgroundcolor width-350'>
      <div className='display-flex height-90 space-around align-center'><h2 className='font-weight-700 font-family'>SIGN IN</h2></div>
      <div className='display-flex space-around height-150'>
        <form action="post">
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10 position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='person-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="text" id='email_username' className='margin-left-40 height-28 outline-none border-none' placeholder='Email/Username'/>
          </div>
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10  position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='lock-closed-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="password" id='password' className='margin-left-40 height-28 outline-none border-none' placeholder='password'/>
          </div>
        </form>
      </div>
      <div className='display-flex align-center space-around height-100'>
        { !isLoading ? (
          <a href=""><button onClick={(e) => signin(e)} className='width-200 font-weight-700 font-size-14 white-color border-none button border-radius-5 height-50'>SIGN IN</button></a>
        ):(
          <>
            <SpinnerCircular className='position-absolute' size={20} color='orange' thickness={200} secondaryColor={'white'} />
            <button className='width-200 font-weight-700 font-size-14 white-color border-none button-clicked border-radius-5 height-50'></button>
          </>
        )}
      </div>
      <div><h5 onClick={(e) => navigate(FORGET_PASSWORD_URL)} className='margin-left-60 gray-color font-weight-300 font-size-12'>Forgot password?</h5></div>
    </div>
    </div>
  );

}