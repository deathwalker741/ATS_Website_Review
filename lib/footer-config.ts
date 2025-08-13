// Auto-updatable footer configuration
// This extends the navigation system to generate consistent footer sitemaps

import { navigationMenus, NavigationConfig } from './navigation'

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface FooterLink {
  name: string
  href: string
  external?: boolean
}

export interface FooterConfig {
  sitemap: FooterSection[]
  legal: FooterLink[]
  contact: {
    email: string
    phone: string
    hours: string
  }
  social: {
    facebook: string
    twitter: string
    linkedin: string
    youtube: string
  }
  company: {
    name: string
    address: string
    cin: string
    copyright: string
  }
}

// Configuration for footer-specific content
const footerSpecificConfig = {
  legal: [
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Refund Policy", href: "/refund" }
  ],
  contact: {
    email: "eitalentsearch@ei.study",
    phone: "+91 80 4718 7451",
    hours: "Mon-Sat, 9AM-6PM"
  },
  social: {
    facebook: "https://www.facebook.com/ei.study1?paipv=0&eav=AfbAXgHoF06WUebnhDgwkMeJpM49oTL3l9OBdWc3OvRz59WNuG_UV9zxSPJypxKRc1w&_rdr",
    twitter: "https://twitter.com/i/flow/login?redirect_after_login=%2Feistudy1",
    linkedin: "https://www.linkedin.com/company/eistudy/mycompany/verification/",
    youtube: "https://www.youtube.com/user/eivideos"
  },
  company: {
    name: "Educational Initiatives Pvt Ltd",
    address: "The CUBE - Karle Town Center, Bengaluru, India",
    cin: "CIN: U80211GJ2000PTC038692103",
    copyright: "2025 Educational Initiatives Pvt Ltd. All rights reserved."
  }
}

// Additional footer-specific links not in main navigation
const additionalFooterLinks = {
  support: {
    title: "Support",
    links: [
      { name: "Schedule a Call", href: "/schedule-call" },
      { name: "Send Message", href: "/contact#send-message" },
      { name: "Contact Information", href: "/contact" },
      { name: "FAQ", href: "/#faq" }
    ]
  }
}

// Function to generate footer sitemap from navigation config
function generateFooterSitemap(navConfig: NavigationConfig): FooterSection[] {
  const footerSections: FooterSection[] = []
  
  // Convert navigation menus to footer sections
  Object.entries(navConfig).forEach(([key, menu]) => {
    // Skip certain pages from footer if needed
    if (key === 'contact') return // Contact has its own section
    
    const footerSection: FooterSection = {
      title: menu.title,
      links: []
    }
    
    // For Partners section, don't add "Overview" since we have individual partner links
    if (key !== 'programmes') {
      footerSection.links.push({
        name: "Overview",
        href: menu.href
      })
    }
    
    // Add section links (limit to most important ones for footer)
    // For Partners section, include all partners since they're all important
    const maxLinks = key === 'programmes' ? 10 : 6
    const importantSections = menu.sections.slice(0, maxLinks)
    importantSections.forEach(section => {
      // Skip sections that would create duplicates with "Overview"
      if (section.name === "Overview") return
      
      footerSection.links.push({
        name: section.name,
        href: section.href,
        external: section.external
      })
    })
    
    footerSections.push(footerSection)
  })
  
  // Add additional footer-specific sections
  footerSections.push(additionalFooterLinks.support)
  
  return footerSections
}

// Generate complete footer configuration
export function generateFooterConfig(): FooterConfig {
  return {
    sitemap: generateFooterSitemap(navigationMenus),
    legal: footerSpecificConfig.legal,
    contact: footerSpecificConfig.contact,
    social: footerSpecificConfig.social,
    company: footerSpecificConfig.company
  }
}

// Hook for getting footer config
export function useFooterConfig(): FooterConfig {
  return generateFooterConfig()
}

// Function to get specific footer section
export function getFooterSection(sectionName: string): FooterSection | undefined {
  const config = generateFooterConfig()
  return config.sitemap.find(section => 
    section.title.toLowerCase() === sectionName.toLowerCase()
  )
}

// Function to check if footer is in sync with navigation
export function checkFooterSync(): { inSync: boolean, issues: string[] } {
  const navConfig = navigationMenus
  const footerConfig = generateFooterConfig()
  const issues: string[] = []
  
  // Check if all navigation sections are represented in footer
  Object.entries(navConfig).forEach(([key, menu]) => {
    const footerSection = footerConfig.sitemap.find(section => 
      section.title === menu.title
    )
    
    if (!footerSection && key !== 'contact') {
      issues.push(`Missing footer section for "${menu.title}"`)
    }
  })
  
  return {
    inSync: issues.length === 0,
    issues
  }
}

// Export the generated footer configuration
export const footerConfig = generateFooterConfig() 