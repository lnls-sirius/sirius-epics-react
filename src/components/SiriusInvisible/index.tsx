import React from "react";
import Epics from "../../data-access/EPICS/Epics";
import { PvInterface, Dict, EpicsData } from "../../assets/interfaces";

/**
 * Monitor without display some EPICS PVs
 * @param update_interval - Update interval in milliseconds
 * @param epics - Epics Object
 * @param timer - Timer object
 * @param pv_name - Name of the PV connected
 * @param firstValue - Load first value with more delay
 */
class SiriusInvisible extends React.Component<PvInterface<string[]>>{
  private firstValue: boolean = true;
  private update_interval: number = 100;
  private epics: Epics;
  private timer: null|NodeJS.Timer;
  private pv_name: string[];

  constructor(props: PvInterface<string[]>) {
    super(props);

    this.updateLabel = this.updateLabel.bind(this);

    if(props.update_interval!=undefined){
      this.update_interval = props.update_interval;
    }
    this.epics = new Epics(props.pv_name);
    this.pv_name = this.props.pv_name;
    this.timer = setInterval(
      this.updateLabel, this.update_interval);
  }

  componentDidUpdate(): void {
    this.epics = new Epics(this.props.pv_name);
    this.pv_name = this.props.pv_name;
  }

  /**
   * Update value with measured EPICS value
   */
  updateLabel(): void {
    const pvData: Dict<EpicsData<string>> = this.epics.pvData;
    this.pv_name.map((pvname: string) => {
      const pvInfo: EpicsData<string> = pvData[pvname];
      if(pvInfo != undefined &&
        this.props.modifyValue!=undefined){
          if(pvInfo.value){
            this.props.modifyValue<EpicsData<string>>(
              pvInfo,
              pvname);
            this.firstValue = false;
          }
      }else{
        if(this.firstValue){
          setTimeout(this.updateLabel, 200);
        }
      }
    })
  }

  /**
   * Unmount Component
   */
  componentWillUnmount(): void {
    if(this.timer!=null){
      clearInterval(this.timer);
      this.epics.disconnect();
    }
  }

  render(): React.ReactNode {
    return <div/>;
  }
}

export default SiriusInvisible;
