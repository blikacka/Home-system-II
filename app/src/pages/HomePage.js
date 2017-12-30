import React, {Component} from 'react'
import {Chart} from 'react-google-charts'
import moment from 'moment'

export default class HomePage extends Component {

    /** How often reload graphs? */
    static TIME_LIMIT = 30

    constructor(props) {
        super(props);
        this.state = {
            charts: [],
            timeLimit: HomePage.TIME_LIMIT,
            dateFrom: moment().subtract('1', 'days').format('YYYY-MM-DD HH:mm')
        };
    }

    /**
     * Normalize chart data to array
     *
     * @param chartData
     * @returns {Array}
     */
    chartArray = (chartData) => {
        let data = []

        Object.values(chartData).map((chart) => {
            if (!data[chart.sensor_id]) {
                data[chart.sensor_id] = []
                data[chart.sensor_id]['name'] = {
                    name: chart.name,
                    description: chart.description,
                }
                data[chart.sensor_id]['data'] = []
                data[chart.sensor_id]['last'] = []
            }
            data[chart.sensor_id]['data'].push([
                    new Date(chart.created),
                    parseFloat(chart.temperature)
                ]
            )

            data[chart.sensor_id]['last'] = {
                temperature: chart.temperature,
                date: chart.created
            }
        })

        return data

    }

    /**
     * Define chart data for chart render
     *
     * @param chartElement
     * @returns {{options: {title: string, hAxis: {title: string, format: string, slantedText: boolean, slantedTextAngle: number, gridlines: {count: number}}, vAxis: {title: string}, legend: string}, rows, columns: [null,null], last}}
     */
    chartData = (chartElement) => {
        return {
            options: {
                title:
                chartElement.name.name + ' - ' + chartElement.name.description + '\n' +
                'Poslední hodnota: ' + chartElement.last.temperature + ' °C ( ' + moment(chartElement.last.date).format('D.M.YYYY HH:mm') + ')',
                hAxis: {
                    title: 'Čas',
                    format: 'hh:mm d.M.yyyy',
                    slantedText: true,
                    slantedTextAngle: 45,
                    gridlines: {
                        count: 40
                    }
                },
                vAxis: {title: 'Teplota'},
                legend: 'none'
            },
            rows: chartElement.data,
            columns: [
                {
                    type: 'datetime',
                    label: 'Čas',
                },
                {
                    type: 'number',
                    label: 'Teplota',
                },
            ],
            last: chartElement.last
        }
    }

    /**
     * Load charts data
     */
    loadCharts = () => {
        window.axios.get(`${window.api}/temperature?dateFrom=${this.state.dateFrom}`)
            .then((data) => {
                let dataArray = this.chartArray(data.data.data)
                let result = dataArray.map(dataElement => {
                    return this.chartData(dataElement)
                })

                this.setState({ charts: result, timeLimit: HomePage.TIME_LIMIT })
            })
    }

    /**
     * After load...
     */
    componentDidMount = () => {
        this.loadCharts()

        setInterval(() => {
            if (this.state.timeLimit === 0) {
                this.loadCharts()
            } else {
                this.setState({ timeLimit: this.state.timeLimit - 1 })
            }
        }, 1000)
    }

    /**
     * Render
     *
     * @returns {XML}
     */
    render() {
        return (
            <div className="charts-page">
                Čas do obnovení: {this.state.timeLimit}
                {this.state.charts.map((chart, index) => (
                    <div key={index}>
                        <Chart
                            chartType="LineChart"
                            rows={chart.rows}
                            columns={chart.columns}
                            options={chart.options}
                            graph_id={`chart-${index}`}
                            width={'100%'}
                            height={'400px'}
                            legend_toggle
                        />
                    </div>
                ))}
            </div>

        );
    }
}
