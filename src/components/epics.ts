import Epics from "../access_data/Epics";
import { Dict, EpicsData } from "../assets/interfaces";


/**
 * Class that return the state of the PV based on
 * its value and the thresholds established.
 */
class Thresholds {
    private thr_dict: Dict<number>;
    private thr_arr: [string, number][];

    constructor(){
        this.thr_dict = {};
        this.thr_arr = [];
    }

    set_thresholds(threshold: Dict<number>): void {
        this.thr_dict = threshold;
        this.thr_arr = this.sort_dict(this.thr_dict);
    }

    dict2array(dictionary: Dict<number>): [string, number][] {
        return Object.entries(dictionary).map(([key, value]: [string, number])=>{
            return [key, value];
        });
    }

    /**
     * Sort threshold dictionary in crescent order
     */
    sort_dict(dictionary: Dict<number>): [string, number][] {
        let thr_arr: [string, number][] = this.dict2array(dictionary);
        thr_arr.sort(function(first, second){
            return second[1] - first[1];
        });
        return thr_arr;
    }

    /**
     * Get the last exeeded threshold key.
     */
    get_final_state(value: number, threshold: [string, number][]): string {
        for(let a = 0; a < threshold.length; a++) {
            if(value >= threshold[a][1]){
                return threshold[a][0];
            }
        }
        return 'normal';
    }

    /**
     * Get threshold state.
     */
    get_biggest_threshold(value: number): string {
        let final_state: string = 'normal';
        if( this.thr_dict !== undefined ){
            final_state = this.get_final_state(value, this.thr_arr);
        }
        return final_state
    }
}


/**
 * Create an static Epics connection that allows
 * widget to subscribe or unsubscribe to the monitoring.
 */
class EpicsCon {
    private static epics: Epics = new Epics([]);
    private static pv_name: string[] = [];

    static convert2list<T extends string|string[]>(new_pv: T): string[]{
        if(Array.isArray(new_pv)){
            return new_pv;
        }
        return [new_pv];
    }

    /**
     * Returns a list with the PVs that are not already subscribed.
     */
    static new_pvs_list(pv_list: string[]): string[]{
        let pvs2add: string[] = [];
        pv_list.map((pvname: string) => {
            if(!(pvname in this.pv_name)){
                pvs2add.push(pvname);
            }
        })
        return pvs2add;
    }

    /**
     * Create a new connection using the Epics Object.
     */
    static create_epics(){
        this.epics.disconnect();
        return new Epics(this.pv_name);
    }

    /**
     * Subscribe new list of PVs.
     */
    static add_new_pv<T extends string|string[]>(new_pv: T){
        let list2add: string[] = [];
        let new_pv_list: string[] = this.convert2list<T>(new_pv);
        list2add = this.new_pvs_list(new_pv_list);
        this.pv_name = this.pv_name.concat(list2add);
        this.epics = this.create_epics();
    }

    /**
     * Unsubscribe new list of PVs.
     */
    static remove_pv<T extends string|string[]>(rem_pv: T){
        let pv_list: string[] = this.pv_name;
        const rem_pv_list: string[] = this.convert2list<T>(rem_pv);
        rem_pv_list.map((pvname: string) => {
            if(pvname in this.pv_name){
                delete pv_list[pvname];
            }
        })
        this.pv_name = pv_list;
    }

    /**
     * Get a list of the current values of all subscribed PVs.
     */
    static get_pv_data<M>(): Dict<EpicsData<M>> {
        let pvData: Dict<EpicsData<M>> = this.epics.pvData;
        return pvData;
    }
}


/**
 * Create a basic Epics object that updates its values in
 * fixed time intervals.
 */
class EpicsBase<T extends string|string[]> {
    private update_interval: number;
    private timer: any;
    private pv_name: T;
    private thresholds: Thresholds;

    constructor(pvname: T){
        this.update_interval = 100;
        this.pv_name = pvname;
        this.subscribe2epics_con();
        this.timer = null;
        this.thresholds = new Thresholds();
    }

    initialize(pv_name: T, threshold: undefined|Dict<number>, update_interval: undefined|number): void {
        this.set_pvname(pv_name);
        this.subscribe2epics_con();

        if(threshold !== undefined) {
            this.thresholds.set_thresholds(threshold);
        }
        if(update_interval !=undefined){
            this.set_update_interval(update_interval);
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
        this.pv_name = pvname;
    }

    set_update_interval(milliseconds: number): void {
        this.update_interval = milliseconds;
    }

    subscribe2epics_con(){
        EpicsCon.add_new_pv<T>(this.pv_name);
    }

    unsubscribe2epics_con(){
        EpicsCon.remove_pv<T>(this.pv_name);
    }

    destroy(): void {
        if(this.timer!=null){
            clearInterval(this.timer);
            this.unsubscribe2epics_con();
        }
    }
}

export default EpicsBase;
