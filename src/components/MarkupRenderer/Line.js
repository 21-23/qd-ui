import React from 'react';

import { Attribute } from './Attribute';
import { indentString } from './markup-renderer-helpers';

const ClosingTag = ({ tagName, colors }) => (
    <span>
        { '</' }
        <span style={{ color: colors.tagName }}>
            { tagName }
        </span>
        { '>' }
    </span>
);

const OpeningTag = ({ tagName, attributes, selfClosing, colors, text }) => (
    <span>
        { '<' }
        <span style={{ color: colors.tagName }}>
            { tagName }
        </span>
        { attributes.map((attr, index) => <Attribute {...attr} colors={colors} key={index} />) }
        { selfClosing ? ' />' : '>' }
        { text }
    </span>
);

const Line = ({ indentLevel, indentSize, tagName, attributes, text, closing, selfClosing, empty, colors, id }) => (
    <div className="line">
        <span>{indentString(indentLevel, indentSize)}</span>
        { closing ?
            <ClosingTag
                tagName={tagName}
                colors={colors}
                key={`${id}-closing`}
            /> :
            <OpeningTag
                tagName={tagName}
                attributes={attributes}
                selfClosing={selfClosing}
                text={text}
                colors={colors}
                key={`${id}-opening`}
            />
        }

        { empty && !selfClosing ?
            <ClosingTag
                tagName={tagName}
                colors={colors}
                key={`${key}-closing`}
            /> :
            null
        }
    </div>
);

export { Line };
