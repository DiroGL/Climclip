import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

// Validador de coincidencia de contraseñas
export function passwordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const formGroup = control as FormGroup;
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}

// Validador de complejidad de contraseña
export function passwordComplexityValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasMinLength = value.length >= 8;

    const complexityValid = hasUpperCase && hasLowerCase && hasNumeric && hasMinLength;

    return !complexityValid ? { passwordComplexity: true } : null;
  };
}
