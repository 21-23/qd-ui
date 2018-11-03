import React, { Component, cloneElement } from 'react';

class Canvas extends Component {
    componentDidMount() {
        this.ctx = this.canvas.getContext('2d');

        // retina magic start
        // see https://www.html5rocks.com/en/tutorials/canvas/hidpi/

        const backingStoreRatio = this.ctx.webkitBackingStorePixelRatio || 1;
        const devicePixelRatio = window.devicePixelRatio || 1;

        this.ratio = devicePixelRatio / backingStoreRatio;
        this.canvas.style.transformOrigin = '0 0';
        this.canvas.style.transform = `scale(${1 / this.ratio}, ${1 / this.ratio})`;
        // retina magic end

        this._render();
    }

    componentDidUpdate() {
        this._render();
    }

    _render() {
        this.size = this.props.size * this.ratio;

        this.canvas.width = this.size;
        this.canvas.height = this.size;

        React.Children.forEach(this.props.children, child => {
            child.type.render(this.ctx, { ...child.props, size: this.size });
        });
    }

    render() {
        return (
            <div>
                <canvas 
                    ref={node => this.canvas = node} 
                        style={{
                        width: `${this.props.size}px`,
                        height: `${this.props.size}px`,
                    }}
                />
            </div>
        );
    }
}

export { Canvas, Context, CanvasChild };
