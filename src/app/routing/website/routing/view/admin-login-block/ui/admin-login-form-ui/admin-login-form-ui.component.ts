import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login-form-ui',
  templateUrl: './admin-login-form-ui.component.html',
  styleUrls: ['./admin-login-form-ui.component.scss'],
})
export class AdminLoginFormUiComponent implements OnInit {
  formGroup!: FormGroup;
  @Input()
  disabled: boolean = false;
  @Input() formError: string | null = '';
  @Output() login = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onFormChange(): void {
    this.formError = '';
  }

  onSubmit() {
    console.log('UI', this.formGroup.value);
    this.login.emit(this.formGroup.value);
  }
}
