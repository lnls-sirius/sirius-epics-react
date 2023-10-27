import React from "react";
import EpicsBase from "../../controllers/epics_base";
import SiriusTooltip from "../SiriusTooltip";
import { State, LedPv, EpicsData, Dict } from "../../assets/interfaces";
import { default_colors, led_shape } from "../../assets/themes";
import * as S from './styled';

/**
 * Default Led component for monitoring a PV from the EPICS control system.
 */
class SiriusLed extends React.Component<LedPv, State<string>>{
  private epics: EpicsBase<string>;
  private color_list: Dict<string>;
  private hasMounted: boolean;
  private fist_update: Date;

  constructor(props: LedPv) {
    super(props);
    this.updateLed = this.updateLed.bind(this);

    this.state = {
      value: 'nc'
    };
    this.fist_update = new Date(0);
    this.hasMounted = false;
    this.color_list = this.initialize_led_style(props.color);
    this.epics = this.initialize_epics_base(props);
    this.updateLed();
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

  initialize_epics_base(props: LedPv): EpicsBase<string> {
    const { pv_name, threshold, update_interval } = props;

    this.epics = new EpicsBase(pv_name);
    this.epics.initialize(pv_name, threshold, update_interval);
    this.epics.start_timer(this.updateLed);
    return this.epics;
  }

  initialize_led_style(color: Dict<string>|undefined) {
    if(color !== undefined) {
      color = this.handle_default_color(color);
      return color;
    }
    return default_colors.led;
  }

  /**
   * Add normal and nc (Not connected) colors to the color dictionary
   * if they are not declared.
   */
  handle_default_color(color: Dict<string>): Dict<string> {
    if(!('nc' in color)){
      color["nc"] = default_colors.led["nc"];
    }
    if(!('normal' in color)){
      color["normal"] = default_colors.led["normal"];
    }
    return color;
  }

  /**
   * Check if the time since the last PV update is greater than
   * the disconnect time parameter value.
   */
  check_disconnected(disc_time: number, pvInfo: EpicsData<number>, led_value: string): string {
    if(pvInfo.date != null){
      const update_time: number = pvInfo.date.getTime();
      const start_date: number = update_time - this.fist_update.getTime();
      let time_since_update: number = (new Date()).getTime() - update_time;
      if(start_date < 1000){
        time_since_update += disc_time;
      }

      if(time_since_update >= disc_time){
        led_value = "nc";
      }
    }else{
      led_value = "nc";
    }
    return led_value
  }

  /**
   * Register first update
   */
  register_first_update(): void {
    const date_0: Date = new Date(0);
    if(date_0.getTime() == this.fist_update.getTime()){
      this.fist_update = new Date();
    }
  }

  /**
   * Update led color with measured EPICS value
   */
  updateLed(): void {
    const { disc_time, pv_name, modifyValue } = this.props;
    let led_value: string = "nc";
    let pvData: Dict<EpicsData<number>> = this.epics.get_pv_data<number>();
    const pvInfo: EpicsData<number> = pvData[pv_name];
    this.register_first_update();

    if(pvInfo != undefined){
      const validValue: boolean = this.state!=null && pvInfo.value != null;
      if(validValue){
        led_value = this.epics.get_threshold(Number(pvInfo.value));
        if(modifyValue!=undefined){
          led_value = modifyValue<string>(
            led_value, pv_name);
        }
        if(disc_time){
          led_value = this.check_disconnected(
            disc_time, pvInfo, led_value)
        }
      }else{
        this.fist_update = new Date(0);
      }
    }else{
      this.fist_update = new Date(0);
    }

    if(this.hasMounted){
      this.setState({
        value: led_value
      });
    }
  }

  render(): React.ReactNode {
    const {shape, pv_name} = this.props;

    return(
      <SiriusTooltip text={pv_name}>
        <S.LedWrapper
          shape={led_shape[shape]}
          color={this.color_list[this.state.value]}
          data-testid="sirius-led"/>
      </SiriusTooltip>
    );
  }
}

export default SiriusLed;
