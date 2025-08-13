import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { footerConfig } from "@/lib/footer-config"

export function Footer() {
  return (
    <footer className="bg-[#262626] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#850101] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">Ei</span>
              </div>
              <span className="font-bold text-lg">Ei ASSET Talent Search</span>
            </div>
            <p className="text-gray-400 text-sm">
              Identifying the top 2% gifted students globally through comprehensive talent assessment.
            </p>
          </div>

          {/* Auto-Generated Sitemap */}
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">Sitemap</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              {footerConfig.sitemap.map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold mb-2 text-white">{section.title}</h4>
                  <ul className="space-y-1">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            {link.name}
                          </a>
                        ) : (
                          <Link href={link.href} className="text-blue-400 hover:underline">
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Auto-Generated Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {footerConfig.legal.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="text-gray-400 hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Auto-Generated Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{footerConfig.contact.email}</p>
              <p>{footerConfig.contact.phone}</p>
              <p>{footerConfig.contact.hours}</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <Link href={footerConfig.social.facebook} target="_blank" aria-label="Facebook" className="hover:text-white">
                <Facebook className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link href={footerConfig.social.twitter} target="_blank" aria-label="Twitter" className="hover:text-white">
                <Twitter className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link href={footerConfig.social.linkedin} target="_blank" aria-label="LinkedIn" className="hover:text-white">
                <Linkedin className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
              <Link href={footerConfig.social.youtube} target="_blank" aria-label="YouTube" className="hover:text-white">
                <Youtube className="h-5 w-5 text-gray-400 hover:text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick registration CTA */}
        <div className="mt-8 text-center">
          <Link
            href="https://ats.ei.study/ats_registration.php"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#850101] hover:bg-[#650101] text-white font-semibold px-6 py-3 rounded-md transition-colors"
          >
            Register Now
          </Link>
        </div>

        {/* Auto-Generated Company Info */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400 space-y-1">
          <p>&copy; {footerConfig.company.copyright}</p>
          <p>{footerConfig.company.address}</p>
          <p>{footerConfig.company.cin}</p>
        </div>
      </div>
    </footer>
  )
}
