import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormatTimeCancionPipePipe } from './pipes/format-time-cancion-pipe.pipe';
import { showError } from './pipes/showError/showError.pipe';
import { showSuccess } from './pipes/showSuccess/showSuccess.pipe';
import { showWarning } from './pipes/showWarning/showWarning.pipe';
import { stateError } from './pipes/stateError/stateError.pipe';

@NgModule({
  providers: [DecimalPipe, showSuccess, showWarning, stateError, showError],
  declarations: [
    FormatTimeCancionPipePipe,
    showError,
    showSuccess,
    showWarning,
    stateError
  ],
  imports: [CommonModule],
  exports: [FormatTimeCancionPipePipe, showError, showSuccess, showWarning, stateError],
})
export class SharedModule {}
