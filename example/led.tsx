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
    const threshold1 = {
        'alert': 0.06,
        'alarm': 0.6
    }

    const threshold2 = {
        'alert': 0.1,
        'som': 0.108,
        'alarm': 0.105
    }

    const threshold3 = {
        'alert': 0.5,
        'alarm': 0.7
    }

    return (
        <div>
            <Wrapper>
                Square led (square): <SiriusLed pv_name="RAD:ELSE:Gamma" shape={'square'} threshold={threshold1}/>
                Square with round borders(squ_circ): <SiriusLed pv_name="RAD:ELSE:Gamma" shape={'squ_circ'} threshold={threshold2} color={{
                    'ok': 'radial-gradient(#1bff1d, #14a200)',
                    'alert': 'radial-gradient(#f8ff1b, #a29800)',
                    'som': '#000000',
                    'alarm': 'radial-gradient(#ff1b1b, #a20000)',
                    'nc': 'radial-gradient(#dedede, #9e9e9e)'
                }}/>
                Circle led (circle): <SiriusLed pv_name="RAD:ELSE:Gamma" shape={'circle'} threshold={threshold3}/>
            </Wrapper>
        </div>
    )
}

export default LedDoc;
