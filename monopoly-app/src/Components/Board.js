import React, { Component } from 'react';
import Field from './Field'
import {data} from '../Data'
import '../Css/Board.css'

class Board extends Component
{
    render() {
        return (
            <div className="container-fluid content-row">
                <div className="row row-top" >
                    <div className="col-2 card-deck"><Field data={data[20]}/></div>
                    <div className="col card-deck"><Field rotate="card-top" data={data[21]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={data[22]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={data[23]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={data[24]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={data[25]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={data[26]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={data[27]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={data[28]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={data[29]}/></div>
                    <div className="col-2 card-deck"><Field data={data[30]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[19]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[31]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[18]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[32]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[17]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[33]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[16]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[34]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[15]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[35]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[14]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[36]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[13]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[37]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[12]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[38]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={data[11]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={data[39]}/></div>
                </div>
                <div className="row row-bottom" >
                    <div className="col-2 card-deck"><Field data={data[10]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[9]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[8]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[7]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[6]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[5]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[4]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[3]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[2]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={data[1]}/></div>
                    <div className="col-2 card-deck"><Field data={data[0]}/></div>
                </div>
            </div>

        );
    }
}
export default Board