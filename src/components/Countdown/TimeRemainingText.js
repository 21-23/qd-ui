import React, { Component } from 'react';

import { Context } from './Canvas';
import { formatScoreTime } from '../../formatters/score';

const COMPONENT_SIZE_TO_FONT_SIZE_RATIO = 4;

class TimeRemainingText extends Component {
    static render(ctx, props) {
        const renderOptions = this.update(props);
        this.renderToCanvas(ctx, renderOptions);
    }

    static update(props) {
        const fontSize = props.size / COMPONENT_SIZE_TO_FONT_SIZE_RATIO;
        const text = formatScoreTime(props.timeRemaining);
        
        return {
            fontSize,
            text,
            size: props.size,
            textFillColor: props.textFillColor,
        }
    }

    static renderToCanvas(ctx, renderOptions) {
        ctx.font = `${renderOptions.fontSize}px sans-serif`;
        ctx.fillStyle = renderOptions.textFillColor;
        ctx.textBaseline = 'middle';

        const { width } = ctx.measureText(renderOptions.text);

        const textX = (renderOptions.size - width) / 2;
        const textY = renderOptions.size / 2;
        
        ctx.fillText(renderOptions.text, textX, textY);
    }

    render() {
        return null;
    }
}

export { TimeRemainingText };
