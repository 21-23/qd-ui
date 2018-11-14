import { h } from 'preact';
import Icon from 'react-fontawesome';

import { CONTENT_INSET_PADDING } from '../../constants/layout-constants';
import { Button } from '../Button/Button';

const Header = ({ productName, username, backgroundImageUrl, onLogoutButtonClick }) => (
    <header style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
        <div className="content-container">
            <span className="title">{productName}</span>

            {username ?
                <span className="username">
                    <Icon name="user" />
                    <span>{username}</span>

                    <Button text="Logout" iconRight="sign-out" onClick={onLogoutButtonClick} />
                </span>
                : null
            }
        </div>
        <style jsx>{`
            header {
                font-family: 'Rosario', sans-serif;
                background-size: auto 100%;
                color: white;
                box-sizing: border-box;
                border-bottom: 1px solid #49837e;
            }

            .content-container {
                height: 70px;
                flex: 0;
                display: flex;
                flex-basis: 70px;
                padding: 0 ${CONTENT_INSET_PADDING}px;
                align-items: center;
                justify-content: space-between;
            }

            .title {
                font-size: 24px;
                font-weight: bold;
            }

            .username {
                font-size: 18px;
            }

            .username > span {
                margin-left: 10px;
                margin-right: 15px;
                text-transform: capitalize;
            }
        `}</style>
    </header>
);

export { Header };
