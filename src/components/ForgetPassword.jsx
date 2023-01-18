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
 * Created at: 22:14
 * Version: 1.0.0
 * Description: Forget Password Component
 */

export const ForgetPassword = () => {

  const [data, setData] = useState({
    'email': null,
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const sendRecoveryLink = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await axios.post(API + '/recovery-link/add', data)
    .then((response) => {
      if(response.data.success)
        navigate("/signin");
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
    <div className='height-290 white-backgroundcolor width-350'>
      <div className='display-flex height-90 space-around align-center'><h2 className='font-weight-700 font-family'>CHANGE PASSWORD</h2></div>
      <div className='display-flex space-around height-100'>
        <form action="post">
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10 position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='mail-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="text" id='email' className='margin-left-40 height-28 outline-none border-none' placeholder='Email'/>
          </div>
        </form>
      </div>
      <div className='display-flex align-center space-around height-60'>
        { !isLoading ? (
          <button onClick={(e) => sendRecoveryLink(e)} className='width-200 font-weight-700 font-size-14 white-color border-none button border-radius-5 height-50'>SEND</button>
        ):(
          <>
            <SpinnerCircular className='position-absolute' size={20} color='#fcbe7c' thickness={200} secondaryColor={'white'} />
            <button className='width-200 font-weight-700 font-size-14 white-color border-none button-clicked border-radius-5 height-50'></button>
          </>
        )}
      </div>
    </div>
    </div>
  );

}