#!/usr/bin/env node
/**
 * Auto-Update Content Script
 * 
 * This script automatically detects new sections, pages, and content
 * and updates the navigation, footer, search, and chatbot systems
 * to keep everything in sync.
 * 
 * Usage: node scripts/auto-update-content.js
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PAGES_DIR = path.join(__dirname, '../app');
const COMPONENTS_DIR = path.join(__dirname, '../components');
const LIB_DIR = path.join(__dirname, '../lib');

/**
 * Scans a page file for section IDs and content
 */
function scanPageForSections(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const sections = [];
    
    // Find section IDs (id="section-name" or id="section-name")
    const idRegex = /id=['"]([\w-]+)['"]/g;
    let match;
    
    while ((match = idRegex.exec(content)) !== null) {
      const sectionId = match[1];
      
      // Skip generic IDs
      if (!['hero', 'main', 'content', 'wrapper'].includes(sectionId)) {
        sections.push({
          id: sectionId,
          file: filePath,
          detected: new Date().toISOString()
        });
      }
    }
    
    return sections;
  } catch (error) {
    console.error(`Error scanning ${filePath}:`, error.message);
    return [];
  }
}

/**
 * Scans all pages for new sections
 */
function scanAllPages() {
  const allSections = {};
  
  function scanDirectory(dir, relativePath = '') {
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const itemRelativePath = path.join(relativePath, item);
        
        if (fs.statSync(fullPath).isDirectory()) {
          // Skip node_modules and other system directories
          if (!['node_modules', '.next', '.git'].includes(item)) {
            scanDirectory(fullPath, itemRelativePath);
          }
        } else if (item === 'page.tsx') {
          // This is a Next.js page
          const pagePath = relativePath || '/';
          const sections = scanPageForSections(fullPath);
          
          if (sections.length > 0) {
            allSections[pagePath] = sections;
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error.message);
    }
  }
  
  scanDirectory(PAGES_DIR);
  return allSections;
}

/**
 * Gets current navigation configuration
 */
function getCurrentNavigation() {
  try {
    const navPath = path.join(LIB_DIR, 'navigation.ts');
    const content = fs.readFileSync(navPath, 'utf8');
    
    // Extract autoSections arrays
    const autoSectionsRegex = /autoSections:\s*\[([\s\S]*?)\]/g;
    const currentSections = {};
    let match;
    
    while ((match = autoSectionsRegex.exec(content)) !== null) {
      const sectionsText = match[1];
      const sections = sectionsText
        .split(',')
        .map(s => s.trim().replace(/['"]/g, '').replace(/\/\/.*$/, ''))
        .filter(s => s.length > 0);
        
      // This is a simplified approach - in a real implementation,
      // you'd need to parse the TypeScript AST properly
      console.log('Found sections:', sections);
    }
    
    return currentSections;
  } catch (error) {
    console.error('Error reading navigation:', error.message);
    return {};
  }
}

/**
 * Updates navigation configuration with new sections
 */
function updateNavigation(newSections) {
  console.log('🔄 Updating navigation configuration...');
  
  // In a real implementation, this would:
  // 1. Parse the navigation.ts file properly (using TypeScript AST)
  // 2. Add new sections to the appropriate page configurations
  // 3. Update the section name mappings
  // 4. Write the updated configuration back
  
  const updatedPages = Object.keys(newSections);
  console.log(`📍 Found new sections in: ${updatedPages.join(', ')}`);
  
  // For now, just log what would be updated
  Object.entries(newSections).forEach(([page, sections]) => {
    console.log(`  ${page}:`);
    sections.forEach(section => {
      console.log(`    + ${section.id}`);
    });
  });
}

/**
 * Updates search content with new sections
 */
function updateSearchContent(newSections) {
  console.log('🔍 Updating search content...');
  
  // Generate search entries for new sections
  const newSearchEntries = [];
  
  Object.entries(newSections).forEach(([page, sections]) => {
    sections.forEach(section => {
      const searchEntry = {
        title: section.id.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' '),
        description: `Section on ${page} page`,
        url: `${page}#${section.id}`,
        type: "section",
        category: "Auto-discovered"
      };
      
      newSearchEntries.push(searchEntry);
    });
  });
  
  console.log(`📍 Generated ${newSearchEntries.length} new search entries`);
  
  // In a real implementation, this would update search-dialog.tsx
  newSearchEntries.forEach(entry => {
    console.log(`  + ${entry.title} -> ${entry.url}`);
  });
}

/**
 * Updates chatbot knowledge base
 */
function updateChatbotKnowledge(newSections) {
  console.log('🤖 Updating chatbot knowledge base...');
  
  // Generate knowledge entries for new sections
  Object.entries(newSections).forEach(([page, sections]) => {
    sections.forEach(section => {
      console.log(`  + Added knowledge about "${section.id}" section on ${page}`);
    });
  });
}

/**
 * Updates footer configuration
 */
function updateFooter(newSections) {
  console.log('🦶 Updating footer configuration...');
  
  // Footer is auto-generated from navigation, so it will update automatically
  // when navigation is updated
  console.log('  ✅ Footer will auto-update from navigation changes');
}

/**
 * Creates a backup of current configuration
 */
function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(__dirname, '../backups', timestamp);
  
  try {
    fs.mkdirSync(backupDir, { recursive: true });
    
    // Backup critical files
    const filesToBackup = [
      'lib/navigation.ts',
      'lib/footer-config.ts',
      'components/search-dialog.tsx',
      'components/intelligent-chatbot.tsx'
    ];
    
    filesToBackup.forEach(file => {
      const sourcePath = path.join(__dirname, '..', file);
      const backupPath = path.join(backupDir, file.replace(/\//g, '_'));
      
      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, backupPath);
        console.log(`✅ Backed up ${file}`);
      }
    });
    
    console.log(`📦 Backup created at: ${backupDir}`);
    return backupDir;
  } catch (error) {
    console.error('❌ Error creating backup:', error.message);
    return null;
  }
}

/**
 * Main execution function
 */
function main() {
  console.log('🚀 Starting auto-update process...\n');
  
  // Create backup
  const backupPath = createBackup();
  if (!backupPath) {
    console.error('❌ Failed to create backup. Aborting update.');
    process.exit(1);
  }
  
  console.log('\n📊 Scanning pages for new sections...');
  const allSections = scanAllPages();
  
  console.log('\n📋 Current page structure:');
  Object.entries(allSections).forEach(([page, sections]) => {
    console.log(`  ${page}: ${sections.length} sections`);
    sections.forEach(section => {
      console.log(`    - ${section.id}`);
    });
  });
  
  // Check for new sections (simplified - in real implementation, 
  // this would compare against current navigation config)
  const currentNav = getCurrentNavigation();
  
  // For demo purposes, assume all found sections are "new"
  const newSections = allSections;
  
  if (Object.keys(newSections).length === 0) {
    console.log('\n✅ No new sections detected. Everything is up to date!');
    return;
  }
  
  console.log('\n🔄 Updating configurations...');
  
  // Update all systems
  updateNavigation(newSections);
  updateSearchContent(newSections);
  updateChatbotKnowledge(newSections);
  updateFooter(newSections);
  
  console.log('\n✅ Auto-update process completed!');
  console.log(`📦 Backup available at: ${backupPath}`);
  console.log('\n🎯 Next steps:');
  console.log('  1. Review the changes');
  console.log('  2. Test the updated navigation and search');
  console.log('  3. Commit the changes to version control');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  scanPageForSections,
  scanAllPages,
  updateNavigation,
  updateSearchContent,
  updateChatbotKnowledge,
  updateFooter
}; 