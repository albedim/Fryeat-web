import { IonIcon } from "react-ion-icon";
import { Navigate, useNavigate } from "react-router-dom";

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 14/01/23
 * Created at: 18:34
 * Version: 1.0.0
 * Description: Poll Component
 */

export const Poll = ({name, id, createdBy, finished}) => {

  const redirect = (id) => {
    navigate('/poll/' + id);
  }

  const navigate = useNavigate();

  return (
    <div onClick={(e) => redirect(id)} id="poll" className='box-shadow margin-bottom-10 width-264 margin-left-50 white-backgroundcolor margin-top-40 border-radius-10 height-128'>
      <div className='display-flex align-center height-50'><span className="font-size-21 font-weight-700 margin-left-20 font-family">{name}</span></div>
      <div className="margin-top-4"><span className="font-size-12 margin-left-20">Created by {createdBy}</span></div>
      {finished ? (
        <div><span className="font-size-12 font-weight-600 red-color margin-left-20">Closed</span></div>
      ):(
        <div><span className="font-size-12 font-weight-600 green-color margin-left-20">Opened</span></div>
      )}
      <div className="display-flex space-between height-31">
        <div></div>
        <div className="border-bottom-right-radius-10 display-flex space-around align-center border-top-left-radius-10 orange-backgroundcolor height-31 width-38">
          <span className="white-color font-size-18"><IonIcon name='arrow-forward-outline'></IonIcon></span>
        </div>
      </div>
    </div>
  );
}