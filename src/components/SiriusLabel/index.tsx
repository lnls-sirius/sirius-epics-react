import React from "react";
import EpicsBase from "../epics";
import SiriusTooltip from "../SiriusTooltip";
import { Dict, EpicsData, LabelPv, State } from "../../assets/interfaces";

/**
 * Show a default Label display for EPICS
 * @param props
 *   - state - Initial state of the PV
 */
class SiriusLabel extends React.Component<LabelPv, State<string>>{
  private epics: EpicsBase<string>;

  constructor(props: LabelPv) {
    super(props);
    this.updateLabel = this.updateLabel.bind(this);

    this.state = {
      value: 'NC'
    };

    this.epics = this.initialize_epics_base(props);
    this.updateLabel();
  }

  /**
   * Save PV name with update
   */
  componentDidUpdate(): void {
    const { pv_name } = this.props;
    this.epics.set_pvname(pv_name);
  }

  /**
   * Unmount Component
   */
  componentWillUnmount(): void {
    this.epics.destroy();
  }

  initialize_epics_base(props: LabelPv): EpicsBase<string> {
    const { pv_name, threshold, update_interval } = props;

    this.epics = new EpicsBase(pv_name);
    this.epics.initialize(pv_name, threshold, update_interval);
    this.epics.start_timer(this.updateLabel);
    return this.epics;
  }

  /**
   * Update label with measured EPICS value
   */
  updateLabel(): void {
    const { pv_name, modifyValue } = this.props;
    const pvData: Dict<EpicsData<string>> = this.epics.get_pv_data<string>();
    const pvInfo: EpicsData<string> = pvData[pv_name];
    let label_value: string = 'NC';
    if(pvInfo != undefined){
      const pvInfoVal: string|number = pvInfo.value;
      const isNotNull: boolean = this.state!=null && pvInfoVal != null;
      if(isNotNull){
        const isNumber = pvInfo.datatype == "DBR_DOUBLE" &&
          typeof(pvInfo.value) == "number";
        if(isNumber){
          label_value = pvInfoVal.toFixed(3);
        }else{
          label_value = pvInfoVal.toString();
        }
        if(modifyValue!=undefined){
          label_value = modifyValue<string>(
            label_value, pv_name);
        }
      }
    }

    this.setState({
      value: label_value
    });
  }

  /**
   * Show unit of the PV being measured
   * @returns egu
   */
  showEgu(): string {
    const { egu } = this.props;
    if (egu!=undefined){
      return egu;
    }
    return "";
  }

  render(): React.ReactNode {
    const { pv_name } = this.props;

    return(
      <SiriusTooltip text={pv_name}>
        {this.state.value} {this.showEgu()}
      </SiriusTooltip>
    );
  }
}

export default SiriusLabel;
