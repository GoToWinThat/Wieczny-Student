import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../../styles/GameClock.css";

var secondsForAction = 30;

const TurnClock = (props) => {
  const [time, setTime] = useState({});
  const [seconds, setSeconds] = useState(secondsForAction);

  useEffect(() => {
    setTime(secondsToTime(secondsForAction));
    const timer = setInterval(() => {
      setSeconds((prevTime) => {
        setTime(secondsToTime(prevTime - 1));
        return prevTime <= 1 ? prevTime : prevTime - 1;
      });
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
      if(seconds <= 1) props.endTurnEvent();
  }, [seconds])

  useEffect(() => {
    resetClock();
  }, [props.activePlayerIndex]);

  const resetClock = () => {
    setTime(secondsToTime(secondsForAction));
    setSeconds(secondsForAction);
  };

  const secondsToTime = (secs) => {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  };

  return (
    <Button
      id="endTurnButton"
      onClick={() => props.endTurnEvent()}
      onMouseDown={(e) => e.preventDefault()}
      disabled={props.myIndex !== props.activePlayerIndex
            || (props.gameState.gameState != "running")}
    >
      <span>Zakończ turę [{time.m * 60 + time.s}s]</span>
    </Button>
  );
};
export default TurnClock;
