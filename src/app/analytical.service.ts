import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalyticalService {
  analyticalData = [];
  // Dummy datas
  residueDetails = [
    {id: 1, name: 'API'},
    {id: 2, name: 'Cleaning Agent'}
  ];
  MOCDetails = [
    {id: 1, name: 'Stainless Steel'},
    {id: 2, name: 'Glass'},
    {id: 3, name: 'Teflon'},
    {id: 4, name: 'Plastic'}
  ];

  constructor() { }
}
