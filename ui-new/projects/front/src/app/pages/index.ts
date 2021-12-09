import  {AboutUsComponent}  from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import { RefundAndCancellationComponent} from './refund-and-cancellation/refund-and-cancellation.component';
import { TermsAndConditionComponent} from './terms-and-condition/terms-and-condition.component';
import { PricingComponent } from './pricing/pricing.component';
import HomePageComponents, { HomeComponent } from './home';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

import { PackageResolver } from './pricing/package-resolver';
import SignUpPageComponents, { SignUpComponent } from './sign-up';

const PagesComponents = [
    ...HomePageComponents,
    ...SignUpPageComponents,
    AboutUsComponent,
    ContactUsComponent,    
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    RefundAndCancellationComponent,
    TermsAndConditionComponent,
    PricingComponent,
    HowItWorksComponent
];

export{
    AboutUsComponent,
    ContactUsComponent,
    HomeComponent,
    PageNotFoundComponent,
    PrivacyPolicyComponent,
    RefundAndCancellationComponent,
    TermsAndConditionComponent,
    PricingComponent,
    HowItWorksComponent,
    SignUpComponent,

    PackageResolver
};
export default PagesComponents;