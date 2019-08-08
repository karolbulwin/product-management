import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormGroup
} from '@angular/forms';

function productMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const productControl = c.get('product');
  const confirmControl = c.get('confirmProduct');

  console.log('productControl::value:' + productControl.value);
  console.log('confirmControl:value::' + confirmControl.value);

  console.log('productControl::pristine:' + productControl.pristine);
  console.log('confirmControl::pristine:' + confirmControl.pristine);

  if (productControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (productControl.value === confirmControl.value) {
    return null;
  }
  confirmControl.setErrors({ noMach: true });
  console.log('here');
  return { noMatch: true };
}

function companyValidator(min: number, max: number): ValidatorFn {
  return (
    c: AbstractControl
  ): {
    [key: string]: boolean;
  } | null => {
    if (c.value.length < min || c.value.length > max) {
      return { range: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  addressForm: FormGroup;

  states = [
    { name: 'Alabama', abbreviation: 'AL' },
    { name: 'Alaska', abbreviation: 'AK' },
    { name: 'American Samoa', abbreviation: 'AS' },
    { name: 'Arizona', abbreviation: 'AZ' },
    { name: 'Arkansas', abbreviation: 'AR' },
    { name: 'California', abbreviation: 'CA' },
    { name: 'Colorado', abbreviation: 'CO' },
    { name: 'Connecticut', abbreviation: 'CT' },
    { name: 'Delaware', abbreviation: 'DE' },
    { name: 'District Of Columbia', abbreviation: 'DC' },
    { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
    { name: 'Florida', abbreviation: 'FL' },
    { name: 'Georgia', abbreviation: 'GA' },
    { name: 'Guam', abbreviation: 'GU' },
    { name: 'Hawaii', abbreviation: 'HI' },
    { name: 'Idaho', abbreviation: 'ID' },
    { name: 'Illinois', abbreviation: 'IL' },
    { name: 'Indiana', abbreviation: 'IN' },
    { name: 'Iowa', abbreviation: 'IA' },
    { name: 'Kansas', abbreviation: 'KS' },
    { name: 'Kentucky', abbreviation: 'KY' },
    { name: 'Louisiana', abbreviation: 'LA' },
    { name: 'Maine', abbreviation: 'ME' },
    { name: 'Marshall Islands', abbreviation: 'MH' },
    { name: 'Maryland', abbreviation: 'MD' },
    { name: 'Massachusetts', abbreviation: 'MA' },
    { name: 'Michigan', abbreviation: 'MI' },
    { name: 'Minnesota', abbreviation: 'MN' },
    { name: 'Mississippi', abbreviation: 'MS' },
    { name: 'Missouri', abbreviation: 'MO' },
    { name: 'Montana', abbreviation: 'MT' },
    { name: 'Nebraska', abbreviation: 'NE' },
    { name: 'Nevada', abbreviation: 'NV' },
    { name: 'New Hampshire', abbreviation: 'NH' },
    { name: 'New Jersey', abbreviation: 'NJ' },
    { name: 'New Mexico', abbreviation: 'NM' },
    { name: 'New York', abbreviation: 'NY' },
    { name: 'North Carolina', abbreviation: 'NC' },
    { name: 'North Dakota', abbreviation: 'ND' },
    { name: 'Northern Mariana Islands', abbreviation: 'MP' },
    { name: 'Ohio', abbreviation: 'OH' },
    { name: 'Oklahoma', abbreviation: 'OK' },
    { name: 'Oregon', abbreviation: 'OR' },
    { name: 'Palau', abbreviation: 'PW' },
    { name: 'Pennsylvania', abbreviation: 'PA' },
    { name: 'Puerto Rico', abbreviation: 'PR' },
    { name: 'Rhode Island', abbreviation: 'RI' },
    { name: 'South Carolina', abbreviation: 'SC' },
    { name: 'South Dakota', abbreviation: 'SD' },
    { name: 'Tennessee', abbreviation: 'TN' },
    { name: 'Texas', abbreviation: 'TX' },
    { name: 'Utah', abbreviation: 'UT' },
    { name: 'Vermont', abbreviation: 'VT' },
    { name: 'Virgin Islands', abbreviation: 'VI' },
    { name: 'Virginia', abbreviation: 'VA' },
    { name: 'Washington', abbreviation: 'WA' },
    { name: 'West Virginia', abbreviation: 'WV' },
    { name: 'Wisconsin', abbreviation: 'WI' },
    { name: 'Wyoming', abbreviation: 'WY' }
  ];

  constructor(private fb: FormBuilder) {}

  // onFillNameClicked(): void {
  //   this.addressForm.patchValue({
  //     firstName: 'Karol'
  //   });
  // }

  onFillAllClicked(): void {
    this.addressForm.setValue({
      company: 'The best',
      firstName: 'Some',
      lastName: 'body',
      address: 'Some',
      city: 'where',
      state: 'CA',
      postalCode: '00000',
      notification: 'text',
      phone: null,
      email: 'somebody@somewhere.com',
      productGroup: {
        product: 'Any',
        confirmProduct: 'Any'
      }
    });
  }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      company: ['', companyValidator(1, 10)],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      state: [null, Validators.required],
      postalCode: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(5)
        ])
      ],
      notification: [null, Validators.required],
      phone: [null],
      email: [null],
      productGroup: this.fb.group(
        {
          product: [null, Validators.required],
          confirmProduct: [null, Validators.required]
        },
        { validator: productMatcher }
      )
    });
    this.addressForm
      .get('notification')
      .valueChanges.subscribe(value => this.setNotification(value));
  }

  onSubmit() {
    // if (this.addressForm.status === 'VALID') {
    alert('Thanks! But this was a fake page :D');
    console.log(this.addressForm);
    console.log(this.addressForm.value);
    // }
  }

  setNotification(notifyVia: string): void {
    const phoneControl = this.addressForm.get('phone');
    const emailControl = this.addressForm.get('email');

    if (notifyVia === 'text') {
      emailControl.setValidators([Validators.required, Validators.email]);
      phoneControl.clearValidators();
    } else {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
  }
}
