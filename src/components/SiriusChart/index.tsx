import { Component, createRef } from "react";
import Chart  from 'chart.js/auto';
import EpicsBase from "../epics";
import { default_colors } from "../../assets/themes";
import { Dict, ChartPv, EpicsData, RefChart } from "../../assets/interfaces";
import * as S from './styled';

/**
 * EPICS Chart that displays a list of PVs.
*/
class SiriusChart extends Component<ChartPv>{
  private chartRef: RefChart;
  private color_list: Dict<string>;
  private epics: EpicsBase<string[]>;
  public chart: null|Chart;

  constructor(props: ChartPv){
    super(props);
    this.updateChart = this.updateChart.bind(this);

    this.chartRef = createRef();
    this.color_list = this.initialize_bar_style(props.color);
    this.epics = this.initialize_epics_base(props);
    this.chart = null;
  }

  /**
   * Create a new Chart when the component is mounted.
   */
  componentDidMount(): void {
    if(this.chartRef.current != null){
      this.chart = this.createChart(
        this.chartRef.current);
      this.updateChart();
    }else{
      console.log("Error!")
    }
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

  initialize_epics_base(props: ChartPv): EpicsBase<string[]> {
    const { pv_name, threshold, update_interval } = props;

    this.epics = new EpicsBase(pv_name);
    this.epics.initialize(pv_name, threshold, update_interval);
    this.epics.start_timer(this.updateChart);

    return this.epics;
  }

  initialize_bar_style(color: Dict<string>): Dict<string> {
    if(color !== undefined) {
      color = this.handle_default_color(color);
      return color;
    }
    return default_colors.chart;
  }

  handle_default_color(color: Dict<string>): Dict<string> {
    if(!('nc' in color)){
      color["nc"] = default_colors.chart["nc"];
    }
    if(!('normal' in color)){
      color["normal"] = default_colors.chart["normal"];
    }
    return color;
  }

  /**
   * Set new datasets and labels to the EPICS Chart.
   * @param newData - List of Datasets to be shown in the chart.
   * @param labels - List of labels to be shown in the chart.
   */
  updateDataset(newData: any[], labels: string[]): void {
    if(this.chart){
      this.chart.data.labels = labels;
      this.chart.data.datasets = newData;
      this.chart.update();
    }
  }

  /**
   * Remove redundant PV information from the PV name
   *
   * @param pv_name - PV name
   * @param value - Position of the relevant information split with ':'
   * @returns simplified PV name
   */
  simplifyLabel(pv_name: string, value?: number): string {
    if(value == undefined){
        value = 1;
    }
    const name_split: string[] = pv_name.split(":")
    return name_split[value]
  }

  /**
  * Capitalize string
  *
  * @param str - normal string
  * @returns capitalized string
  */
  capitalize(str: string): string {
    return str[0].toUpperCase()+str.slice(1)
  }

  /**
   * Update the EPICS chart with more recent data received from the PVs.
   */
  async updateChart(): Promise<void> {
    if(this.chart != null){
      const [datasetList, labelList]: [
        Chart.ChartDataSets[], string[]] = await this.buildChart();
      let dataset: Chart.ChartDataSets[] = datasetList;
      dataset = this.limitAxis(datasetList);
      this.updateDataset(dataset, labelList);
    }
  }

  /**
   * Add limit axis lines to the chart.
   * @param datasetList - Dataset to be added to the chart.
   * @returns datasetList with limit axis lines.
   */
  limitAxis(datasetList: Chart.ChartDataSets[]): Chart.ChartDataSets[] {
    const { threshold } = this.props;
    if(threshold){
      Object.entries(threshold).map(([label, value]: [string, number]) => {
        const color: string = this.color_list[label];
        if(datasetList[0].data){
          const datasetTemp: Chart.ChartDataSets = {
            data: (datasetList[0].data.map(()=>{return value})),
            type: 'line',
            yAxisID: 'y',
            label: this.capitalize(label),
            borderColor: color,
            backgroundColor: color
          }
          datasetList.push(datasetTemp);
        }
      })
    }
    return datasetList
  }

  /**
   * Build a dataset with the data read from EPICS.
   * @returns [
   *  Chart Datasets List, Chart Labels list
   * ]
   */
  async buildChart(): Promise<[Chart.ChartDataSets[], string[]]> {
    let datasetList: number[] = [];
    let labelList: string[] = [];
    let colorList: string[] = [];
    const pvData: any = this.epics.get_pv_data();
    Object.entries(pvData).map(async ([pv_name, data]: [string, EpicsData<number>], idx_data: number)=>{
      const pvname: string = this.simplifyLabel(pv_name);
      const threshold_type = this.epics.get_threshold(data.value);
      if(typeof(data.value) == "number"){
        datasetList[idx_data] = data.value;
        labelList[idx_data] = pvname;
        colorList[idx_data] = this.color_list[threshold_type];
      }
    })
    let dataset: Chart.ChartDataSets[] = [{
      data: datasetList,
      backgroundColor: colorList,
      borderColor: colorList
    }]

    return [dataset, labelList];
  }

  /**
   * Create a Chart Object.
   * @param reference - HTML canvas element.
   * @returns new Chart object
   */
  createChart(reference: HTMLCanvasElement): Chart {
    const scalesOpt: Dict<any> = {
      x: {
        display: true,
        type: 'category',
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 15
          }
        }
      },
      y: {
        display: true,
        ticks: {
          font: {
            size: 15
          }
        },
        beginAtZero: true
      }
    }

    const chartOptions: Chart.ChartOptions = {
      animation: {
        duration: 0
      },
      spanGaps: true,
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point: {
          radius: 0
        }
      },
      hover: {
          mode: "nearest",
          intersect: true
      },
      scales: scalesOpt,
      plugins:{
        legend: {
            display: false
        }
      }
    }

    const config: any = {
      type: "bar",
      options: chartOptions
    }

    if(this.props.configOptions != undefined){
      config.options = this.props.configOptions(
        config.options, this.props.pv_name);
    }

    return new Chart(
      reference,
      config
    );
  }

  render() {
    return (
      <S.ChartWrapper>
        <S.Chart
          id="canva"
          ref={this.chartRef}/>
      </S.ChartWrapper>
    )
  }
}

export default SiriusChart;
