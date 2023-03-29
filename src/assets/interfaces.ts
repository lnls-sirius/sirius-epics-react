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
    extends PvInterface {
        data: Chart.ChartData,
        alarm?: number,
        alert?: number,
        color_axis: string[],
        configOptions: (options: Chart.ChartOptions, pv_name: string|string[]) => any,
}

interface PvInterface {
    pv_name: string | string[],
    egu?: string,
    updateInterval?: number,
    threshold?: Dict<number>,
    modifyValue?: (value: any, pvname?: string) => any;
}

interface EpicsData {
    date: null|Date,
    value: null|number|string,
    datatype: null|string,
    count: null|number
}

interface LabelPv
    extends PvInterface, State<string> {
}

interface LedStatus
    extends State<number> {
        shape: string
}

interface LedPv
    extends PvInterface {
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
