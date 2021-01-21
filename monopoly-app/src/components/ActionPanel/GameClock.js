import React, { useState, useEffect } from "react";
import "../../styles/GameClock.css";
import { EndGameEvent } from '../../gameplay/turnActions'
import { useSelector, useDispatch } from 'react-redux';
var secondsForGame = 20;//60 * 20;

const GameClock = () => {

  const players = useSelector(state => state.monopolyReducer.players);
  const fields = useSelector(state => state.monopolyReducer.monopolyFields);
  const dispatch = useDispatch();
  const activePlayerIndex = useSelector(state => state.monopolyReducer.activePlayerIndex);
  const myIndex = useSelector(state => state.monopolyReducer.myIndex);

  const [time, setTime] = useState({});
  const [seconds, setSeconds] = useState(secondsForGame);
  const [gameOver, setGameOver] = useState(false);

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


  if(seconds<=1 && !gameOver && activePlayerIndex === myIndex)
  {
    debugger;
    setGameOver(true);
    EndGameEvent(players,fields,dispatch);
  }

  return (
    <div id="gameClock">
      <p>
        {("0" + time.m).slice(-2)}:{("0" + time.s).slice(-2)}
      </p>
    </div>
  );
};
export default GameClock;
