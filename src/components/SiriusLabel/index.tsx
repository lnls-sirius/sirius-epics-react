import React from "react";
import EpicsBase from "../epics";
import SiriusTooltip from "../SiriusTooltip";
import { Dict, EpicsData, LabelPv, State } from "../../assets/interfaces";

/**
 * Default Label component for monitoring a PV from the EPICS control system.
 */
class SiriusLabel extends React.Component<LabelPv, State<string>>{
  private epics: EpicsBase<string>;
  private precision: number|undefined;
  private hasMounted: boolean;

  constructor(props: LabelPv) {
    super(props);
    this.updateLabel = this.updateLabel.bind(this);

    this.state = {
      value: 'NC'
    };
    this.hasMounted = false;
    this.epics = this.initialize_epics_base(props);
    this.precision = props.precision;
    this.updateLabel();
  }

  componentDidMount(): void {
    this.hasMounted = true;
  }

  /**
   * Save PV name with update
   */
  componentDidUpdate(): void {
    const { pv_name } = this.props;
    this.epics.set_pvname(pv_name);
  }

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
      if(pvInfo.value != undefined){
        const pvInfoVal: string|number = pvInfo.value;
        if(this.state!=null && pvInfoVal != null){
          const isNumber = pvInfo.datatype == "DBR_DOUBLE" &&
            typeof(pvInfoVal) == "number";
          if(isNumber && this.precision!==undefined){
            label_value = Number(pvInfoVal).toFixed(this.precision);
          }else{
            label_value = pvInfoVal.toString();
          }
          if(modifyValue!=undefined){
            label_value = modifyValue<string>(
              label_value, pv_name);
          }
        }
      }
    }

    if(this.hasMounted){
      this.setState({
        value: label_value
      });
    }
  }

  /**
   * Show unit of the PV being measured
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
