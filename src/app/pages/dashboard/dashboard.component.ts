import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators/takeWhile";
import { ConnectionsService } from "../../@core/data/connections.service";
import { UserService } from "../../@core/data/appuser.service";
import { DashboardService } from "../../@core/data/dashboard.service";
import { PermissionsService } from "../../@core/data/permission.service";

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnDestroy {
  dealerCustomers: any;
  users: any = [];
  data: any;
  total: any;
  expiringToday: any = [];
  expiringInThree: any = [];

  private alive = true;

  lightCard: CardSettings = {
    title: "Light",
    iconClass: "nb-lightbulb",
    type: "primary"
  };
  rollerShadesCard: CardSettings = {
    title: "Roller Shades",
    iconClass: "nb-roller-shades",
    type: "success"
  };
  wirelessAudioCard: CardSettings = {
    title: "Wireless Audio",
    iconClass: "nb-audio",
    type: "info"
  };
  coffeeMakerCard: CardSettings = {
    title: "Coffee Maker",
    iconClass: "nb-coffee-maker",
    type: "warning"
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: "warning"
      },
      {
        ...this.rollerShadesCard,
        type: "primary"
      },
      {
        ...this.wirelessAudioCard,
        type: "danger"
      },
      {
        ...this.coffeeMakerCard,
        type: "secondary"
      }
    ]
  };

  constructor(
    private themeService: NbThemeService,
    private connectionService: ConnectionsService,
    private userService: UserService,
    private dash: DashboardService,
    private role: PermissionsService
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnInit() {
    if (this.role.role.Admin) {
      this.userService.getAllUser().subscribe((data1: any) => {
        this.users = data1.users;
      });
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
