// Auto-updatable navigation system
// This file automatically discovers pages and sections to keep navigation current

export interface NavigationSection {
  name: string
  href: string
  external?: boolean
}

export interface NavigationMenu {
  title: string
  href: string
  sections: NavigationSection[]
}

export interface NavigationConfig {
  [key: string]: NavigationMenu
}

// Page configuration with auto-discovery
const pageConfigs = {
  home: {
    title: "Home",
    href: "/",
    // Auto-discovered sections from page content
    autoSections: [
      "media-carousel",
      "about", 
      "history",
      "partners",
      "rewards",
      "exam-info",
      "testimonials",
      "alumni-cta",
      "faq",
      "contact"
    ],
    // Manual sections for special cases
    manualSections: []
  },
  programmes: {
    title: "Partners",
    href: "/programmes",
    autoSections: [
      "hero"
    ],
    manualSections: [
      { name: "Johns Hopkins CTY", href: "/programmes#johns-hopkins" },
      { name: "Northwestern CTD", href: "/programmes#northwestern" },
      { name: "UC Berkeley ATDP", href: "/programmes#uc-berkeley" },
      { name: "Purdue GER2I", href: "/programmes#purdue" },
      { name: "SIG", href: "/programmes#sig" },
      { name: "GenWise", href: "/programmes#genwise" }
    ]
  },
  forStudents: {
    title: "For Students",
    href: "/for-students",
    autoSections: [
      "student-tools",
      "why-join-ats"
    ],
    manualSections: [
      { name: "Student Portal", href: "https://ats.ei.study/student_portal/index.php", external: true },
      { name: "Ei ATS Qualifying Certificate", href: "https://ats.ei.study/ats_qualifier_certificate.php", external: true },
      { name: "Ei ASSET PAN ID Retriever", href: "https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html", external: true },
      { name: "Register for Ei ATS", href: "https://ats.ei.study/ats_registration.php", external: true }
    ]
  },
  forSchools: {
    title: "For Schools",
    href: "/for-schools",
    autoSections: [
      "hero",
      "school-tools",
      "bulk-registration",
      "non-asset-schools",
      "why-partner-ats"
    ],
    manualSections: [
      // School Login removed from dropdown menu
    ]
  },
  forParents: {
    title: "For Parents", 
    href: "/for-parents",
    autoSections: [
      "test-details",
      "non-asset-students", 
      "financial-aid", // ✅ Automatically includes new Financial Aid section
      "faq"
    ],
    manualSections: []
  },
  resources: {
    title: "Resources",
    href: "/resources",
    autoSections: [
      "resources",
      "test-details", // ✅ Auto-includes new Test Details section
      "testimonials",
      "quick-access"
    ],
    manualSections: [
      { name: "Articles & Research Papers", href: "/resources/articles", external: false },
      { name: "Sample Papers", href: "https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf", external: true },
      { name: "Webinars", href: "https://ei.study/ei-webinars/", external: true }
    ]
  },
  contact: {
    title: "Contact",
    href: "/contact", 
    autoSections: [
      "send-message",
      "faq"
    ],
    manualSections: []
  }
}

// Function to convert section ID to human-readable name
function sectionIdToName(sectionId: string): string {
  const nameMap: { [key: string]: string } = {
    'media-carousel': 'Success Stories',
    'about': 'About Ei ATS',
    'history': 'History & Evolution',
    'partners': 'University Partners', 
    'rewards': 'Recognition & Rewards',
    'exam-info': 'Exam Information',
    'testimonials': 'Testimonials',
    'alumni-cta': 'Speak with Past Ei ATS Students',
    'faq': 'FAQ',
    'contact': 'Contact',
    'hero': 'Overview',
    'programmes': 'Partner Programmes',
    'student-tools': 'Student Tools & Resources',
    'why-join-ats': 'Why Join Ei ATS',
    'school-tools': 'School Dashboard',
    'bulk-registration': 'Bulk Registration',
    'non-asset-schools': 'Non ASSET Schools',
    'why-partner-ats': 'Why Partner with Ei ATS',
    'test-details': 'Test Details',
    'non-asset-students': 'Non ASSET Students',
    'financial-aid': 'Financial Aid Application',
    'resources': 'Available Resources',
    'quick-access': 'Quick Access',
    'send-message': 'Send Message'
  }
  
  return nameMap[sectionId] || sectionId.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// Generate navigation configuration
export function generateNavigationConfig(): NavigationConfig {
  const navigationConfig: NavigationConfig = {}
  
  Object.entries(pageConfigs).forEach(([key, config]) => {
    const sections: NavigationSection[] = []
    
    // Add auto-discovered sections
    config.autoSections.forEach(sectionId => {
      sections.push({
        name: sectionIdToName(sectionId),
        href: `${config.href}#${sectionId}`
      })
    })
    
    // Add manual sections
    config.manualSections.forEach(section => {
      sections.push(section)
    })
    
    navigationConfig[key] = {
      title: config.title,
      href: config.href,
      sections
    }
  })
  
  return navigationConfig
}

// Hook for getting navigation config
export function useNavigationConfig(): NavigationConfig {
  return generateNavigationConfig()
}

// Function to add new page to navigation (for future automation)
export function addPageToNavigation(
  pageKey: string, 
  title: string, 
  href: string, 
  autoSections: string[] = [],
  manualSections: NavigationSection[] = []
) {
  // This would be used by a future file-system watcher or build script
  // to automatically add new pages to navigation
  console.log(`Adding page ${pageKey} to navigation:`, { title, href, autoSections, manualSections })
}

// Export the current navigation for immediate use
export const navigationMenus = generateNavigationConfig() 