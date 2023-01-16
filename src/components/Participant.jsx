import { IonIcon } from "react-ion-icon";
import { API } from '../utils.ts';
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 16/01/23
 * Created at: 14:24
 * Version: 1.0.0
 * Description: Participant Component
 */

export const Participant = ({name, pollId, userId, username}) => {

  const deleteParticipant = async (userId) => {
    await axios.delete(API + '/participation/delete?userId=' + userId + "&pollId=" + pollId)
    .then((response) => {
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  return (
    <div className='margin-left-40 margin-top-7 margin-bottom-14 space-between display-flex width-280 height-70'>
      <div className='display-flex'>
        <div className='display-flex space-around align-center width-58'>
          <img src="/user.png" alt="" className='width-48' />
        </div>
        <div className='width-140'>
          <div className='margin-top-12 height-20'>
            <span className='font-family margin-left-14 font-weight-600 font-size-18'>{name}</span>
          </div>
          <div className='height-20'>
            <span className='font-family margin-left-14 font-weight-800 font-size-14'>{username}</span>
          </div>
        </div>
      </div>
      <div className='font-size-24 display-flex space-around align-center width-50'>
        <div onClick={(e) => deleteParticipant(userId)} className='red-color'><IonIcon name='close'></IonIcon></div>
      </div>
    </div>
  );
}