import React from 'react';
import styled from 'styled-components';
import SiriusTooltip from '../src/components/SiriusTooltip';

const Square = styled.div`
    width: 2em;
    height: 2em;
    margin: 0em 0.5em;
    border-radius: 0.2em;
    background-color: #00ff00;
`

const TooltipDoc: React.FC = () => {
    return (
        <div>
            This is an example of the tooltip box, press the scroll
            button to see the tooltip.
            <SiriusTooltip text="Tooltip text">
                <Square/>
            </SiriusTooltip>
        </div>
    )
}

export default TooltipDoc;
