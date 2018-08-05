import { delay } from "rxjs/operators";
import { OnInit, Component, Input, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { DashboardService } from "../../../@core/data/dashboard.service";

declare const echarts: any;

@Component({
  selector: "ngx-solar",
  styleUrls: ["./solar.component.scss"],
  template: `
    <nb-card size="xsmall" class="solar-card">
      <nb-card-header *ngIf="!dealer">Expiring in {{chartValue}} days</nb-card-header>
      <nb-card-header *ngIf="dealer">{{dealerName}}</nb-card-header>
      <nb-card-body>
        <div *ngIf="!dealer" echarts [options]="option" class="echart">
        </div>
        <div [ngClass]="{'textAlign':dealer}" class="info">
          <div class="value">{{expiring}}</div>
          <div class="details"><span>out of</span> {{value}}</div>
        </div>
      </nb-card-body>
    </nb-card>
  `
})
export class SolarComponent implements OnInit, OnDestroy {
  dealerName: any;
  dealerCustomers: any;
  dealer: boolean = false;
  public value = 0;
  public total = 0;
  public expiring = 0;

  @Input() chartValue: any;

  option: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService, private dash: DashboardService) {}

  ngOnInit() {
    this.themeSubscription = this.theme
      .getJsTheme()
      .pipe(delay(1))
      .subscribe(config => {
        const solarTheme: any = config.variables.solar;

        this.option = Object.assign(
          {},
          {
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
              {
                name: " ",
                clockWise: true,
                hoverAnimation: false,
                type: "pie",
                center: ["45%", "50%"],
                radius: solarTheme.radius,
                data: [
                  {
                    value: this.value,
                    name: " ",
                    label: {
                      normal: {
                        position: "center",
                        formatter: "{d}%",
                        textStyle: {
                          fontSize: "22",
                          fontFamily: config.variables.fontSecondary,
                          fontWeight: "600",
                          color: config.variables.fgHeading
                        }
                      }
                    },
                    tooltip: {
                      show: false
                    },
                    itemStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: solarTheme.gradientLeft
                          },
                          {
                            offset: 1,
                            color: solarTheme.gradientRight
                          }
                        ]),
                        shadowColor: solarTheme.shadowColor,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 3
                      }
                    },
                    hoverAnimation: false
                  },
                  {
                    value: 100 - this.value,
                    name: " ",
                    tooltip: {
                      show: false
                    },
                    label: {
                      normal: {
                        position: "inner"
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: config.variables.layoutBg
                      }
                    }
                  }
                ]
              },
              {
                name: " ",
                clockWise: true,
                hoverAnimation: false,
                type: "pie",
                center: ["45%", "50%"],
                radius: solarTheme.radius,
                data: [
                  {
                    value: this.value,
                    name: " ",
                    label: {
                      normal: {
                        position: "inner",
                        show: false
                      }
                    },
                    tooltip: {
                      show: false
                    },
                    itemStyle: {
                      normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                          {
                            offset: 0,
                            color: solarTheme.gradientLeft
                          },
                          {
                            offset: 1,
                            color: solarTheme.gradientRight
                          }
                        ]),
                        shadowColor: solarTheme.shadowColor,
                        shadowBlur: 7
                      }
                    },
                    hoverAnimation: false
                  },
                  {
                    value: 28,
                    name: " ",
                    tooltip: {
                      show: false
                    },
                    label: {
                      normal: {
                        position: "inner"
                      }
                    },
                    itemStyle: {
                      normal: {
                        color: "none"
                      }
                    }
                  }
                ]
              }
            ]
          }
        );
      });

    this.dash.getTotalCustomers().subscribe(r => {
      this.value = r.count;
    });

    if (this.chartValue.first_name) {
      this.dealer = true;
      this.dash.getDealerCustomers().subscribe(r => {
        this.dealerCustomers = r;
        const index = this.dealerCustomers.findIndex(
          total => total.id == this.chartValue.id
        );
        if (index >= 0) {
          this.expiring = this.dealerCustomers[index].customers;
        }
      });

      this.dealerName = this.chartValue.first_name;
    } else if (!this.chartValue.first_name) {
      this.dash.getPercentageExpiring(this.chartValue).subscribe(r => {
        if (this.option.series) {
          this.option.series[0].data[0].value = r.percentage;
          this.option.series[0].data[1].value = 100 - r.percentage;
          this.option.series[1].data[0].value = r.percentage;
        }
      });

      this.dealer = false;

      this.dash.getTotalExpiring(this.chartValue).subscribe(r => {
        this.expiring = r.count;
      });
    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
