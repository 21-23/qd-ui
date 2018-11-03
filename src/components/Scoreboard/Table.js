import _ from 'lodash';
import React, { Component } from 'react';
import VirtualList from 'react-tiny-virtual-list';

const ROW_HEIHGT = 35;

export class Table extends Component {
    state = {
        height: document.body.offsetHeight,
    }

    static defaultProps = {
        isActiveRow: _.constant(false),
    }

    _onResize = () => {
        this.setState({
            height: this.container.offsetHeight,
        });
    }

    componentDidMount() {
        this._onResize();
        window.addEventListener('resize', this._onResize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._onResize);
    }

    _renderCells = (columns, item, rowIndex) => columns.map((column) => {
        const format = column.format || _.identity;
        const value = column.isIndex ? (rowIndex + 1) : format(item[column.key]);

        return <div className={`cell ${column.key}`}>{ value }</div>
    });

    _renderRow = ({ index, style }) => {
        const { isActiveRow, columns } = this.props;
        const item = this.props.items[index];

        const cells = this._renderCells(columns, item, index);

        return (
            <div className={`row ${isActiveRow(item) ? '-active' : ''}`} style={style} key={index}>
                { cells }
            </div>
        );
    };

    render() {
        const { columns, items } = this.props;

        return (
            <div className="table-wrapper" ref={node => this.container = node}>
                <div className="row -heading">
                    { columns.map(column => <div className={`cell ${column.key}`} key={column.key}>{ column.title}</div>)}
                </div>

                <VirtualList
                    data={items}
                    className="table"
                    width="100%"
                    height={this.state.height}
                    itemSize={ROW_HEIHGT}
                    itemCount={items.length}
                    renderItem={this._renderRow}
                />

                <style jsx global>{`
                    .table-wrapper {
                        position: relative;
                        padding-top: ${ROW_HEIHGT}px;
                        height: 100%;
                        overflow: hidden;
                    }

                    .table {
                        height: 100%;
                        overflow: auto;
                    }

                    .row {
                        height: ${ROW_HEIHGT}px;
                        white-space: nowrap;
                        width: 100%;
                        color: white;
                    }

                    .row.-active {
                        color: #87C736;
                    }

                    .row.-heading {
                        position: absolute;
                        top: 0;
                    }

                    .row.-heading .cell {
                        border-bottom: 3px solid #3C8A82;
                    }

                    .cell {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: inline-block;
                        box-sizing: border-box;
                        padding: 5px;
                        text-align: center;
                        border-bottom: 1px solid #3C8A82;
                    }

                    .cell:first-child {
                        text-align: left;
                    }

                    .cell:last-child {
                        text-align: right;
                    }
                `}</style>
            </div>
        );
    }
}
