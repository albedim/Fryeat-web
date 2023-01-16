import { useEffect } from "react";
import { IonIcon } from "react-ion-icon";
import { useNavigate } from "react-router-dom";
import './styles/pattern.css';

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 14/01/23
 * Created at: 18:34
 * Version: 1.0.0
 * Description: Header Component
 */


export const Header = ({page}) => {

  const quit = () => {
    if(window.localStorage.getItem('id') == null){
      navigate("/signin");
    }
  }

  const navigate = useNavigate();

  useEffect(() => {
    quit();
  },[])

  return(
    <div className="display-flex space-between height-110">
      <div className="display-flex align-center space-around width-140">
        <h2 className="font-family font-weight-800 space-around">{page}</h2>
      </div>
      <div className="display-flex space-around align-center width-90">
        <span className="font-size-30"><IonIcon name='person'></IonIcon></span>
      </div>
    </div>
  );
}