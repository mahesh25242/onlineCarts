import { FeaturesComponent } from './features/features.component';
import { FeaturesSvgComponent } from './features/features-svg/features-svg.component';
import { OurClientsComponent } from './our-clients/our-clients.component';
// import { StepsToStartComponent } from './steps-to-start/steps-to-start.component';
import { WhoNeedThisComponent } from './who-need-this/who-need-this.component';
import { BannerComponent } from './banner/banner.component';
import { HomeBannerSvgComponent } from './home-banner-svg/home-banner-svg.component';
import { HomeComponent } from './home.component';


const HomePageComponents = [
    FeaturesComponent,
    FeaturesSvgComponent,
    OurClientsComponent,
    // StepsToStartComponent,
    WhoNeedThisComponent,
    BannerComponent,
    HomeComponent  ,
    HomeBannerSvgComponent      
];

export {
    HomeComponent
};

export default HomePageComponents;