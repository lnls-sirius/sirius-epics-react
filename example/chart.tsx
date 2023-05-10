import React, { useState } from 'react';
import styled from 'styled-components';
import SiriusChart from '../src/components/SiriusChart';

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;/
`


const ChartDoc: React.FC = () => {
    const [pvs, setPVs] = useState<string[]>(['4ewewe']);

    const threshold = {
        'alert': 0.5,
        'alarm': 0.6
    }

    function handleMod(value: any, pvname: string[] | undefined): any {
        return value+0.1
    }

    return (
        <Wrapper>
            <button onClick={()=> setPVs(
                ["RAD:Berthold:TotalDoseRate:Dose",
                "RAD:ELSE:TotalDoseRate:Dose", "RAD:Berthold:TotalDoseRate:Dose",
                "RAD:ELSE:TotalDoseRate:Dose"])}>
                    ADD PVs
            </button>
            <SiriusChart
                pv_name={[...pvs]}
                label={['Thermo1', 'Thermo2', 'Thermo3', 'Thermo4']}
                color_label={['#ff0109', '#ff01ff', '#55dd01', '#b3a912']}
                threshold={threshold}
                modifyValue={handleMod}/>
        </Wrapper>
    )
}

export default ChartDoc;
