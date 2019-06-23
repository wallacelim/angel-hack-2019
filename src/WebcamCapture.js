import React from 'react';
import Webcam from 'react-webcam';
import ScanTimer from './ScanTimer';
import {Redirect} from 'react-router-dom';
import './WebcamCapture.css';

export default class WebcamCapture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            scan: false,
            showScanTimer: false,
            img: null,
            timer: 3
        }

        //Bind functions
        this.startScanTimer = this.startScanTimer.bind(this);
        this.tick = this.tick.bind(this);
        this.capture = this.capture.bind(this);

    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    startScanTimer = () => {
        this.setState({showScanTimer: true});
        this.timerID = setInterval((timerID) => this.tick(timerID), 1000);
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot()
        this.setState({img: imageSrc, scan: true})
    }

    tick = (timerID) => {
        if (this.state.timer <= 0) {
            clearInterval(this.timerID);
            this.capture();
        } else {
            this.setState({timer: this.state.timer - 1,});
        }
    }

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };
        while(!this.state.scan) {
            return (

                <div className = "WebcamCapture">
                    <div className = "container-fluid camera">
                        <Webcam
                            audio={false}
                            height={480}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                            width={840}
                            videoConstraints = { videoConstraints }
                            />
                    </div>
                    <div className = "container-fluid scan-btn">
                        {this.state.showScanTimer ?
                            <div>
                                <h1>Scanning in {this.state.timer}</h1>
                            </div>
                            :
                            <button onClick={() => this.startScanTimer()} className = "btn btn-lg scan scan-text">Scan</button>
                        }
                    </div>
                </div>
            );
        }
        return <Redirect to = {{pathname: "./Scanning", img: this.state.img}}/>
    }
}
