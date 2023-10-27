import React, { useState, useEffect } from "react";
import EpicsBase from "../../controllers/epics_base";
import SiriusTooltip from "../SiriusTooltip";
import { Dict, EpicsData, LabelPv, State } from "../../assets/interfaces";

/**
 * Default Label component for monitoring a PV from the EPICS control system.
 */
const SiriusLabel: React.FC<LabelPv> = (props) => {
  const epics: EpicsBase<string> = new EpicsBase<string>(props.pv_name);
  const [value, setValue] = useState<string>('NC');
  const precision: number|undefined = props.precision;

  useEffect(() => {
    initialize_epics_base();
  }, []);

  useEffect(() => () => {
    epics.destroy();
  }, []);

  const initialize_epics_base = (): void => {
    const { pv_name, threshold, update_interval } = props;
    epics.initialize(pv_name, threshold, update_interval);
    epics.start_timer(updateLabel);
    epics.set_pvname(props.pv_name);
  }

  /**
   * Update label with measured EPICS value
   */
  const updateLabel = (): void => {
    const { pv_name, modifyValue } = props;
    const pvData: Dict<EpicsData<string>> = epics.get_pv_data<string>();
    const pvInfo: EpicsData<string> = pvData[pv_name];
    let label_value: string = 'NC';
    if(!pvInfo)
      return;
    if(!pvInfo.value)
      return;

    const pvInfoVal: string|number = pvInfo.value;
    const invalidValue:boolean = ((value==null) || (pvInfoVal == null));
    if(invalidValue)
      return;

    const isNumber = pvInfo.datatype == "DBR_DOUBLE" &&
      typeof(pvInfoVal) == "number";
    if(isNumber && precision!==undefined)
      label_value = Number(pvInfoVal).toFixed(precision);
    else
      label_value = pvInfoVal.toString();
    if(modifyValue!=undefined)
      label_value = modifyValue<string>(label_value, pv_name);
    setValue(label_value);
  }

  /**
   * Show unit of the PV being measured
   */
  const showEgu = (): string => {
    const { egu } = props;
    if (egu!=undefined)
      return egu;
    return "";
  }

  return(
    <SiriusTooltip text={props.pv_name}>
      <div data-testid="sirius-label">
        {value} {showEgu()}
      </div>
    </SiriusTooltip>
  );
}

export default SiriusLabel;
