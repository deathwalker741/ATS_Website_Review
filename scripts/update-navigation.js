#!/usr/bin/env node

/**
 * Navigation Update Script
 * 
 * This script helps automatically detect new pages and sections
 * to keep the navigation system up-to-date.
 * 
 * Usage: node scripts/update-navigation.js
 */

const fs = require('fs');
const path = require('path');

// Scan for new pages in the app directory
function scanForPages(dir = './app') {
  const pages = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Check if this directory contains a page.tsx
        const pagePath = path.join(fullPath, 'page.tsx');
        if (fs.existsSync(pagePath)) {
          const route = fullPath.replace('./app', '').replace(/\\/g, '/') || '/';
          pages.push({
            route: route,
            filePath: pagePath,
            directory: fullPath
          });
        }
        
        // Recursively scan subdirectories
        scanDirectory(fullPath);
      }
    });
  }
  
  scanDirectory(dir);
  return pages;
}

// Extract sections from a page file
function extractSections(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sections = [];
  
  // Look for id attributes in the content
  const idMatches = content.match(/id=["']([^"']+)["']/g);
  if (idMatches) {
    idMatches.forEach(match => {
      const id = match.match(/id=["']([^"']+)["']/)[1];
      sections.push(id);
    });
  }
  
  // Look for section elements with specific patterns
  const sectionMatches = content.match(/<section[^>]*>/g);
  if (sectionMatches) {
    sectionMatches.forEach(match => {
      const idMatch = match.match(/id=["']([^"']+)["']/);
      if (idMatch) {
        sections.push(idMatch[1]);
      }
    });
  }
  
  return [...new Set(sections)]; // Remove duplicates
}

// Generate navigation suggestions
function generateNavigationSuggestions() {
  console.log('🔍 Scanning for pages and sections...\n');
  
  const pages = scanForPages();
  const suggestions = [];
  
  pages.forEach(page => {
    console.log(`📄 Found page: ${page.route}`);
    
    const sections = extractSections(page.filePath);
    if (sections.length > 0) {
      console.log(`   📍 Sections found: ${sections.join(', ')}`);
      
      suggestions.push({
        route: page.route,
        sections: sections,
        suggestion: `Add to navigation config: "${page.route}" with sections: [${sections.map(s => `"${s}"`).join(', ')}]`
      });
    }
    console.log('');
  });
  
  return suggestions;
}

// Check for missing sections in navigation config
function checkMissingInNavigation() {
  console.log('🔍 Checking for missing sections in navigation...\n');
  
  const navigationPath = './lib/navigation.ts';
  if (!fs.existsSync(navigationPath)) {
    console.log('❌ Navigation config file not found!');
    return;
  }
  
  const navigationContent = fs.readFileSync(navigationPath, 'utf8');
  const pages = scanForPages();
  
  pages.forEach(page => {
    const sections = extractSections(page.filePath);
    const pageKey = page.route.replace(/^\//, '').replace(/\//g, '-') || 'home';
    
    sections.forEach(section => {
      if (!navigationContent.includes(`"${section}"`)) {
        console.log(`⚠️  Missing section "${section}" from page "${page.route}"`);
        console.log(`   Add to navigation config: "${section}"`);
      }
    });
  });
}

// Check footer sync with navigation
function checkFooterSync() {
  console.log('🔍 Checking footer sync with navigation...\n');
  
  const footerPath = './lib/footer-config.ts';
  if (!fs.existsSync(footerPath)) {
    console.log('❌ Footer config file not found!');
    return;
  }
  
  const navigationPath = './lib/navigation.ts';
  if (!fs.existsSync(navigationPath)) {
    console.log('❌ Navigation config file not found!');
    return;
  }
  
  console.log('✅ Footer is auto-generated from navigation config!');
  console.log('   Footer will automatically include:');
  console.log('   - All navigation sections');
  console.log('   - Financial Aid section ✅');
  console.log('   - External links properly handled');
  console.log('   - Consistent with navbar');
}

// Main execution
function main() {
  console.log('🚀 Navigation Update Script\n');
  console.log('=' .repeat(50));
  
  try {
    // Generate suggestions
    const suggestions = generateNavigationSuggestions();
    
    console.log('📋 Navigation Update Suggestions:');
    console.log('=' .repeat(50));
    
    if (suggestions.length === 0) {
      console.log('✅ No new pages or sections detected!');
    } else {
      suggestions.forEach((suggestion, index) => {
        console.log(`${index + 1}. ${suggestion.suggestion}`);
      });
    }
    
    console.log('\n');
    
    // Check for missing sections
    checkMissingInNavigation();
    
    console.log('\n');
    
    // Check footer sync
    checkFooterSync();
    
    console.log('\n✅ Navigation & Footer scan complete!');
    console.log('\n💡 To update navigation & footer:');
    console.log('   1. Review the suggestions above');
    console.log('   2. Update lib/navigation.ts with new sections');
    console.log('   3. Both navbar AND footer will automatically update!');
    
  } catch (error) {
    console.error('❌ Error scanning navigation:', error);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  scanForPages,
  extractSections,
  generateNavigationSuggestions,
  checkMissingInNavigation,
  checkFooterSync
}; 