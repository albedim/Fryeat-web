import axios from 'axios';
import { API } from '../utils.ts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/pattern.css';
import { IonIcon } from 'react-ion-icon';
import { Participant } from './Participant';
import { PollFood } from './PollFood';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 16/01/23
 * Created at: 16:24
 * Version: 1.0.0
 * Description: PollFoodList Component
 */

export const PollFoodList = () => {

  const pollId = useParams().pollId;

  const [pollFood, setPollFood] = useState([]);

  const getPollFood = async () => {
    await axios.get(API + '/food/get-poll-food/' + pollId)
    .then((response) => {
      setPollFood(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  const createAnimation = () => {
    if(document.querySelector("#foodlist").style.display == 'none'){
      document.querySelector("#foodlist").style.display = 'block';
      document.querySelector("#participantslist").style.display = 'none';
    }else{
      document.querySelector("#foodlist").style.display = 'none';
      document.querySelector("#participantslist").style.display = 'block';
    }
    document.querySelector("#foodlist").style.transition = '0.4s';
    document.querySelector("#participantslist").style.transition = '0.4s';
  }

  useEffect(() => {
    getPollFood();
  },[pollFood]);

  return(
    <div className='width-full display-flex margin-top-40 space-around'>
      <div className='white-backgroundcolor border-radius-10 width-360'>
        <div onClick={(e) => createAnimation(e)} className='height-60 border-top-right-radius-10 border-top-left-radius-10 display-flex space-around align-center'>
          <h2 className='font-family'>FOOD</h2>
        </div>
        <div id='foodlist' className='display-none height-auto max-height-400 overflow-y-scroll'>
          { 
            pollFood.map(food => (
              <PollFood key={food.id} name={food.name} foodId={food.id} pollId={pollId} image={food.image}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}
