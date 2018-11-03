import React from 'react';

const RoundStartCountdown = ({ timeRemaining }) => (
    <div>
        { timeRemaining }
        <style jsx>{`
        div {
            color: #badece;
            font-size: 15em;
            text-align: center;
        }
        `}
        </style>
    </div>
);

export { RoundStartCountdown };
