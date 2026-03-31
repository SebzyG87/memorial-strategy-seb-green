import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-3xl md:text-4xl font-serif font-semibold text-primary mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-slate max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p className="text-sm">
              <strong className="text-primary">Last updated:</strong> February 2026
            </p>

            <p>
              Seb Green Creative & Technical Services ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your personal data when you use our memorial coordination and media services, in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">1. Data Controller</h2>
            <p>
              Seb Green Creative & Technical Services is the data controller responsible for your personal data. If you have any questions about this policy, please contact us at{" "}
              <a href="mailto:workwithsebgreen@gmail.com" className="text-primary hover:underline">
                workwithsebgreen@gmail.com
              </a>.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">2. Data We Collect</h2>
            <p>We collect the following personal data for the purpose of providing our services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Names</strong> – to identify and communicate with clients</li>
              <li><strong className="text-foreground">Email addresses</strong> – for booking confirmations, enquiries, and service delivery</li>
              <li><strong className="text-foreground">Phone numbers</strong> – for direct communication regarding bookings</li>
              <li><strong className="text-foreground">Photographs and video recordings</strong> – captured as part of our memorial media services</li>
            </ul>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">3. How We Use Your Data</h2>
            <p>Your personal data is used for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing and managing service bookings</li>
              <li>Communicating with you about your enquiry or booking</li>
              <li>Delivering our memorial media services (photography, videography, live streaming, and AI-enhanced keepsakes)</li>
              <li>Improving our services and customer experience</li>
            </ul>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">4. Use of AI Tools</h2>
            <p>
              We use artificial intelligence (AI) tools to process certain data for the purpose of enhancing efficiency and delivering our AI Memorial Portrait and restoration services. This may include processing photographs through AI systems to create enhanced portraits and restored images. All AI processing is carried out in accordance with UK GDPR principles, and we ensure appropriate safeguards are in place to protect your data.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">5. Sharing Your Data</h2>
            <p>
              We do <strong className="text-foreground">not</strong> sell your personal data to third parties. However, we may share your data with trusted sub-processors who are necessary for delivering our services, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Payment processing providers</li>
              <li>Cloud storage and hosting providers</li>
              <li>AI processing services used for portrait generation and photo restoration</li>
              <li>Communication platforms (e.g., email and scheduling services)</li>
            </ul>
            <p>
              All sub-processors are required to handle your data in accordance with UK GDPR and our data protection standards.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">6. Data Retention</h2>
            <p>
              We retain your personal data only for as long as is necessary to fulfil the purposes for which it was collected, or as required by law. Booking-related data is typically retained for up to 12 months after the service has been delivered.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">7. Your Rights</h2>
            <p>Under the UK GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-foreground">Right of access</strong> – request a copy of the data we hold about you</li>
              <li><strong className="text-foreground">Right to rectification</strong> – request correction of inaccurate data</li>
              <li><strong className="text-foreground">Right to erasure</strong> – request deletion of your personal data</li>
              <li><strong className="text-foreground">Right to restrict processing</strong> – request that we limit how we use your data</li>
              <li><strong className="text-foreground">Right to data portability</strong> – request your data in a portable format</li>
              <li><strong className="text-foreground">Right to object</strong> – object to our processing of your personal data</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:workwithsebgreen@gmail.com" className="text-primary hover:underline">
                workwithsebgreen@gmail.com
              </a>.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">8. Data Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">9. Cookies</h2>
            <p>
              Our website may use essential cookies to ensure functionality. We do not use tracking or marketing cookies. If this changes, we will update this policy and seek your consent where required.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
            </p>

            <h2 className="text-xl font-serif font-semibold text-primary mt-8">11. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact:
            </p>
            <p>
              <strong className="text-foreground">Seb Green Creative & Technical Services</strong><br />
              Email:{" "}
              <a href="mailto:workwithsebgreen@gmail.com" className="text-primary hover:underline">
                workwithsebgreen@gmail.com
              </a><br />
              Phone:{" "}
              <a href="tel:+447900332505" className="text-primary hover:underline">
                07900 332505
              </a>
            </p>

            <p className="text-sm mt-8 pt-4 border-t border-border">
              You also have the right to lodge a complaint with the Information Commissioner's Office (ICO) at{" "}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                ico.org.uk
              </a>{" "}
              if you believe your data protection rights have been breached.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
