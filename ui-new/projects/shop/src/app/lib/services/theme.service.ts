import { Injectable, RendererFactory2, Renderer2, Inject } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  _currentTheme$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  

  private _renderer: Renderer2;
  private head: HTMLElement;
  private themeLinks: HTMLElement[] = [];

  get currentTheme(): Observable<string | undefined> {
    return this._currentTheme$.asObservable().pipe(tap(async theme => {
      theme = theme?.replace("shop-default-", "");
      theme = `${theme}.css`
      if(theme)
        await this.loadCss(theme);      
    }));
  };
  // theme$: Observable<[string, boolean]>;
  @Inject(DOCUMENT)  document: Document | undefined

  constructor(
    rendererFactory: RendererFactory2,
    private http: HttpClient
  ) {
    this.head = document.head;
    this._renderer = rendererFactory.createRenderer(null, null);
    // this.theme$ = combineLatest([this._mainTheme$, this._darkMode$]);
    // this.theme$.subscribe(async ([mainTheme, darkMode]) => {
    //   console.log(mainTheme, darkMode)
    //   const cssExt = '.css';
    //   const cssFilename = darkMode ? mainTheme + '-dark' + cssExt : mainTheme + cssExt;
    //   await this.loadCss(cssFilename);
    //   console.log(this.themeLinks)
    //   if (this.themeLinks.length == 2){
    //     console.log(this.themeLinks);
    //     this._renderer.removeChild(this.head, this.themeLinks.shift());

    //   }        
    // })
  }

 
  private async loadCss(filename: string) {

    return new Promise(resolve => {
      const linkEl: HTMLElement = this._renderer.createElement('link');
      this._renderer.setAttribute(linkEl, 'rel', 'stylesheet');
      this._renderer.setAttribute(linkEl, 'type', 'text/css');
      this._renderer.setAttribute(linkEl, 'href', filename);
      this._renderer.setProperty(linkEl, 'onload', resolve);
      this._renderer.appendChild(this.head, linkEl);
      this.themeLinks = [...this.themeLinks, linkEl];
    })
  }

  themes(){
    return this.http.get<any>(`/shop/themes`);
  }

  saveTheme(themeId: number = 0){
    return this.http.post<any>(`/shop/themes/save`, {theme_id: themeId});
  }

}