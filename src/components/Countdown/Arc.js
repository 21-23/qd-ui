import React, { Component } from 'react';

class Arc extends Component {
    static render(ctx, props) {
        this.ctx = ctx;
        
        const renderOptions = this.update(props);
        this.renderToCanvas(ctx, renderOptions);
    }

    static update(props) {
        const strokeSize = props.size * props.strokeSize;

        return {
            strokeSize,
            center: props.size / 2,
            radius: (props.size - strokeSize) / 2,
            color: props.color,
            progress: props.progress,
        };
    }

    static renderToCanvas(ctx, renderOptions) {
        ctx.lineWidth = renderOptions.strokeSize;
        ctx.strokeStyle = renderOptions.color;
        ctx.lineCap = 'round';

        ctx.beginPath();

        ctx.arc(
            renderOptions.center,
            renderOptions.center,
            renderOptions.radius, -Math.PI / 2,
            Math.PI * 2 * renderOptions.progress - Math.PI / 2,
        );
        ctx.stroke();

        ctx.closePath();
    }

    render() {
        return null;
    }
}

export { Arc };
