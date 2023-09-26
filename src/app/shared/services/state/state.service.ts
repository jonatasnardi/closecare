import { Injectable } from '@angular/core';
import { IStateProperty } from '../../interfaces/state-property.interface';
import { isJson } from '../../utils/functions';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private isLoading: IStateProperty = { persist: true, data: false };

  constructor() {
    this.assignPersistedValues();
  }

  // setters
  public setIsLoading(value: boolean) { this.save('isLoading', value) };

  // getters
  public getIsLoading(): boolean { return this.get('isLoading') };

  private save(property: string, value: any) {
    (this as any)[property].data = value;
    if ((this as any)[property].persist) {
      localStorage.setItem(property, JSON.stringify(value));
    }
  }

  private get(property: string) {
    return (this as any)[property].data;
  }

  public clear(property: string) {
    (this as any)[property].data = null;
    if ((this as any)[property].persist) {
      localStorage.removeItem(property);
    }
  }

  public clearAll() {
    for (let prop in this) {
      if (this.hasOwnProperty(prop) && (this as any)[prop].hasOwnProperty('persist')) {
        (this as any)[prop].data = null;
        localStorage.removeItem(prop);
      }
    }
  }

  private assignPersistedValues() {
    for (let prop in this) {
      if (this.hasOwnProperty(prop) && (this as any)[prop].hasOwnProperty('persist')) {
        (this as any)[prop].data = (isJson(localStorage.getItem(prop) as any) ? JSON.parse(localStorage.getItem(prop) as any) : localStorage.getItem(prop)) || null;
      }
    }
  }
}