// Dependencies
import { Pipe, PipeTransform } from '@angular/core';
import { showError } from '../showError/showError.pipe';
import { showWarning } from '../showWarning/showWarning.pipe';

@Pipe({
  name: 'stateErrorPipe',
})
export class stateError implements PipeTransform {
  ngOnInit(): void {}
  constructor(
    private error: showError,
    private warning: showWarning,
  ) {}
  transform(state: any): any {
      console.log(state);
      const { statusText, message } = state || {};
      if(statusText === "UNAUTHORIZED"){
        return this.warning.transform("Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if(statusText === "UNPROCESSABLE ENTITY"){
        return this.error.transform("No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else{
        return this.error.transform(`Ha ocurrido un error. ${message}`)
      }
  }
}