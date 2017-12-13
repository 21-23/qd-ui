import { h } from 'preact';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';

import { Scoreboard } from './Scoreboard';
import Score from './Score.mock';

storiesOf('Scoreboard', module)
    .add('Round score', () => (
        <Scoreboard 
            roundScore={Score.players} 
            aggregateScore={Score.players} 
            visibleScore="round" 
        />
    ))
    .add('Aggregate score', () => (
        <Scoreboard 
            roundScore={Score.players} 
            aggregateScore={Score.players} 
            visibleScore="aggregate" 
        />
    ))
    .add('Score with selector', () => (
        <Scoreboard 
            roundScore={Score.players} 
            aggregateScore={Score.players} 
            visibleScore={select('visible score', ['round', 'aggregate'], 'round')} 
        />
    ));
