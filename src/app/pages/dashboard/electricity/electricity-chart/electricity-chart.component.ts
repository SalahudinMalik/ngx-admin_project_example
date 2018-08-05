import { delay } from "rxjs/operators";
import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { DashboardService } from "../../../../@core/data/dashboard.service";

declare const echarts: any;

@Component({
  selector: "ngx-electricity-chart",
  styleUrls: ["./electricity-chart.component.scss"],
  template: `
    <div echarts [options]="option" class="echart"></div>
  `
})
export class ElectricityChartComponent implements AfterViewInit, OnDestroy {
  option: any;
  data: Array<any>;
  themeSubscription: any;

  constructor(private theme: NbThemeService, private dash: DashboardService) {
    // const points = [];
    // let pointsCount = 100;
    // let min = -3;
    // let max = 3;
    // let xStep = (max - min) / pointsCount;
    //
    // for(let x = -3; x <= 3; x += xStep) {
    //   let res = x**3 - 5*x + 17;
    //   points.push(Math.round(res * 25));
    // }
    // points.push(p);
  }

  ngAfterViewInit(): void {
    const points = [];
    var month = new Date().getMonth();

    this.dash.getTotalMonth(month).subscribe(r => {
      for (let a of r) {
        points.push(a);
      }

      if (points.length == 31 || points.length == 30) {
        this.data = points.map((p, n) => ({
          label: n % 5 === 0 ? `${Math.round(n)}` : "",
          value: p
        }));
        this.themeSubscription = this.theme
          .getJsTheme()
          .pipe(delay(1))
          .subscribe(config => {
            const eTheme: any = config.variables.electricity;

            this.option = {
              grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 80
              },
              tooltip: {
                trigger: "axis",
                axisPointer: {
                  type: "line",
                  lineStyle: {
                    color: eTheme.tooltipLineColor,
                    width: eTheme.tooltipLineWidth
                  }
                },
                textStyle: {
                  color: eTheme.tooltipTextColor,
                  fontSize: 20,
                  fontWeight: eTheme.tooltipFontWeight
                },
                position: "top",
                backgroundColor: eTheme.tooltipBg,
                borderColor: eTheme.tooltipBorderColor,
                borderWidth: 3,
                formatter: "{c0}",
                extraCssText: eTheme.tooltipExtraCss
              },
              xAxis: {
                type: "category",
                boundaryGap: false,
                offset: 25,
                data: this.data.map(i => i.label),
                axisTick: {
                  show: false
                },
                axisLabel: {
                  color: eTheme.xAxisTextColor,
                  fontSize: 18
                },
                axisLine: {
                  lineStyle: {
                    color: eTheme.axisLineColor,
                    width: "2"
                  }
                }
              },
              yAxis: {
                boundaryGap: [0, "5%"],
                axisLine: {
                  show: false
                },
                axisLabel: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: eTheme.yAxisSplitLine,
                    width: "1"
                  }
                }
              },
              series: [
                {
                  type: "line",
                  smooth: true,
                  symbolSize: 20,
                  itemStyle: {
                    normal: {
                      opacity: 0
                    },
                    emphasis: {
                      color: "#ffffff",
                      borderColor: eTheme.itemBorderColor,
                      borderWidth: 2,
                      opacity: 1
                    }
                  },
                  lineStyle: {
                    normal: {
                      width: eTheme.lineWidth,
                      type: eTheme.lineStyle,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: eTheme.lineGradFrom
                        },
                        {
                          offset: 1,
                          color: eTheme.lineGradTo
                        }
                      ]),
                      shadowColor: eTheme.lineShadow,
                      shadowBlur: 6,
                      shadowOffsetY: 12
                    }
                  },
                  areaStyle: {
                    normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: eTheme.areaGradFrom
                        },
                        {
                          offset: 1,
                          color: eTheme.areaGradTo
                        }
                      ])
                    }
                  },
                  data: this.data.map(i => i.value)
                },

                {
                  type: "line",
                  smooth: true,
                  symbol: "none",
                  lineStyle: {
                    normal: {
                      width: eTheme.lineWidth,
                      type: eTheme.lineStyle,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: eTheme.lineGradFrom
                        },
                        {
                          offset: 1,
                          color: eTheme.lineGradTo
                        }
                      ]),
                      shadowColor: eTheme.shadowLineDarkBg,
                      shadowBlur: 14,
                      opacity: 1
                    }
                  },
                  data: this.data.map(i => i.value)
                }
              ]
            };
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.data) {
      this.themeSubscription.unsubscribe();
    }
  }
}
