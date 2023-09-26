import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ITypes } from 'src/app/shared/interfaces/types.interface';
import { ToastrService } from 'ngx-toastr';
import { finalize } from "rxjs/operators";
import { PokeService } from 'src/app/shared/services/poke/poke.service';
import { StateService } from 'src/app/shared/services/state/state.service';
import { uppercaseFirstLetter } from 'src/app/shared/utils/functions';

@Component({
  selector: 'app-form-poke',
  templateUrl: './form-poke.component.html',
  styleUrls: ['./form-poke.component.scss']
})
export class FormPokeComponent implements OnInit {
  public form!: FormGroup;
  public abilities = ['Overgrow', 'Chlorophyll', 'Blaze', 'Solar-power', 'Torrent', 'Rain-dish'];
  public isTypeEnabled: boolean = true;
  public types: ITypes[] = [
    {value: 'grass', viewValue: 'Grass'},
    {value: 'water', viewValue: 'Water'},
    {value: 'fire', viewValue: 'Fire'},
    {value: 'earth', viewValue: 'Earth'},
    {value: 'air', viewValue: 'Air'},
  ];
  public isEditing: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private pokeService: PokeService,
    private stateService: StateService,
  ) { }

  ngOnInit(): void {
    this.isEditing = this.data ? true : false;
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      abilities: [null, Validators.required],
      type: [null, Validators.required],
    });

    if (this.isEditing) {
      this.form.get('name')?.setValue(uppercaseFirstLetter(this.data.name));
      this.form.get('abilities')?.setValue(this.data.abilities.map((item: any) => uppercaseFirstLetter(item.ability.name)));
      this.form.get('type')?.setValue(this.data.types[0].type.name);
    }
  }

  public onSubmit(): void {
    this.stateService.setIsLoading(true);
    const method = this.isEditing ? 'editPokemon' : 'addPokemon';

    this.pokeService[method](this.form.valid)
      .pipe(finalize(() => this.stateService.setIsLoading(false)))
      .subscribe(response => {
        this.toastrService.success(response.message);
        this.closeModal();
      }, err => this.toastrService.warning('Ocorreu um erro ao adicionar.'));
    
  }

  public onChangeEnableType(checked: boolean) {
    this.isTypeEnabled = checked;

    if (!checked) {
      this.form.get('type')?.setValue(null);
      this.form.get('type')?.markAsPristine();
      this.form.get('type')?.reset();
      this.form.get('type')?.clearValidators();
    } else {
      this.form.get('type')?.setValidators([Validators.required]);
    }

    this.form.get('type')?.updateValueAndValidity();
  }

  public onCancel(): void {
    this.closeModal();
  }

  private closeModal(): void {
    this.dialog.closeAll();
  }
}