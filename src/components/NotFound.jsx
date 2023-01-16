import { IonIcon } from "react-ion-icon";

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 16/01/23
 * Created at: 19:34
 * Version: 1.0.0
 * Description: Not Found Component
 */


export const NotFound = () => {

  return(
    <div className="display-flex width-full height-800 space-around align-center">
      <div>
        <h2 className="font-family margin-left-70">Saddenly</h2>
        <h2 className="font-family">We can't find this way</h2>
        <div className="orange-color font-size-34 margin-left-89"><IonIcon name="sad"></IonIcon></div>
      </div>
    </div>
  );

}