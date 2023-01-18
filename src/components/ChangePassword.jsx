import './styles/pattern.css';
import './styles/components.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FORGET_PASSWORD_URL, API } from '../utils.ts';
import { SpinnerCircular } from 'spinners-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { IonIcon } from 'react-ion-icon';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 13/01/23
 * Created at: 23:34
 * Version: 1.0.0
 * Description: Change Password Component Component
 */

export const ChangePassword = () => {

  const [passwords, setPasswords] = useState({
    'password': null,
    'second_password': null
  });

  const [userId, setUserId] = useState(0);

  const search = useLocation().search;

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const changePasssword = async (e) => {
    if(!validate()){
      console.log("error");
    }else{
      setIsLoading(true);
      e.preventDefault();
      await axios.put(API + '/user/change-password', {
        'password': passwords.password,
        'id': userId
      })
      .then((response) => {
        if(response.data.success)
          navigate("/signin");
        // console.log(response.data);
      })
      .catch((error) => console.log(error))
      setIsLoading(false);
    }
  }

  const validate = () => {
    return passwords.password == passwords.second_password;
  }

  const handleData = (e) => {
    const newPasswords = { ...passwords };
    newPasswords[e.target.id] = e.target.value;
    setPasswords(newPasswords);
  }

  // Gets if the link is valid, if it is. The api will
  // return a id of the user who is trying the request
  // and it saves that in a const

  const validateURL = async () => {
    const l = new URLSearchParams(search).get('l');
    await axios.post(API + '/recovery-link/get-user-id', {
      "link": l
    })
    .then((response) => {
      if(response.data.success){
        setUserId(parseInt(response.data.param));
      }else{
        navigate("/signin");
      }
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    validateURL();
  },[])

  return(
    <div className='width-full height-1000 display-flex space-around align-center'>
    <div className='height-410 white-backgroundcolor width-350'>
      <div className='display-flex height-90 space-around align-center'><h2 className='font-weight-700 font-family'>ALMOST THERE!</h2></div>
      <div className='display-flex space-around height-150'>
        <form action="post">
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10 position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='lock-closed-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="password" id='password' className='margin-left-40 height-28 outline-none border-none' placeholder='password'/>
          </div>
          <div className='width-240 height-34 margin-top-20 border-bottom-smaller'>
            <span className='margin-left-10  position-absolute margin-top-8 font-size-medium'>
              <IonIcon name='lock-closed-outline'></IonIcon>
            </span>
            <input required onChange={(e) => handleData(e)} type="password" id='second_password' className='margin-left-40 height-28 outline-none border-none' placeholder='repeate your password'/>
          </div>
        </form>
      </div>
      <div className='display-flex align-center space-around height-100'>
        { !isLoading ? (
          <button onClick={(e) => changePasssword(e)} className='width-200 font-weight-700 font-size-14 white-color border-none button border-radius-5 height-50'>SIGN IN</button>
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