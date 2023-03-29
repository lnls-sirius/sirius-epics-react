import React from 'react';
import styled from 'styled-components';
import SiriusLed from '../src/components/SiriusLed';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 10% 10% 10% 10% 10% 10%;
  text-align: center;
  align-items: center;
  justify-content: space-between;/
`

const Square = styled.div`
    width: 2em;
    height: 2em;
    margin: 0em 0.5em;
    border-radius: 0.2em;
    background-color: #00ff00;
`

const LedDoc: React.FC = () => {
    return (
        <div>
            <Wrapper>
                Square led (square): <SiriusLed pv_name="RAD:ELSE:Gamma" shape={'square'}/>
                Square with round borders(squ_circ): <SiriusLed pv_name="RAD:ELSE:Gamma" shape={'squ_circ'}/>
                Circle led (circle): <SiriusLed pv_name="RAD:ELSE:Gamma" shape={'circle'}/>
            </Wrapper>
        </div>
    )
}

export default LedDoc;
