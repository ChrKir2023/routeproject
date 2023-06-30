import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  Fragment,
  navigate,
  Redirect
} from 'react';
import moment from 'moment';
import AuthService from "../../services/auth.service";
import { useNavigate } from 'react-router-dom';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const SessionTimeout = () => {
  const [events, setEvents] = useState(['click', 'load', 'scroll']);
  const [second, setSecond] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  
  let timeStamp;
  let warningInactiveInterval = useRef();
  let startTimerInterval = useRef();

  const logOut = () => {
    AuthService.logout();
    if (localStorage.getItem(user.username)){
      localStorage.removeItem(user.username);
    }  
    navigate("/login");
  };

  // start inactive check
  let timeChecker = () => {
    startTimerInterval.current = setTimeout(() => {
      let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
      warningInactive(storedTimeStamp);
    }, 180000);
  };

  // warning timer
  let warningInactive = (timeString) => {
    clearTimeout(startTimerInterval.current);

    warningInactiveInterval.current = setInterval(() => {
      const maxTime = 4;
      const popTime = 3;

      const diff = moment.duration(moment().diff(moment(timeString)));
      const minPast = diff.minutes();
      const leftSecond = 60 - diff.seconds();

      if (minPast === popTime) {
        setSecond(leftSecond);
        setOpen(true);
      }

      if (minPast === maxTime) {
        clearInterval(warningInactiveInterval.current);
        setOpen(false);
        sessionStorage.removeItem('lastTimeStamp');
        logOut();
        
      }
    }, 1000);
  };

  // reset interval timer
  let resetTimer = useCallback(() => {
    clearTimeout(startTimerInterval.current);
    clearInterval(warningInactiveInterval.current);

    if (user && user.accessToken) {
      timeStamp = moment();
      sessionStorage.setItem('lastTimeStamp', timeStamp);
    } else {
      clearInterval(warningInactiveInterval.current);
      sessionStorage.removeItem('lastTimeStamp');
    }
    timeChecker();
    setOpen(false);
  }, [user && user.accessToken]);

  // handle close popup
  const handleClose = () => {
    setOpen(false);

    resetTimer();
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    timeChecker();
    

    return () => {
      clearTimeout(startTimerInterval.current);
      //   resetTimer();
    };
  }, [resetTimer, events, timeChecker]);

  console.log(second);

  if (!isOpen) {
    return null;
  }

  // change fragment to modal and handleclose func to close
  return <Fragment />;
};

export default SessionTimeout;