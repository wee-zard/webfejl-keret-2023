import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.component.html',
  styleUrls: ['./successful.component.sass']
})
export class SuccessfulComponent implements OnInit, OnDestroy{

  emailAddress: string = '';
  loadingSubscription?: Subscription;

  constructor(private actRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.loadingSubscription = this.actRoute.params.subscribe((param: any) =>{
      this.emailAddress = param.emailAddress as string;
      console.log(this.emailAddress === null);
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }
}
