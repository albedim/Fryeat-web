import axios from "axios";
import { useEffect, useState } from "react";
import { IonIcon } from "react-ion-icon";
import { Navigate, useNavigate } from "react-router-dom";
import { SpinnerCircular } from "spinners-react";
import { API } from "../utils.ts";

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 17/01/23
 * Created at: 01:34
 * Version: 1.0.0
 * Description: Account Component
 */

export const Account = () => {

  const [data, setData] = useState({
    'name': null,
    'username': null,
    'place': null,
    'password': null,
    'id': window.localStorage.getItem('id')
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getUser = () => {
    axios.get(API + '/user/get/' + window.localStorage.getItem('id'))
    .then((response) => {
      setData(response.data);
      // console.log(response.data);
    })
    .catch(error => console.log(error));
  }

  useEffect(() => {
    getUser();
  },[])

  const handleData = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  const exit = () => {
    window.localStorage.removeItem('id');
    navigate("/signin");
  }

  const changeData = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await axios.put(API + '/user/change-data', data)
    .then((response) => {
      console.log(response.data);
    })
    .catch(error => console.log(error));
    setIsLoading(false);
  }


  return(
    <div className="height-600 display-flex space-around width-full">
      <form action="post">
        <div className="height-400 width-280">
          <div className="border-bottom-smaller margin-top-40 margin-left-30 height-40 space-around width-210">
            <input id="name" value={data.name} onChange={(e) => handleData(e)} type="text" className="height-30 background-transparent outline-none border-none width-180" placeholder="Name"/>
          </div>
          <div className="border-bottom-smaller margin-top-20 margin-left-30 height-40 space-around width-210">
            <input id="username" value={data.username} onChange={(e) => handleData(e)} type="text" className="height-30 background-transparent outline-none border-none width-180" placeholder="Username"/>
          </div>
          <div className="border-bottom-smaller margin-top-20 margin-left-30 height-40 space-around width-210">
            <input id="place" value={data.place} onChange={(e) => handleData(e)} type="text" className="height-30 background-transparent outline-none border-none width-180" placeholder="Place"/>
          </div>
          <div className="border-bottom-smaller margin-top-20 margin-left-30 height-40 space-around width-210">
            <input id="password" value={data.password} onChange={(e) => handleData(e)} type="password" className="height-30 background-transparent outline-none border-none width-180" placeholder="password"/>
          </div>
          {
            isLoading ? (
              <button className='align-center margin-top-80 margin-left-90 width-100 display-flex space-around font-weight-700 font-size-12 white-color border-none button-clicked border-radius-5 height-40'>
                  <SpinnerCircular className='position-absolute' size={20} color='orange' thickness={200} secondaryColor={'white'} />
              </button>
            ):(
              <button onClick={(e) => changeData(e)} className='align-center margin-top-80 margin-left-90 width-100 display-flex space-around font-weight-700 font-size-12 white-color border-none button-clicked border-radius-5 height-40'>Change</button>
            )
          }
        </div>
        <div className="display-flex space-around align-center height-138 width-280">
          <div onClick={(e) => exit(e)} className="font-size-34"><IonIcon name="log-out"></IonIcon></div>
        </div>
      </form>
    </div>
  );
}