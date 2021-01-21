import React, { useState, useEffect } from "react";
import "../../styles/GameClock.css";

var secondsForGame = 60 * 20;

const GameClock = () => {
  const [time, setTime] = useState({});
  const [seconds, setSeconds] = useState(secondsForGame);

  useEffect(() => {
    setTime(secondsToTime(secondsForGame));
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
    <div id="gameClock">
      <p>
        {("0" + time.m).slice(-2)}:{("0" + time.s).slice(-2)}
      </p>
    </div>
  );
};
export default GameClock;
