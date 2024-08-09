import { Component, output } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-identifier-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './identifier-form.component.html',
  styleUrl: './identifier-form.component.css'
})
export class IdentifierFormComponent {
  identifierControl = new FormControl('');
  onValidIdentifier = output<string>();

  identifierIsValid() : boolean {
    const SPOTIFY_ID_LEN = 22;
    const re: RegExp = new RegExp("((http|https)://)(www.)?" 
      + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" 
      + "{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")

    const identifier: string = this.identifierControl.value as string;
    return re.test(identifier) || identifier.length === SPOTIFY_ID_LEN;
  }

  onSubmit() : void {
    if (this.identifierIsValid()) {
      const identifier = this.identifierControl.value as string;
      this.onValidIdentifier.emit(identifier);
    }
  }
}
