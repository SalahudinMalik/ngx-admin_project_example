import { Component, ViewChild, OnInit, AfterContentInit } from "@angular/core";
import "ag-grid-enterprise";
import { NgbModal } from "../../../../../node_modules/@ng-bootstrap/ng-bootstrap";
import { InputComponent } from "./input.component";
import { Router } from "../../../../../node_modules/@angular/router";
import { GenericStockService } from "../../../@core/data/generic-stock.service";
import { LicenseManager } from "ag-grid-enterprise/main";
declare global {
  interface Window { windows: any; }
}
@Component({
  selector: "ngx-chart-of-accounts",
  templateUrl: './chart-of-accounts.component.html',
  styleUrls: ['./chart-of-accounts.component.scss']
})
export class ChartOfAccountsComponent implements OnInit {
  public gridApi;
  public gridColumnApi;
  public rowData: any[];
  public columnDefs = [
    {
      field: "account_id",
      headerName: "Account ID",
    },
    {
      field: "balance",
      headerName: "Balance",
    },
  ];
  public components;
  public groupDefaultExpanded;
  public getDataPath;
  public getRowNodeId;
  public autoGroupColumnDef;
  public parentSelected: boolean;
  public parent_id: number;
  public root_type:number;
  constructor(public modalService: NgbModal, public router: Router, public genericService: GenericStockService) {
    this.setLicenceKey();
    this.components = { fileCellRenderer: getFileCellRenderer() };
    this.groupDefaultExpanded = -1;
    this.getDataPath = function (data) {
      return data.hierarchy;
    };
    this.getRowNodeId = function (data) {
      return data.id;
    };
    this.autoGroupColumnDef = {
      field: name,
      headerName: "Name",
      width: 450,
      cellRendererParams: {
        checkbox: true,
        suppressCount: true,
        innerRenderer: "fileCellRenderer"
      }
    };
  }
  onSelectionChanged(event) {
    var selectedNode = this.gridApi.getSelectedNodes()[0];
    this.parent_id = selectedNode.data.account_id;
    this.root_type = selectedNode.data.root_type;
    if (selectedNode) {
      this.parentSelected = true;
    } else {
      this.parentSelected = false;
    }
  }
  setLicenceKey() {
    LicenseManager.setLicenseKey("5d41402abc4b2a76b9719d911017c5921");
  }
  addNewGroup() {
    let hierarchy: any = "";
    const activeModal = this.modalService.open(InputComponent, {
      size: "sm",
      container: "nb-layout"
    });
    activeModal.componentInstance.modalHeader = "Add  Account";
    activeModal.componentInstance.parent_id = this.parent_id;
    activeModal.componentInstance.root_type = this.root_type;
    activeModal.result.then(
      () => {
        this.getChartOfAccounts();
      },
      () => {
      }
    );
  }
  viewLedger() {
    var selectedNode = this.gridApi.getSelectedNodes()[0];
    this.router.navigate(["/pages/accounts/general-ledger", selectedNode.data.account_id]);
  }
  removeSelected() {
    var selectedNode = this.gridApi.getSelectedNodes()[0];
    if (!selectedNode) {
      console.warn("No nodes selected!");
      return;
    }
    this.gridApi.updateRowData({ remove: getRowsToRemove(selectedNode) });
  }
  moveSelectedNodeToTarget(targetRowId) {
    var selectedNode = this.gridApi.getSelectedNodes()[0];
    if (!selectedNode) {
      console.warn("No nodes selected!");
      return;
    }
    var targetNode = this.gridApi.getRowNode(targetRowId);
    var invalidMove = selectedNode.key === targetNode.key || isSelectionParentOfTarget(selectedNode, targetNode);
    if (invalidMove) {
      console.warn("Invalid selection - must not be parent or same as target!");
      return;
    }
    var rowsToUpdate = getRowsToUpdate(selectedNode, targetNode.data.hierarchy);
    this.gridApi.updateRowData({ update: rowsToUpdate });
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
  ngOnInit() {
    this.getChartOfAccounts();
  }
  public getChartOfAccounts() {
    this.genericService.find('/account/chartOfAccount').subscribe((data: any) => {
      this.rowData = data;
    }, err => {
    });
  }
}
function getNextId() {
  if (!window['nextId']) {
    window['nextId'] = 13;
  } else {
    window['nextId']++;
  }
  return window['nextId'];
}
function getFileCellRenderer() {
  function FileCellRenderer() { }
  FileCellRenderer.prototype.init = function (params) {
    var tempDiv = document.createElement("div");
    var value = params.value;
    var icon = getFileIcon(params.value);
    tempDiv.innerHTML = icon
      ? '<span><i class="' + icon + '"></i>' + '<span class="filename"></span>' + value + "</span>"
      : value;
    this.eGui = tempDiv.firstChild;
  };
  FileCellRenderer.prototype.getGui = function () {
    return this.eGui;
  };
  return FileCellRenderer;
}
function getRowsToRemove(node) {
  var res = [];
  for (var i = 0; i < node.childrenAfterGroup.length; i++) {
    res = res.concat(getRowsToRemove(node.childrenAfterGroup[i]));
  }
  return node.data ? res.concat([node.data]) : res;
}
function isSelectionParentOfTarget(selectedNode, targetNode) {
  var children = selectedNode.childrenAfterGroup;
  for (var i = 0; i < children.length; i++) {
    if (targetNode && children[i].key === targetNode.key) return true;
    isSelectionParentOfTarget(children[i], targetNode);
  }
  return false;
}
function getRowsToUpdate(node, parentPath) {
  var res = [];
  var newPath = parentPath.concat([node.key]);
  if (node.data) {
    node.data.hierarchy = newPath;
  }
  for (var i = 0; i < node.childrenAfterGroup.length; i++) {
    var updatedChildRowData = getRowsToUpdate(node.childrenAfterGroup[i], newPath);
    res = res.concat(updatedChildRowData);
  }
  return node.data ? res.concat([node.data]) : res;
}
function getFileIcon(filename) {
  return filename.endsWith(".mp3") || filename.endsWith(".wav")
    ? "fa fa-file-audio-o"
    : filename.endsWith(".xls")
      ? "fa fa-file-excel-o"
      : filename.endsWith(".txt")
        ? "fa fa fa-file-o"
        : filename.endsWith(".pdf")
          ? "fa fa-file-pdf-o"
          : "fa fa-folder";
}