import React from 'react';
import styled from 'styled-components';
import SiriusLed from '../src/components/SiriusLed';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 10%);
  text-align: center;
  align-items: center;
  justify-content: space-between;/
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
                    'alert': 'radial-gradient(#f8ff1b, #a29800)',
                    'som': '#000000',
                    'alarm': 'radial-gradient(#ff1b1b, #a20000)'
                }}/>
                Circle led (circle): <SiriusLed pv_name="RAD:ELSE:Gamma" shape={'circle'} threshold={threshold3}/>
                Led with disconnection handler: <SiriusLed pv_name="RAD:Thermo7:TotalDoseRate:Dose" shape={'circle'} disc_time={1500}/>
            </Wrapper>
        </div>
    )
}

export default LedDoc;
