import { FormGroup } from '@angular/forms';

export abstract class SmartForm {
    form: FormGroup;
    formErrorMessages: { [key: string]: { [key: string]: string } };

    constructor(formGroup: FormGroup, formErrorMessages: { [key: string]: { [key: string]: string } } = {}) {

        this.form = formGroup;
        this.formErrorMessages = formErrorMessages;

        // Add default error messages to form error messages
        this.formErrorMessages['_default'] = {
            required: 'This field is required.'
        }
    }

    getErrorMessage(controlName: string): string {
        const control = this.form.get(controlName);

        if (!control || !control.touched || !control.errors) {
            return '';
        }

        const errorKey = Object.keys(control.errors)[0];

        return this.formErrorMessages?.[controlName]?.[errorKey] || this.formErrorMessages?.['_default']?.[errorKey] || '';
    }

    abstract onSubmit(): void
}
