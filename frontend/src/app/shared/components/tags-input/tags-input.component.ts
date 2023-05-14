import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, forwardRef, HostListener, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { QuestionsService } from 'src/app/modules/questions/services/questions.service';

@Component({
  selector: 'app-tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsInputComponent),
      multi: true
    }
  ]
})
/** Component for managing a list of tags input by the user, it implements the ControlValueAccessor so it will work with reactive forms. */
export class TagsInputComponent implements ControlValueAccessor {

  /** Keys codes that can be used to separate tags. */
  separatorKeysCodes: number[] = [ENTER, COMMA];

  /** Form control for managing the input value of the tag. */
  tagCtrl = new FormControl('');

  /** Observable that emits filtered tag values based on user input. */
  filteredTags: Observable<string[]>;

  /** Set of tags added by the user. */
  tags = new Set<string>();

  /** Array of all available tags. */
  allTags: string[] = [];

  /** Reference to the input element for adding new tags. */
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  /**
   * Creates a new instance of the TagsInputComponent class.
   * @constructor
   */
  constructor(private questionsService: QuestionsService) {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) => (tag ? this._filter(tag) : this.allTags.slice())),
    );

    this.questionsService.getTags().subscribe( tags => {this.allTags = tags})
  }

  /**
   * Adds a new tag to the list of tags.
   * @param event The MatChipInputEvent object for adding a new tag.
   */
  add(event: MatChipInputEvent): void {    

    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.add(value);
      this.updateControlValue()
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);

  }

  /**
   * Removes a tag from the list of tags.
   * @param tag The tag to remove.
   */
  remove(tag: string): void {
    this.tags.delete(tag)
    this.updateControlValue()
  }

  /**
   * Adds a selected tag to the list of tags.
   * @param event The MatAutocompleteSelectedEvent object for selecting a tag.
   */
  selected(event: MatAutocompleteSelectedEvent): void {
    console.log('selected');
    
    this.tags.add(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    this.updateControlValue()
  }

  /**
   * Filters available tags based on user input.
   * @param value The value to use for filtering tags.
   * @returns An array of filtered tag values.
   */
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.toLowerCase().includes(filterValue));
  }

  /** This methods updates the value of this component control value to work with the angular form API */
  updateControlValue() {
    this.onChange(this.tags)
  }

  // ControlValueAcessor interface methods and properties, methods need to be implemented to comply with the interface
  private onChange: (value: Set<string>) => void = () => { };
  private onTouched: () => void = () => { };

  writeValue(tags: string[]): void {
    if (tags) {
      this.tags = new Set(tags);
    }
  }
  registerOnChange(fn: (value: Set<string>) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
  setDisabledState?(isDisabled: boolean): void { }

  // When this component triggers the focus out event it is marked as touched
  @HostListener('focusout')
  onFocusOut() { this.onTouched(); }
}

