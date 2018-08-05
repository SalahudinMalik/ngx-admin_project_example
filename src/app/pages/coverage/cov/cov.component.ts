import { Component, ViewChild, OnInit } from "@angular/core";
import { DrawingManager } from "@ngui/map";
import { LatLng, LatLngLiteral, PolyMouseEvent } from "@agm/core";
import { PolygonOptions } from "../../../../../node_modules/@agm/core/services/google-maps-types";
import { UserService } from "../../../@core/data/appuser.service";
import { MapService } from "../../../@core/data/map.service";
import { ToastrService } from "../../../../../node_modules/ngx-toastr";
import { NgxPermissionsService } from "ngx-permissions";
import { TokenAuthService } from "../../../@core/data/token-auth.service";

@Component({
  selector: "ngx-cov",
  templateUrl: "./cov.component.html",
  styleUrls: ["./cov.component.scss"]
})
export class CovComponent implements OnInit {
  coordLength: boolean;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;
  public paths: Array<LatLngLiteral> = [];
  public coords: Array<LatLngLiteral> = [];
  dealerId: any;
  selectedOverlay: any;
  dealers: any;
  permission: any;
  polygonoptions: PolygonOptions = {
    fillColor: "#3d3780",
    fillOpacity: 0.5,
    strokeWeight: 3,
    editable: true,
    zIndex: 1
  };
  data: any;
  constructor(
    public userService: UserService,
    public mapService: MapService,
    private toasterService: ToastrService,
    private permissionService: NgxPermissionsService,
    private activeUser: TokenAuthService
  ) {}
  ngOnInit() {
    var permissions = this.permissionService.getPermissions();
    this.permissionService.permissions$.subscribe(permissions => {
      this.permission = permissions;
    });

    this.drawingManager["initialized$"].subscribe(dm => {
      google.maps.event.addListener(dm, "overlaycomplete", event => {
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          dm.setDrawingMode(null);
          this.selectedOverlay = event.overlay;
          const polygonBounds = event.overlay.getPath();
          this.coords = [];
          for (let a = 0; a < polygonBounds.length; a++) {
            const arrayObj = {
              lat: polygonBounds.getAt(a).lat(),
              lng: polygonBounds.getAt(a).lng()
            };
            this.coords.push(arrayObj);
            if (this.coords.length > 0) {
              this.coordLength = true;
            } else if (this.coords.length == 0) {
              this.coordLength = false;
            }
          }
          this.selectedOverlay.setEditable(true);
        }
      });
    });
    this.getDealers();
    if (this.permission.Admin) {
      this.findAllDealersMap();
    }
  }
  getDealers() {
    if (this.permission.Admin) {
      this.userService.getAllUser().subscribe((data: any) => {
        if (data) {
          this.dealers = data.users;
          this.dealerId = this.dealers.id;
        }
      });
    } else if (this.permission.Dealer) {
      this.dealers = this.activeUser.user.user;
      this.dealerId = this.activeUser.user.user.id;
      this.findOne(this.dealerId);
    }
  }
  createMapOfDealer() {
    const data = {
      dealer_id: this.dealerId,
      coordinates: this.coords
    };
    this.mapService.createMapOfDealer(data).subscribe(
      data => {
        // ..
      },
      err => {
        this.toasterService.error("Failed to Create Map ");
      },
      () => {
        this.toasterService.success("Created Map Successfully");
      }
    );
  }
  findAllDealersMap() {
    this.mapService.findAll().subscribe((data: any) => {
      this.data = JSON.parse(data._body);
      for (let item of this.data.dealerMap) {
        this.paths.push(item.coordinate);
      }
    });
  }
  public reset() {
    this.selectedOverlay.setMap(null);
    this.coords = [];
  }
  findOne(id) {
    this.mapService.findOne(id).subscribe(data => {
      this.paths = [];
      this.data = JSON.parse(data._body);
      for (let item of this.data) {
        this.paths.push(item.coordinate);
      }
    });
  }
}
