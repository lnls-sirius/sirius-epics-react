type RefChart = React.RefObject<HTMLCanvasElement>

interface State<T> {
    value: T
}

interface Dict<T> {
    [key: string]: T
}

interface PvTooltipInterface{
    text: string,
    children: React.ReactNode
}

interface PvListInterface {
    pv_list: Array<string>
}

interface EpicsChartInterface
    extends PvInterface<string[]> {
        data: Chart.ChartData,
        alarm?: number,
        alert?: number,
        color_axis: string[],
        configOptions: (options: Chart.ChartOptions, pv_name: string|string[]) => any,
}

interface PvInterface<T>{
    pv_name: T,
    egu?: string,
    update_interval?: number,
    threshold?: Dict<number>,
    modifyValue?: <M>(value: M, pvname?: string) => M;
}

interface EpicsData<T> {
    date: null|Date,
    value: null|T,
    datatype: null|string,
    count: null|number
}

interface LabelPv
    extends PvInterface<string>, State<string> {
}

interface LedStatus
    extends State<number> {
        shape: string
}

interface LedPv
    extends PvInterface<string> {
        shape: string
}

export type {
    PvListInterface,
    EpicsChartInterface,
    PvInterface,
    EpicsData,
    PvTooltipInterface,
    LabelPv,
    LedStatus,
    LedPv,
    State,
    Dict,
    RefChart
}
