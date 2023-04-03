import React, { useState } from 'react';
import styled from 'styled-components';
import SiriusInvisible from '../src/components/SiriusInvisible';

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
`

const InvisibleDoc: React.FC = () => {
    const [values, setValues] = useState({});

    function valueList<EpicsData>(value: EpicsData, pvname?: string): EpicsData {
        if(pvname !== undefined){
            setValues(prev => ({...prev, [pvname]: value.value}));
        }
        return value
    }

    return (
        <div>
            <Wrapper>
                An Invisible Widget to monitor 1 or several PVs:
                <SiriusInvisible pv_name={["RAD:Thermo1:Gamma", "RAD:Thermo2:Gamma"]} modifyValue={valueList}/>
                {Object.entries(values).map(([key, value]: [string, any])=>{
                    return (
                        <div>
                            --{key} {value}--
                        </div>
                    )
                })}
            </Wrapper>
        </div>
    )
};

export default InvisibleDoc;
