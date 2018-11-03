import React from 'react';
import { storiesOf } from '@storybook/react';

import { PuzzleTitle } from './PuzzleTitle';

storiesOf('PuzzleTitle', module)
    .add('default', () => (
        <PuzzleTitle index={1} title="Signing up"/>
    ));
