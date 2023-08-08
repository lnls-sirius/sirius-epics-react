import React from "react";
import EpicsBase from "../epics";
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
  private last_update: Date | null;

  constructor(props: LedPv) {
    super(props);
    this.updateLed = this.updateLed.bind(this);

    this.state = {
      value: 'nc'
    };
    this.last_update = new Date();
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
   * Update led color with measured EPICS value
   */
  updateLed(): void {
    const { disc_time, pv_name, modifyValue } = this.props;
    let led_value: string = "nc";
    let pvData: Dict<EpicsData<number>> = this.epics.get_pv_data<number>();
    const pvInfo: EpicsData<number> = pvData[pv_name];
    if(pvInfo != undefined){
      const validValue: boolean = this.state!=null && pvInfo.value != null;
      if(validValue){
        led_value = this.epics.get_threshold(Number(pvInfo.value));
        this.last_update = pvInfo.date;
        if(modifyValue!=undefined){
          led_value = modifyValue<string>(
            led_value, pv_name);
        }
        if(disc_time){
          if(pvInfo.date != null && this.last_update != null){
            let time_since_update: number = this.last_update.getTime() - pvInfo.date.getTime();
            if(time_since_update >= disc_time){
              led_value = "nc";
            }
          }
        }
      };
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
