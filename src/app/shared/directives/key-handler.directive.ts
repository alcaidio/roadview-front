import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appArrowup]',
})
export class ArrowUpDirective {
  @HostListener('keydown.arrowup')
  something() {}
}

@Directive({
  selector: '[appArrowdown]',
})
export class ArrowDownDirective {
  @HostListener('keydown.arrowdown')
  something() {}
}
