import axios from 'axios';
import { API } from '../utils.ts';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles/pattern.css';
import { IonIcon } from 'react-ion-icon';
import { Participant } from './Participant';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 14/01/23
 * Created at: 14:24
 * Version: 1.0.0
 * Description: Participants Component
 */

export const Participants = () => {

  const pollId = useParams().pollId;

  const navigate = useNavigate();

  const [participants, setParticipants] = useState([]);

  const getParticipants = async () => {
    await axios.get(API + '/user/get-participants/' + pollId)
    .then((response) => {
      setParticipants(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  const getPoll = async () => {
    await axios.get(API + '/poll/get-poll/' + pollId)
    .then((response) => {
      if(response.data.ownerId != window.localStorage.getItem('id')){
        navigate("/polls");
      }
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    getParticipants();
  },[participants]);

  useEffect(() => {
    getPoll();
  },[]);

  const createAnimation = () => {
    if(document.querySelector("#participantslist").style.display == 'none'){
      document.querySelector("#foodlist").style.display = 'none';
      document.querySelector("#participantslist").style.display = 'block';
    }else{
      document.querySelector("#foodlist").style.display = 'block';
      document.querySelector("#participantslist").style.display = 'none';
    }
    document.querySelector("#foodlist").style.transition = 'all .1s ease';
    document.querySelector("#participantslist").style.transition = 'all .1s ease';
  }

  return(
    <div className='classroom width-full display-flex space-around'>
      <div className='white-backgroundcolor border-radius-10 width-360'>
        <div onClick={(e) => createAnimation(e)} className='height-60 border-top-right-radius-10 border-top-left-radius-10 display-flex space-around align-center'>
          <h2 className='font-family'>PARTICIPANTS</h2>
        </div>
        <div id='participantslist' className='height-auto max-height-400 overflow-y-scroll'>
          { 
            participants.map(participant => (
              <Participant key={participant.id} userId={participant.id} pollId={pollId} name={participant.name} username={participant.username}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}
