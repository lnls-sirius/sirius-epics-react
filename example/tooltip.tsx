import React from 'react';
import styled from 'styled-components';
import SiriusTooltip from '../src/components/SiriusTooltip';

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`

const Square = styled.div`
    width: 2em;
    height: 2em;
    margin: 0em 0.5em;
    border-radius: 0.2em;
    background-color: #00ff00;
`

const Divider = styled.span`
    margin-left: 10em;
`

const TooltipDoc: React.FC = () => {
    return (
        <Wrapper>
            <SiriusTooltip text="Tooltip text">
                <Square/>
            </SiriusTooltip>
            <Divider/>
            <SiriusTooltip text="Random Tooltip text">
                A random text
            </SiriusTooltip>
        </Wrapper>
    )
}

export default TooltipDoc;
