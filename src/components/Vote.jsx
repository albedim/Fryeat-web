import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import { React } from 'react';
import { useEffect, useState } from 'react';
import { IonIcon } from 'react-ion-icon';
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

  const [votes, setVotes] = useState([]);

  const [likedFood, setLikedFood] = useState(0);

  const [unLikedFood, setUnLikedFood] = useState(0);

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
    getVotes();
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
  
  const onTouchEnd = async (foodId) => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe){
      votedFood.push({
        'foodId': foodId,
        'voted': true
      })
      startLeftAnimation(foodId);
      setLikedFood(likedFood+1);
    }else if (isRightSwipe){
      votedFood.push({
        'foodId': foodId,
        'voted': false
      })
      startRightAnimation(foodId);
      setUnLikedFood(unLikedFood+1);
    }
    if(votedFood.length == pollFood.length){
      addVote();
    }
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const startRightAnimation = async (foodId) => {
    document.querySelector("#image" + foodId).style.marginLeft = '600px';
    document.querySelector("#image" + foodId).style.rotate = '40deg';
    document.querySelector("#image" + foodId).style.transition = '0.6s';
    await sleep(400);
    document.querySelector("#image" + foodId).style.display = 'none';
  }

  const startLeftAnimation = async (foodId) => {
    document.querySelector("#image" + foodId).style.marginLeft = '-600px';
    document.querySelector("#image" + foodId).style.rotate = '-40deg';
    document.querySelector("#image" + foodId).style.transition = '0.6s';
    await sleep(400);
    document.querySelector("#image" + foodId).style.display = 'none';
  }

  const addVote = async () => {
    votedFood.map(async (food) => {
      if(food.voted){
        await axios.post(API + '/vote/add', {
          'pollId': pollId,
          'foodId': food.foodId
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch(error => console.log(error));
      }
    })
    setVote();
  }

  const setVote = async () => {
    await axios.put(API + '/participation/setVote?userId=' + window.localStorage.getItem('id') + "&pollId="+pollId)
    .then((response) => {
      console.log(response.data);
    })
    .catch(error => console.log(error));
    await sleep(400);
    hasVoted();
    getVotes();
  }

  const getVotes = async () => {
    await axios.get(API + '/vote/getVotes/'+pollId)
    .then((response) => {
      setVotes(response.data);
      console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  return(
    <div className='width-full display-flex space-around'>
      { voted ? (
        <div className='border-smaller height-540 width-340'>
          <div className='space-around height-440'>
            {
              votes.map(vote => (
                <div className='orange-backgroundcolor border-radius-5 display-flex space-between margin-top-14 margin-left-28 width-280 height-44'>
                  <div className='display-flex space-around align-center width-74'><h2 className='font-size-18 font-family'>{vote.name}</h2></div>
                  <div className='display-flex space-around align-center width-64'><h2 className='font-size-18 font-weight-800 font-family'>{vote.votes}</h2></div>
                </div>
              ))
            }
          </div>
        </div>
      ):(
        <div className='space-around display-block height-540 width-340'>
          <div className='margin-top-80 display-flex space-around height-240 width-340'>
            {
              pollFood.map(food => (
                <img onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={(e) => onTouchEnd(food.id)} id={"image" + food.id} className='border-radius-20 position-absolute width-310' src={"/"+food.image} alt="s" />
              ))
            }
          </div>
          <div className='margin-left-28 margin-top-40 width-280 height-40 space-between display-flex'>
            <div className='display-flex space-around align-center width-70'>
              <div className='orange-color font-size-24'><IonIcon name='arrow-undo'></IonIcon></div>
              <h2>{likedFood}</h2>
            </div>
            <div className='display-flex space-around align-center width-70'>
              <h2>{unLikedFood}</h2>
              <div className='orange-color font-size-24'><IonIcon name='arrow-redo'></IonIcon></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}