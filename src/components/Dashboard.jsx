import './styles/components.css';
import './styles/pattern.css';
import { Poll } from './Poll';
import { API } from '../utils.ts';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 14/01/23
 * Created at: 21:14
 * Version: 1.0.0
 * Description: Dashboard Component
 */

export const Dashboard = ({param}) => {

  const [ownPolls, setOwnPolls] = useState([]);

  const [polls, setPolls] = useState([]);

  const navigate = useNavigate();

  const getOwnPolls = async () => {
    await axios.get(API + '/poll/get-own/' + window.localStorage.getItem('id'))
    .then((response) => {
      setOwnPolls(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error))
  }

  const getPolls = async () => {
    await axios.get(API + '/poll/get/' + window.localStorage.getItem('id'))
    .then((response) => {
      setPolls(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error))
  }


  useEffect(() => {
    quit();
  },[])

  useEffect(() => {
    getPolls();
  },[polls])

  useEffect(() => {
    getOwnPolls();
  },[ownPolls])

  const quit = () => {
    if(window.localStorage.getItem('id') == null){
      navigate("/signin");
    }
  }

  return(
    <>
      <div className='display-flex width-full space-around'>
        <div className='overflow-y-scroll height-580 width-378'>
          { param == 'ownPolls' ? (
            ownPolls.length > 0 ? (
              ownPolls.map(ownPoll => (
                <Poll isOwn={true} key={ownPoll.id} name={ownPoll.name} id={ownPoll.id} createdBy={ownPoll.ownerUsername} finished={ownPoll.finished}></Poll>
              ))
            ):(
              <div className='height-140 display-flex align-center space-around'>
                <div className='width-180 display-flex align-center'>
                  <div><img className='width-80' src="/coffe.png" alt="" /></div>
                  <div className='margin-left-14'><h2 className='font-family font-size-16'>Nothing found here</h2></div>
                </div>
              </div>
            )
          ):(
            polls.length > 0 ? (
              polls.map(poll => (
                <Poll isOwn={false} key={poll.id} name={poll.name} id={poll.id} createdBy={poll.ownerUsername} finished={poll.finished}></Poll>
              ))
            ):(
              <div className='height-140 display-flex align-center space-around'>
                <div className='width-180 display-flex align-center'>
                  <div><img className='width-80' src="/coffe.png" alt="" /></div>
                  <div className='margin-left-14'><h2 className='font-family font-size-16'>Nothing found here</h2></div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}