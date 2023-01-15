import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpinnerCircular } from 'spinners-react';
import { API } from '../utils.ts';
import './styles/pattern.css';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 15/01/23
 * Created at: 00:34
 * Version: 1.0.0
 * Description: AddPoll Component
 */


export const AddPoll = () => {

  const [name, setName] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const [avaibleFood, setAvaibleFood] = useState([]);

  const [food, setFood] = useState("");

  const [participant, setParticipant] = useState("");

  const [pollId, setPollId] = useState(0);


  const createPoll = async () => {
    setIsLoading(true);
    await axios.post(API + '/poll/add', {
      'name': name,
      'ownerId': window.localStorage.getItem('id')
    })
    .then(async (response) => {
      setPollId(parseInt(response.data.param));
      changeComponents();
      // console.log(response.data);
    })
    .catch(error => console.log(error));
    setIsLoading(false);
  }

  const getFood = async () => {
    await axios.get(API + '/food/get')
    .then((response) => {
      setAvaibleFood(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    getFood();
  },[])

  const handleName = (e) => {
    setName(e.target.value);
  }

  const handleParticipant = (e) => {
    setParticipant(e.target.value);
  }

  const handleFood = (e) => {
    setFood(e.target.value);
  }

  const addFood = async () => {
    setIsLoading(true);
    await axios.post(API + '/pollfood/add', {
      'foodId': food.split(" ")[1],
      'pollId': pollId
    })
    .then((response) => {
      // console.log(response.data);
    }).catch(error => console.log(error));
    setIsLoading(false);
  }
  
  const addParticipant = async () => {
    setIsLoading(true);
    await axios.post(API + '/participation/add', {
      'pollId': pollId,
      'username': participant
    })
    .then((response) => {
      setParticipant("");
      // console.log(response.data);
    }).catch(error => console.log(error));
    setIsLoading(false);
  }

  const changeComponents = () => {
    if(document.querySelector("#name").style.display == "none"){
      document.querySelector("#name").style.display = "flex";
      document.querySelector("#participation").style.display = "none";
      document.querySelector("#food").style.display = "none";
    }else{
      document.querySelector("#name").style.display = "none";
      document.querySelector("#participation").style.display = "flex";
      document.querySelector("#food").style.display = "flex";
    }
  }

  return(
    <>
      <div className="width-full display-flex align-center height-600 space-around">
        <div className='width-340 height-600'>
          <div id='name' className='display-flex space-between margin-top-30 align-center height-90'>
            <div className="border-bottom-smaller margin-left-30 height-40 space-around width-210">
              <input type="text" onChange={(e) => handleName(e)} className="height-30 background-transparent outline-none border-none width-180" placeholder="Poll name"/>
            </div>
            { isLoading ? (
              <div className='margin-right-20'>
                <button onClick={(e) => createPoll()} className='display-flex align-center space-around width-50 font-weight-700 font-size-12 white-color border-none button-clicked border-radius-5 height-40'>
                  <SpinnerCircular size={20} color='orange' thickness={200} secondaryColor={'white'} />
                </button>
              </div>
            ):(
              <div className='margin-right-20'>
                <button onClick={(e) => createPoll()} className='align-center width-50 display-flex space-around font-weight-700 font-size-12 white-color border-none button-clicked border-radius-5 height-40'>
                  Add
                </button>
              </div>
            )}
          </div>
          <div id='participation' className='display-none space-between margin-top-30 align-center height-90'>
            <div className="border-bottom-smaller margin-left-30 height-40 display-flex space-around width-210">
              <input id="participant" type="text" onChange={(e) => handleParticipant(e)} value={participant} className="height-30 background-transparent outline-none border-none width-180" placeholder="Add participant"/>
            </div>            
            { isLoading ? (
              <div className='margin-right-20'>
                <button onClick={(e) => addParticipant()} className='width-50 align-center display-flex space-around font-weight-700 font-size-12 white-color border-none button-clicked border-radius-5 height-40'>
                  <SpinnerCircular size={20} color='orange' thickness={200} secondaryColor={'white'} />
                </button>
              </div>
            ):(
              <div className='margin-right-20'>
                <button onClick={(e) => addParticipant()} className='width-50 display-flex align-center space-around font-weight-700 font-size-12 white-color border-none button-clicked border-radius-5 height-40'>
                  Add
                </button>
              </div>
            )}
          </div>
          <div id='food' className='display-none space-between margin-top-20 align-center height-90'>
            <div className="border-bottom-smaller margin-left-30 height-40 display-flex space-around width-210">
              <select name='food' onChange={(e) => handleFood(e)} className="height-30 background-transparent outline-none border-none width-180">
                <option value={"choose"}>Choose</option>
                { avaibleFood.map((food, key) => (
                    <option value={food.name + " " + food.id}>{food.name}</option>
                  ))
                }
              </select>
            </div>            
            { isLoading ? (
              <div className='margin-right-20'>
                <button onClick={(e) => addFood()} className='width-50 display-flex alig-center space-around font-weight-700 font-size-12 white-color border-none button-clicked border-radius-5 height-40'>
                  <SpinnerCircular size={20} color='orange' thickness={200} secondaryColor={'white'} />
                </button>
              </div>
            ):(
              <div className='margin-right-20'>
                <button onClick={(e) => addFood()} className='width-50 display-flex align-center space-around font-weight-700 font-size-12 white-color border-none button-clicked border-radius-5 height-40'>
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}