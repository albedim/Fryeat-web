import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import { React } from 'react';
import { useEffect, useState } from 'react';
import { IonIcon } from 'react-ion-icon';
import { Navigate, redirect, useLocation, useNavigate, useParams } from 'react-router-dom';
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

  const [isClosed, setIsClosed] = useState();

  const [isOwner, setIsOwner] = useState(false);

  const [votedFood, setVotedFood] = useState([]);

  const [votes, setVotes] = useState([]);

  const [finalVotes, setFinalVotes] = useState([]);

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
    // is Partecipant ?
    await axios.get(API + '/participation/is-participant?userId='+window.localStorage.getItem('id')+'&pollId='+pollId)
    .then(async (response) => {
      // If not, leave the page
      if(!response.data.param){
        navigate("/polls");
      }else{
        // If so, check if the poll is closed
        await axios.get(API + '/poll/is-closed/' + pollId)
        .then((response) => {
          // If it is, it's going to set voted to true so that they will see the result view
          if(response.data.param){
            setVoted(true);
          }else{
            hasVoted();
          }
        })
        .catch(error => console.log(error));
      }
    }).catch(error => console.log(error));
  }

  useEffect(() => {
    // First check
    checkIsParticipant();
    // check if the poll is closed o save it in a const
    checkIsClosed();
    // Get data
    getPollFood();
    getFinalVotes();
    getVotes();
    getPoll();
  },[])

  const hasVoted = async () => {
    await axios.get(API + '/participation/has-voted?userId=' + window.localStorage.getItem('id') + "&pollId=" + pollId)
    .then((response) => {
      setVoted(response.data.param);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  const getPollFood = async () => {
    await axios.get(API + '/food/get-poll-food/'+pollId)
    .then((response) => {
      setPollFood(response.data);
      // console.log(pollId);
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
          // console.log(response.data);
        })
        .catch(error => console.log(error));
      }
    })
    setVote();
  }

  
  const getPoll = async () => {
    await axios.get(API + '/poll/get-poll/' + pollId)
    .then((response) => {
      setIsOwner(response.data.ownerId == window.localStorage.getItem('id'));
    })
    .catch(error => console.log(error));
  }

  const closePoll = async () => {
    await axios.put(API + '/poll/close/' + pollId)
    .then((response) => {
      // console.log(response.data);
    })
    .catch(error => console.log(error));
    checkIsClosed();
  }

  const checkIsClosed = async () => {
    await axios.get(API + '/poll/is-closed/' + pollId)
    .then((response) => {
      setIsClosed(response.data.param);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  const setVote = async () => {
    await axios.put(API + '/participation/set-vote?userId=' + window.localStorage.getItem('id') + "&pollId="+pollId)
    .then((response) => {
      // console.log(response.data);
    })
    .catch(error => console.log(error));
    await sleep(400);
    setVoted(true);
    getVotes();
  }

  const getVotes = async () => {
    await axios.get(API + '/vote/get-votes/'+pollId)
    .then((response) => {
      setVotes(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

    const getFinalVotes = async () => {
    await axios.get(API + '/vote/get-final-votes/'+pollId)
    .then((response) => {
      setFinalVotes(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  const redirectToEditPage = () => {
    navigate("/poll/edit/" + pollId);
  }

  const redirectToJusteat = (food) => {
    window.location.replace('https://justeat.it/area/20123-milan?q='+food+'&so=Default_Display_Rank');
  }

  return(
    <div className='width-full display-flex space-around'>
      { !isClosed ? (
        voted ? (
          <div className='height-580 width-340'>
            <div className='space-around height-480'>
              {
                votes.map(vote => (
                  <div key={vote.id} className='orange-backgroundcolor border-radius-5 display-flex space-between margin-top-14 margin-left-28 width-280 height-44'>
                    <div className='display-flex space-around align-center width-174'><h2 className='font-size-18 font-family'>{vote.name}</h2></div>
                    <div className='display-flex space-around align-center width-64'><h2 className='font-size-18 font-weight-800 font-family'>{vote.votes}</h2></div>
                  </div>
                ))
              }
            </div>
            <div className='margin-left-48 width-240 height-98 display-flex space-around align-center'>
                { isOwner &&
                    <>
                      <div onClick={(e) => redirectToEditPage()} className='font-size-34'><IonIcon name='options'></IonIcon></div>
                      <div onClick={(e) => closePoll()} className='font-size-34 red-color'><IonIcon name='stop-circle-outline'></IonIcon></div>
                    </>
                }
            </div>
          </div>
        ):(
          <div className='space-around display-block height-540 width-340'>
            <div className='margin-top-80 display-flex space-around height-240 width-340'>
              {
                pollFood.map(food => (
                  <img key={food.id} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={(e) => onTouchEnd(food.id)} id={"image" + food.id} className='border-radius-20 position-absolute width-310' src={"/"+food.image} alt="s" />
                ))
              }
            </div>
            <div className='margin-left-28 margin-top-98 width-280 height-40 space-between display-flex'>
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
        )
      ):(
        <div className='height-580 width-340'>
          <div className='space-around height-480'>
            {
              finalVotes.map(vote => (
                vote.winner ? (
                  <div onClick={(e) => redirectToJusteat(vote.name)} key={vote.id} className='orange-backgroundcolor border-radius-5 display-flex space-between margin-top-14 margin-left-28 width-280 height-44'>
                    <div className='display-flex space-around align-center width-174'><h2 className='font-size-18 font-family'>{vote.name}</h2></div>
                    <div className='display-flex space-around align-center width-64'>
                      <h2 className='font-size-18 font-weight-800 font-family'>{vote.votes}</h2>
                      <div className='font-size-24'><IonIcon name='trophy'/></div>
                    </div>
                  </div>
                ):(
                  <div key={vote.id} className='orange-backgroundcolor border-radius-5 display-flex space-between margin-top-14 margin-left-28 width-280 height-44'>
                    <div className='display-flex space-around align-center width-174'><h2 className='font-size-18 font-family'>{vote.name}</h2></div>
                    <div className='display-flex space-around align-center width-64'>
                      <h2 className='font-size-18 font-weight-800 font-family'>{vote.votes}</h2>
                    </div>
                  </div>
                )
              ))
            }
          </div>
          <div className='margin-left-48 width-240 height-98 display-flex space-around align-center'>
              { isOwner &&
                <div onClick={(e) => redirectToEditPage()} className='font-size-34'><IonIcon name='options'></IonIcon></div>
              }
          </div>
        </div>
      )}
    </div>
  );
}