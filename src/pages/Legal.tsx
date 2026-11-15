import { SebPrivacyPolicy, SebTermsOfService } from "@seb-os/site-design-system";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SITE_NAME = "Memorial Strategy with Seb Green";

export function SitePrivacy() {
  return (
    <>
      <Navigation />
      <SebPrivacyPolicy siteName={SITE_NAME} hasEnquiryForm={true} />
      <Footer />
    </>
  );
}

export function SiteTerms() {
  return (
    <>
      <Navigation />
      <SebTermsOfService
        siteName={SITE_NAME}
      />
      <Footer />
    </>
  );
}
