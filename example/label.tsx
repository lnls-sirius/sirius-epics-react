import React from 'react';
import styled from 'styled-components';
import SiriusLabel from '../src/components/SiriusLabel';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`

const LabelDoc: React.FC = () => {
    return (
        <div>
            <Wrapper>
                <SiriusLabel pv_name={'RAD:ELSE:Gamma'} egu='KWh'/>
                <SiriusLabel pv_name={'RAD:Berthold:Gamma'} egu='m'/>
                <SiriusLabel pv_name={'RAD:Thermo1:Gamma'} precision={5} egu='uSv'/>
                <SiriusLabel pv_name={'TS-02:DI-Scrn:ScrnType-Sel'} egu='Sv'/>
            </Wrapper>
        </div>
    )
};

export default LabelDoc;
