import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#850101] to-[#650101] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="prose lg:prose-lg prose-ul:list-disc prose-ul:pl-6 max-w-none p-8 space-y-4">
              <h2 className="font-bold">Introduction</h2>
              <p>
                Welcome to the Ei ATS, an online competition hosted on ct.ei-usa.com by Educational Initiatives Pvt Limited ("Educational Initiatives," "we," "us," or "our"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines our practices concerning the collection, use, and disclosure of your personal data. Please read this policy carefully to understand how we handle your information.
              </p>

              <h2 className="font-bold">Information We Collect</h2>
              <h3 className="font-bold">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  We may collect personal information from participants in the Ei ATS competition, including but not limited to name, age, email address, postal address, and contact information.
                </li>
              </ul>

              <h3 className="font-bold">Payment Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  When you make a payment for registration charges, we may collect payment details such as credit card information or other payment methods.
                </li>
              </ul>

              <h3 className="font-bold">Usage Information</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  We may collect information about your use of our website, including IP addresses, browser type, device information, and log data.
                </li>
              </ul>

              <h2 className="font-bold">Use of Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>To facilitate your participation in the Ei ATS competition.</li>
                <li>To process payments for registration charges.</li>
                <li>To communicate with you about the competition, updates, and related services.</li>
                <li>To improve our website and services, including analyzing usage data.</li>
                <li>To comply with legal obligations.</li>
              </ul>

              <h2 className="font-bold">Sharing of Information</h2>
              <h3 className="font-bold">Service Providers</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  We may share your information with trusted service providers who assist us in conducting and improving the competition, processing payments, or providing technical support. We do not sell any of your information to any third party for any commercial usage.
                </li>
              </ul>

              <h3 className="font-bold">Legal Compliance</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  We may disclose your information if required by law or in response to valid requests from law enforcement or other government authorities.
                </li>
              </ul>

              <h2 className="font-bold">Data Security</h2>
              <p>
                We take reasonable measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="font-bold">Data Retention</h2>
              <p>
                We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by applicable laws.
              </p>

              <h2 className="font-bold">Your Choices</h2>
              <p>
                You can update, correct, or delete your personal information by contacting us at <a href="mailto:competition@ei.study">competition@ei.study</a>. You may also unsubscribe from marketing communications at any time by following the instructions in such emails.
              </p>

              <h2 className="font-bold">Changes to this Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. The updated policy will be posted on this website with a revised "Last Updated" date.
              </p>

              <h2 className="font-bold">Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests related to this Privacy Policy, please contact us at <a href="mailto:competition@ei.study">competition@ei.study</a>.
              </p>

              <h2 className="font-bold">Governing Law</h2>
              <p>
                This Privacy Policy is governed by the laws of India.
              </p>

              <p>
                By using our website and participating in the Ei ATS competition, you consent to the practices described in this Privacy Policy.
              </p>

              <p>
                Contact <a href="mailto:competition@ei.study">competition@ei.study</a> for further policy clarification or questions. We're excited for an enjoyable competition experience for all!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 