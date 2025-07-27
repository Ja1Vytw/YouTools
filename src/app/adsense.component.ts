import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-adsense',
  standalone: true,
  template: `
    <div class="my-8 flex justify-center">
      <ins class="adsbygoogle"
           style="display:block"
           [attr.data-ad-client]="adClient"
           [attr.data-ad-slot]="adSlot"
           data-ad-format="auto"></ins>
    </div>
  `
})
export class AdsenseComponent implements AfterViewInit {
  @Input() adClient = 'ca-pub-5931382207027722';
  @Input() adSlot = '';

  ngAfterViewInit() {
    // @ts-ignore
    if (window.adsbygoogle) {
      // @ts-ignore
      window.adsbygoogle.push({});
    }
  }
} 