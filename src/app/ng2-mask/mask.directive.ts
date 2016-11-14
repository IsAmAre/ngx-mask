import {Directive, Input, Output, HostListener, ElementRef, EventEmitter} from '@angular/core';

@Directive({
  selector: '[mask]'
})
export class MaskDirective {

  @HostListener('input')
  public onInput() {
    this._elementRef.nativeElement.value = this._applyMask(this._elementRef.nativeElement.value, this._maskExpression);
  }


  /* what shoul we do with immediately set property in parent component???*/

  // @Input()
  // public set ngModel(val) {
  //   console.log(val)
  //   if (!val) {
  //     return;
  //   }
  //   //this.ngModelChange.emit(this._applyMask(this._elementRef.nativeElement.value, this._maskExpression));
  // };


  /*try change this */
  // @Output()
  // public ngModelChange = new EventEmitter();

  @Input('mask')
  public set maskExpression(value: string) {
    if (!value) {
      return;
    }
    this._maskExpression = value;
  }


  private _maskExpression: string;
  private _elementRef: ElementRef;

  public constructor(_elementRef: ElementRef) {
    this._elementRef = _elementRef;
  }

  private _applyMask(inputValue: string, maskExpression: string): string {
    let cursor = 0
    let result = '';
    for (let inputSymbol of inputValue.split('')) {
      if (result.length === maskExpression.length) {
        break;
      }
      while (['/', '(', ')', '.', ':', '-', ' ', '+'].includes(maskExpression[cursor])) {
        result += maskExpression[cursor];
        cursor++;
        // if (inputSymbol !== maskExpression[cursor - 1]) {
        //   break;
        // }
      }
      if (this._checkSymbolMask(inputSymbol, maskExpression[cursor])) {
        result += inputSymbol;
        cursor++;
      }
    }

    if(result.length + 1  === maskExpression.length
    && ['/', '(', ')', '.', ':', '-', ' ', '+'].includes(maskExpression[maskExpression.length - 1])) {
      result += maskExpression[maskExpression.length - 1];
    }

    return result;
  }

  private _checkSymbolMask(input: string, letter: string): boolean {
    return input === letter
      || letter === '0' && /\d/.test(input)
  }


}
