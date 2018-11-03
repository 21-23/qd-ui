import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, array, number, withKnobsOptions } from '@storybook/addon-knobs';

import { MarkupRenderer } from './MarkupRenderer';

import { Line } from './Line';
import { withDotSelectionIndicator, DotSelectionIndicatorColors } from './with-dot-selection-indicator';
import { withLineBackgroundSelection, LineBackgroundSelectionColors } from './with-line-background-selection';


const taskSource = `
<main data-qdid="1">
    <input data-qdid="2" type="text"></input>
    <input data-qdid="3" type="number"></input>
    <input data-qdid="4" type="checkbox" checked></input>
    <input data-qdid="5" type="checkbox"></input>
    <input data-qdid="6" type="text"></input>
</main>
`;

storiesOf('MarkupRenderer', module)
    .addDecorator(withKnobsOptions({ escapeHTML: false }))
    .add('default', () => (
        <MarkupRenderer
            source={text('source', taskSource)}
            indentSize={number('indentSize', 4)}
            expectedSelection={array('expectedSelection', ["4"])}
            actualSelection={array('actualSelection', ["4", "5"])}
            LineComponent={Line}
        />
    ))
    .add('with dot selection indicator', () => (
        <MarkupRenderer
            source={text('source', taskSource)}
            indentSize={number('indentSize', 4)}
            expectedSelection={array('expectedSelection', ["4"])}
            actualSelection={array('actualSelection', ["4", "5"])}
            LineComponent={withDotSelectionIndicator(Line, DotSelectionIndicatorColors)}
        />
    ))
    .add('with background color selection', () => (
        <MarkupRenderer
            source={text('source', taskSource)}
            indentSize={number('indentSize', 4)}
            expectedSelection={array('expectedSelection', ["4"])}
            actualSelection={array('actualSelection', ["4", "5"])}
            LineComponent={withLineBackgroundSelection(Line, LineBackgroundSelectionColors)}
        />
    ));
