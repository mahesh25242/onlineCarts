import { APP_INITIALIZER, FactoryProvider } from "@angular/core";
import { tap } from "rxjs";
import { ShopService } from "../services";

const  initializeAppFactory = (shopService: ShopService) => () => shopService.shopDetail(); 
  
  
const LoadInitialConfigaration: FactoryProvider = {
    provide: APP_INITIALIZER,
    useFactory: initializeAppFactory,
    deps: [ShopService],
    multi: true
};
  
export {
    LoadInitialConfigaration
};