import React, { Component } from 'react';

import { Canvas } from './Canvas';
import { TimeRemainingText } from './TimeRemainingText';
import { Arc } from './Arc';
import { Animation } from './Animation';
import * as Colors from './countdown-color-palette';

const TIMER_TICK_INTERVAL = 1000;

class Countdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: props.timeRemaining / props.timeAmount,
        };
    }

    static getDerivedStateFromProps(props, state) {
        return {
            ...state,
            ...props,
        };
    }

    render() {

        return (
            <Canvas ref={canvas => this.canvas = canvas} size={this.state.size}>
                <Arc
                    color={this.state.arcColor}
                    strokeSize={this.state.strokeSize}
                    progress={1}
                />
                <Arc
                    ref={arc => this.progressArc = arc}
                    color={this.state.remainingTimeArcColor}
                    strokeSize={this.state.strokeSize}
                    progress={this.state.progress}
                />
                <TimeRemainingText
                    timeRemaining={this.state.timeRemaining}
                    size={this.state.size}
                    textFillColor={this.state.textFillColor}
                />
            </Canvas>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.timeRemaining === this.props.timeRemaining) {
            return;
        }

        this.animation && this.animation.stopAnimation();

        this.animation = new Animation({
            from: prevState.progress,
            to: this.props.timeRemaining / this.props.timeAmount,
            duration: TIMER_TICK_INTERVAL,
        });

        this.animation.animate((v) => {
            this.setState({
                progress: v,
            });
        })
    }

    componentWillUnmount() {
        this.animation && this.animation.stopAnimation();
    }
}

Countdown.defaultProps = {
    size: 100,
    strokeSize: 0.03,
    textFillColor: Colors.TEXT_COLOR,
    arcColor: Colors.ARC_COLOR,
    remainingTimeArcColor: Colors.TIME_REMAINING_ARC_COLOR,
};

export { Countdown };
