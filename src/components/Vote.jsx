import axios from 'axios';
import { React } from 'react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { API } from '../utils.ts';
import './styles/pattern.css';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 15/01/23
 * Created at: 16:14
 * Version: 1.0.0
 * Description: Vote Component
 */

export const Vote = () => {

  const pollId = useParams().pollId;

  const [votedFood, setVotedFood] = useState([]);

  const [voted, setVoted] = useState(false);

  const [pollFood, setPollFood] = useState([]);

  const navigate = useNavigate();

  // swipe consts

  const [touchStart, setTouchStart] = useState(null);

  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;


  const checkIsParticipant = async () => {
    // Is participant ? (boolean)
    await axios.get(API + '/participation/isParticipant?userId='+window.localStorage.getItem('id')+'&pollId='+pollId)
    .then(async (response) => {
      // if not a participant
      if(!response.data.param){
        // Get poll
        await axios.get(API + '/poll/getPoll/'+pollId)
        .then((response) => {
          // If poll's owner Id is not equal to sessionId
          if(response.data.ownerId != window.localStorage.getItem('id')){
            navigate("/polls");
          }
        }).catch(error => console.log(error));
      }
    }).catch(error => console.log(error));
    hasVoted();
  }

  useEffect(() => {
    checkIsParticipant();
    getPollFood();
  },[])

  const hasVoted = async () => {
    await axios.get(API + '/participation/hasVoted?userId=' + window.localStorage.getItem('id') + "&pollId=" + pollId)
    .then((response) => {
      setVoted(response.data.param);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  const getPollFood = async () => {
    await axios.get(API + '/food/getPollFood/'+pollId)
    .then((response) => {
      setPollFood(response.data);
      console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  const onTouchStart = (e) => {
    setTouchEnd(null) // otherwise the swipe is fired even with usual touch events
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
  
  const onTouchEnd = (foodId) => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    const newVotedFood = { ...votedFood }
    if (isLeftSwipe){
      newVotedFood['id'] = foodId;
      newVotedFood['voted'] = true;
      setVotedFood(newVotedFood);
    }else if (isRightSwipe){
      newVotedFood['id'] = foodId;
      newVotedFood['voted'] = false;
      setVotedFood(newVotedFood);
    }
  }

  return(
    <div className='width-full display-flex space-around'>
      { voted ? (
        <div>
          <h2>VOTES</h2>
        </div>
      ):(
        <div className='border-smaller space-around height-540 width-340'>
          {
            pollFood.map(food => (
              <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={(e) => onTouchEnd(food.id)}>
                {console.log(votedFood)}
                <img className='margin-left-14 margin-top-140 position-absolute width-310' src={"/"+food.image} alt="s" />
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}