import _ from 'lodash';
import { h, Component } from 'preact';
import classNames from 'classnames';
import Icon from 'react-fontawesome';
import { Colors } from './pearl-thread-style-constants';
import { CONTENT_MAX_WIDTH } from '../../constants/layout-constants';

const FuturePearl = ({ index }) => (
    <span>
        {index}
        <style jsx>{`
            span {
                color: rgba(255, 255, 255, 0.5);
                cursor: pointer;
                transform: translateX(-100%);
                position: absolute;
            }
        `}</style>
    </span>
);

const PastPearl = () => (
    <span className="pearl">
        <Icon name="check" />

        <style jsx>{`
            .pearl {
                display: block;
                text-align: center;
                line-height: 24px;
                border-radius: 50%;
                width: 24px;
                height: 24px;
                border: 2px solid #79a19e;
                border-radius: 50%;
                cursor: pointer;
                font-size: 12px;
            }
        `}</style>
    </span>
);

const TitlePearl = ({ isFirst, isLast, title }) => {
    const style = {};

    if (!isFirst && !isLast) {
        style.transform = 'translateX(-50%)';
    }

    if (isLast) {
        style.transform = 'translateX(-100%)';
    }

    return (
        <span className="title" style={style}>
            {title}

            <style jsx>{`
                .title {
                    position: absolute;
                    text-align: center;
                    cursor: pointer;
                    font-size: 14px;
                    white-space: nowrap;
                    padding: 7px 15px;
                    background: #3d7875;
                    border-radius: 20px;
                    border: 2px solid #79a19e;
                    margin-top: -4px;
                    box-sizing: border-box;
                    z-index: 1;
                    text-transform: capitalize;
                }
            `}</style>
        </span>
    );
}

const Pearl = ({ isPast, index, title, isFirst, isLast, onClick = _.noop }) => {
    let content = <FuturePearl index={index + 1} />;

    if (isPast) {
        content = <PastPearl />
    }

    if (title) {
        content = <TitlePearl isFirst={isFirst} isLast={isLast} title={title} />
    }

    return (
        <div className="pearl-container">
            <span onClick={() => onClick(index)}>
                {content}
            </span>

            <style jsx>{`
                .pearl-container {
                    position: relative;
                    margin-top: 10px;
                    width: 0;
                    height: 0;
                    color: #f8d940;
                    font-family: 'Rosario', sans-serif;
                }
            `}</style>
        </div>
    );
}

const PearlThread = ({ itemsCount, activeIndex = 0, activeTitle, onPearlClick }) => {
    const progressPercentage = (activeIndex / (itemsCount - 1)) * 100;
    const safeProgressPercentage = Math.min(progressPercentage, 100);

    return (
        <div className="pearl-thread content-container">
            <div className="progress-bar" style={{ width: `${safeProgressPercentage}%` }} ></div>
            <div className="pearls-container">
                {new Array(itemsCount).fill(0).map((_, index) => (
                    <Pearl
                        isPast={index < activeIndex}
                        title={activeIndex === index ? activeTitle : null}
                        index={index}
                        isFirst={index === 0}
                        isLast={index === itemsCount - 1}
                        onClick={onPearlClick}
                    />
                ))}
            </div>

            <style jsx>{`
                .pearl-thread {
                    min-height: 60px;
                    padding: 0 20px;
                    max-width: ${CONTENT_MAX_WIDTH}px;
                }

                .puzzle-progress-container {
                    margin-top: 5px;
                    display: flex;
                    justify-content: space-between;
                }

                .progress-bar {
                    background-color: ${Colors.PROGRESS_BAR_COLOR};
                    width: 100%;
                    height: 3px;
                    transition: width 1s;
                }

                .pearls-container {
                    display: flex;
                    justify-content: space-between;
                }
            `}</style>
        </div>
    );
}

export { PearlThread };
