const Footer = () => {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {/* Brand */}
            <div>
              <h3 className="font-serif font-semibold text-primary mb-3">
                Seb Green
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Compassionate memorial coordination with dignity and respect.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-medium text-primary mb-3 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#services" className="hover:text-primary transition-colors">
                    Service Checklist
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-primary transition-colors">
                    Service Options
                  </a>
                </li>
                <li>
                  <a href="#examples" className="hover:text-primary transition-colors">
                    Service Examples
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-medium text-primary mb-3 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="mailto:workwithsebgreen@gmail.com"
                    className="hover:text-primary transition-colors"
                  >
                    workwithsebgreen@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/_sebgreen_/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    @_sebgreen_
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sebastian-green-4828ab103/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+447900332505"
                    className="hover:text-primary transition-colors"
                  >
                    07900 332505
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Seb Green Creative & Technical Services. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
