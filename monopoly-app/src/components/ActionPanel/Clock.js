import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import "../../styles/GameClock.css";

var secondsForAction = 5; var secondsForGame = 60 * 20;

class Clock extends Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: secondsForAction };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
      this.resetClock = this.resetClock.bind(this);
    }
  
    secondsToTime(secs) {
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
    componentDidMount() {
        if (this.props.typeOfClock === "gameClock")
             this.setState({ time: this.secondsToTime(secondsForGame), seconds: secondsForGame });
        else this.setState({ time: this.secondsToTime(secondsForAction), seconds: secondsForAction });
        
        this.startTimer();
        //useEffect(() => {this.resetClock()}, [this.props.data.data.activePlayerIndex])
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }
    
    countDown() {
        // Remove one second, set state so a re-render happens.
        if (this.state.seconds > 0) 
        {
            let seconds = this.state.seconds - 1;
            this.setState({
                time: this.secondsToTime(seconds),
                seconds: seconds,
            });
        }
    }

    resetClock() {
        this.setState({
            time: this.secondsToTime(secondsForAction),
            seconds: secondsForAction,
        });
    }
    
    render() {
        if (this.props.typeOfClock === "turnClock")
            return(
                <Button id="endTurnButton" onClick={() => this.props.endTurnEvent()} onMouseDown={(e) => e.preventDefault()}
                    //disabled={this.props.data.myIndex !== this.props.data.activePlayerIndex}
                    >
                    <span>Zakończ turę [{this.state.time.m * 60 + this.state.time.s}s]</span>
                </Button>    
            );
        else return(
            <div id="gameClock">
                <p>{('0'+this.state.time.m).slice(-2)}:{('0'+this.state.time.s).slice(-2)}</p>
            </div>
        );
    }
}
export default Clock;