import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  constructor() { }
  public customerDetails = [
    {
      month: "1",
      packages: [
        {
                 
          name: "Create Customer",
        
        },
        
      ]
    },
    {
      month: "2",
      packages: [
        {
          name: "Create Invoice and make payment",
        },
    
      ]
    },
    {
      month: "3",
      packages: [
        {
          name: "Create Connection",
        },
    
      ]
    },
    {
      month: "4",
      packages: [
        {
          name: "Document Verification",
        },
    
      ]
    },
    {
      month: "5",
      packages: [
        {
          name: "Connection Verification",
        },
    
      ]
    }
  ];

  ngOnInit() {
  }

}
