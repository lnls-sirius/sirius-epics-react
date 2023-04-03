import React from "react";
import EpicsBase from "../epics";
import { PvInterface, Dict, EpicsData } from "../../assets/interfaces";

/**
 * Monitor without display some EPICS PVs
 */
class SiriusInvisible extends React.Component<PvInterface<string[]>>{
  private epics: EpicsBase<string[]>;

  constructor(props: PvInterface<string[]>) {
    super(props);

    this.updateLabel = this.updateLabel.bind(this);
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

  initialize_epics_base(props: PvInterface<string[]>): EpicsBase<string[]> {
    const { pv_name, threshold, update_interval } = props;
    this.epics = new EpicsBase(pv_name);
    this.epics.initialize(pv_name, threshold, update_interval);
    this.epics.start_timer(this.updateLabel);
    return this.epics;
  }

  /**
   * Update value with measured EPICS value
   */
  updateLabel(): void {
    const { pv_name } = this.props;
    const pvData: Dict<EpicsData<string>> = this.epics.get_pv_data();
    pv_name.map((pvname: string) => {
      const pvInfo: EpicsData<string> = pvData[pvname];
      if(pvInfo != undefined &&
        this.props.modifyValue!=undefined){
          if(pvInfo.value){
            this.props.modifyValue<EpicsData<string>>(
              pvInfo,
              pvname);
          }
      }
    })
  }

  render(): React.ReactNode {
    return <div/>;
  }
}

export default SiriusInvisible;
