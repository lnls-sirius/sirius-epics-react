import React, { useState } from 'react';
import styled from 'styled-components';
import SiriusChart from '../src/components/SiriusChart';

const Wrapper = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: space-between;/
`

const pvsData = [
    "RAD:Berthold:TotalDoseRate:Dose",
    "RAD:ELSE:TotalDoseRate:Dose",
    "RAD:Thermo1:TotalDoseRate:Dose",
    "RAD:Thermo10:TotalDoseRate:Dose",
    "RAD:Thermo11:TotalDoseRate:Dose",
    "RAD:Thermo12:TotalDoseRate:Dose",
    "RAD:Thermo13:TotalDoseRate:Dose",
    "RAD:Thermo14:TotalDoseRate:Dose",
    "RAD:Thermo15:TotalDoseRate:Dose",
    "RAD:Thermo16:TotalDoseRate:Dose",
    "RAD:Thermo2:TotalDoseRate:Dose",
    "RAD:Thermo3:TotalDoseRate:Dose",
    "RAD:Thermo4:TotalDoseRate:Dose",
    "RAD:Thermo5:TotalDoseRate:Dose",
    "RAD:Thermo6:TotalDoseRate:Dose",
    "RAD:Thermo7:TotalDoseRate:Dose",
    "RAD:Thermo8:TotalDoseRate:Dose",
    "RAD:Thermo9:TotalDoseRate:Dose"
]


const ChartDoc: React.FC = () => {
    const [pvs, setPVs] = useState<string[]>(['4ewewe']);

    const threshold = {
        'alert': 0.1,
        'alarm': 0.14
    }

    function handleMod(value: any, pvname?: string[] | undefined): any {
        return value+0.01
    }

    return (
        <Wrapper>
            <button onClick={()=> setPVs([
    "RAD:Berthold:TotalDoseRate:Dose",
    "RAD:ELSE:TotalDoseRate:Dose"])}>sd</button>
            <SiriusChart
                pv_name={[...pvs]}
                threshold={threshold}
                modifyValue={handleMod}/>
        </Wrapper>
    )
}

export default ChartDoc;
