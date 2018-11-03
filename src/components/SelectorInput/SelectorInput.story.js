import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { SelectorInput } from './SelectorInput';

storiesOf('SelectorInput', module)
    .add('default', () => (
        <SelectorInput
            value=".match"
            onInput={action('onInput')}
        />
    ))
    .add('disabled', () => (
        <SelectorInput
            onInput={action('onInput')}
            disabled
        />
    ));
