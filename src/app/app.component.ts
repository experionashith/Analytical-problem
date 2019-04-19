import { Component, OnInit } from '@angular/core';
import { AnalyticalService } from './analytical.service';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'analytical-project';
  public analyticalForm: FormGroup;
  initialFormState: any;
  isShowLODetails = false;
  isShowFull = false;
  isTCDetails = false;
  isShowLOSwabDetails = false;
  isShowLORinseDetails = false;
  isShowTCSwabDetails = false;
  isShowTCRinseDetails = false;
  isShowLOSwabMoc = false;
  isShowLORinseMoc = false;

  constructor(
    private _fb: FormBuilder,
    public analyticalService: AnalyticalService
  ) { }

  ngOnInit() {
    this.buildAnalyticalForm();
    this.isShowFull = true;
  }
// Building form method
  buildAnalyticalForm() {
    this.analyticalForm = this._fb.group({
      analyticalMethodId: ['', Validators.compose([Validators.required])],
      targetResidueType: ['', Validators.compose([Validators.required])],
      lod: [''],
      loq: [''],
      swabMethodUsed: [''],
      swabSolventName: [''],
      swabSolventQty: [''],
      swabDefaultRecovery: [''],
      swabMOC: this._fb.array([]),
      rinseMethodUsed: [''],
      rinseDefaultRecovery: [''],
      rinseMOC: this._fb.array([]),
      reason: ['', Validators.compose([Validators.required])]
    });

    this.initialFormState = _.cloneDeep(this.analyticalForm);
  }

  onChange(value) {
    if (value > 2) {
      this.isShowLODetails = false;
      this.isTCDetails = true;
    } else {
      this.isShowLODetails = true;
      this.isTCDetails = false;
    }
  }

  openSwab() {
    this.isShowLOSwabDetails = !this.isShowLOSwabDetails;
  }

  openRinse() {
    this.isShowLORinseDetails = !this.isShowLORinseDetails;
  }

  addSwabMoc() {
    this.isShowLOSwabMoc = true;
    const offerArray = this.analyticalForm.get('swabMOC') as FormArray;
    offerArray.push(this.createLOMoc());
  }

  addRinseMoc() {
    this.isShowLORinseMoc = true;
    const offerArray = this.analyticalForm.get('rinseMOC') as FormArray;
    offerArray.push(this.createLOMoc());
  }

  private createLOMoc(item?): FormGroup {
    return this._fb.group({
      MocType: [item ? item.MocType : ''],
      RecoveryPercentage: [item ? item.RecoveryPercentage : '']
    });
  }

  public getSwabMOCFormControls() {
    return this.analyticalForm.get('swabMOC')['controls'];
  }

  public getRinseMOCFormControls() {
    return this.analyticalForm.get('rinseMOC')['controls'];
  }

  public AddLOMOC() {
    const offerArray = this.analyticalForm.get('swabMOC') as FormArray;
    offerArray.push(this.createLOMoc());
  }

  public AddRinseLOMOC() {
    const offerArray = this.analyticalForm.get('rinseMOC') as FormArray;
    offerArray.push(this.createLOMoc());
  }

  removeMOC(i) {
    const dispatchArray = <FormArray>this.analyticalForm.controls['swabMOC'];
    dispatchArray.removeAt(i);
    if (dispatchArray.controls.length === 0) {
      this.isShowLOSwabMoc = false;
    }
  }

  removeRinseMOC(i) {
    const dispatchArray = <FormArray>this.analyticalForm.controls['rinseMOC'];
    dispatchArray.removeAt(i);
    if (dispatchArray.controls.length === 0) {
      this.isShowLORinseMoc = false;
    }
  }

  correctHt() {
    if (this.isShowLOSwabDetails || this.isShowLORinseDetails) {
      return false;
    } else {
      return true;
    }
  }

  ResetForm() {
    this.analyticalForm = _.cloneDeep(this.initialFormState);
    this.isShowLODetails = false;
    this.isShowFull = false;
    this.isTCDetails = false;
    this.isShowLOSwabDetails = false;
    this.isShowLORinseDetails = false;
    this.isShowTCSwabDetails = false;
    this.isShowTCRinseDetails = false;
    this.isShowLOSwabMoc = false;
    this.isShowLORinseMoc = false;
  }

  // Saving Data to service method.
  saveData() {
    if (this.analyticalForm.valid) {
      const analyticalData = this.analyticalForm.getRawValue();
      this.analyticalService.analyticalData.push(analyticalData);
      this.ResetForm();
    }
  }
}
