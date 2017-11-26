import { AbstractControl, FormControl } from '@angular/forms';

export function ValidateConfirmPassword(passwordKey: string): object {
    return function (control: FormControl) {
        if (control.root && control.value) {
            if (control.root.value[passwordKey] === control.value) {
                return ;
            }
        }
        return { ValidConfirmPassword: false };
    }
}
