import { Dict, EpicsData } from "../assets/interfaces";
import Thresholds from "./threshold";
import EpicsCon from "./epics_con";

/**
 * Create a basic Epics object that updates its values in
 * fixed time intervals.
 */
class EpicsBase<T extends string|string[]> {
    public update_interval: number;
    public thresholds: Thresholds;
    public pv_name: T;
    private timer: any;

    constructor(pvname: T){
        this.update_interval = 300;
        this.pv_name = pvname;
        this._subscribe2epics_con();
        this.timer = null;
        this.thresholds = new Thresholds();
    }

    initialize(pv_name: T, threshold: undefined|Dict<number>, update_interval: undefined|number): void {
        this.set_pvname(pv_name);
        this._subscribe2epics_con();

        if(threshold !== undefined) {
            this.thresholds.set_thresholds(threshold);
        }
        if(update_interval !=undefined){
            this._set_update_interval(update_interval);
        }
    }

    start_timer(fun: ()=>void): void {
        this.timer = setInterval(
            fun, this.update_interval);
    }

    get_pv_data<M>(): Dict<EpicsData<M>> {
        let pvData: Dict<EpicsData<M>> = EpicsCon.get_pv_data();
        return pvData;
    }

    get_threshold(value: number): string {
        return this.thresholds.get_biggest_threshold(value);
    }

    set_pvname(pvname: T): void {
        if(this._equal_check(pvname)){
            this.pv_name = pvname;
            this._subscribe2epics_con();
        }
    }

    destroy(): void {
        if(this.timer!=null){
            clearInterval(this.timer);
            this._unsubscribe2epics_con();
        }
    }

    _equal_check(pvname: T): boolean {
        return JSON.stringify(this.pv_name) != JSON.stringify(pvname);
    }

    _set_update_interval(milliseconds: number): void {
        this.update_interval = milliseconds;
    }

    _subscribe2epics_con(){
        EpicsCon.add_new_pv<T>(this.pv_name);
    }

    _unsubscribe2epics_con(){
        EpicsCon.remove_pv<T>(this.pv_name);
    }
}

export default EpicsBase;
