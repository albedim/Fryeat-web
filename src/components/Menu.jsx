import { IonIcon } from "react-ion-icon";
import { useNavigate } from "react-router-dom";

/**
 * @author: albedim <dimaio.albe@gmail.com>
 * Created on: 14/01/23
 * Created at: 18:34
 * Version: 1.0.0
 * Description: Menu Component
 */


export const Menu = ({param}) => {

  const navigate = useNavigate();
  

  return(
    <div className="width-full height-114 display-flex align-center space-around position-fixed bottom-0">
      <div className="width-240 display-flex align-center space-around height-80">
        { param == 'null' &&
          <>
            <div className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30" onClick={(e) => navigate("/polls")}><IonIcon name="copy"></IonIcon></div>
            <div onClick={(e) => navigate("/polls/me")} className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30"><IonIcon name="create"></IonIcon></div>
            <div onClick={(e) => navigate("/poll/add")} className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30"><IonIcon name="add"></IonIcon></div>
          </>
        }
        { param == 'ownpolls' &&
          <>
            <div className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30" onClick={(e) => navigate("/polls")}><IonIcon name="copy"></IonIcon></div>
            <div onClick={(e) => navigate("/polls/me")} className="orange-backgroundcolor width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30"><IonIcon name="create"></IonIcon></div>
            <div onClick={(e) => navigate("/poll/add")} className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30"><IonIcon name="add"></IonIcon></div>
          </>
        }
        { param == 'polls' &&
          <>
            <div className="width-50 height-50 orange-backgroundcolor border-radius-circle display-flex space-around align-center font-size-30" onClick={(e) => navigate("/polls")}><IonIcon name="copy"></IonIcon></div>
            <div onClick={(e) => navigate("/polls/me")} className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30"><IonIcon name="create"></IonIcon></div>
            <div onClick={(e) => navigate("/poll/add")} className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30"><IonIcon name="add"></IonIcon></div>
          </>
        }
        { param == 'addpoll' &&
          <>
            <div className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30" onClick={(e) => navigate("/polls")}><IonIcon name="copy"></IonIcon></div>
            <div onClick={(e) => navigate("/polls/me")} className="width-50 height-50 border-radius-circle display-flex space-around align-center font-size-30"><IonIcon name="create"></IonIcon></div>
            <div onClick={(e) => navigate("/poll/add")} className="width-50 orange-backgroundcolor height-50 border-radius-circle display-flex space-around align-center font-size-30"><IonIcon name="add"></IonIcon></div>
          </>
        }
      </div>
    </div>
  );
}