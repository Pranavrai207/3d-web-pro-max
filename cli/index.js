#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Platform-independent home directory
const homeDir = os.homedir();

// Supported AI Editors and their target directories
const editors = {
    claude: path.join(homeDir, '.claude', 'skills', '3d-web-pro-max'),
    cursor: path.join(homeDir, '.cursor', 'rules'),
    windsurf: path.join(homeDir, '.windsurf', 'rules'),
    antigravity: path.join(homeDir, '.antigravity', 'skills'), // Updated to skills!
    copilot: path.join(homeDir, '.github', 'copilot-instructions'), 
    kiro: path.join(homeDir, '.kiro', 'rules'),
    codex: path.join(homeDir, '.codex', 'skills'),
    roocode: path.join(homeDir, '.roo', 'rules'),
    qoder: path.join(homeDir, '.qoder', 'rules'),
    gemini: path.join(homeDir, '.gemini', 'skills'),
    trae: path.join(homeDir, '.trae', 'rules'),
    opencode: path.join(homeDir, '.opencode', 'rules'),
    continue: path.join(homeDir, '.continue', 'prompts'),
    kilocode: path.join(homeDir, '.kilocode', 'rules')
};

// Safely resolve the path to SKILL.md
const sourceSkillPath = path.join(__dirname, 'templates', 'SKILL.md');

// Helper to get the correct filename for the editor
function getFileName(editorName) {
    const mdcEditors = ['cursor', 'windsurf', 'trae', 'roocode'];
    return mdcEditors.includes(editorName) ? '3d-web-pro-max.mdc' : '3d-web-pro-max.md';
}

// INSTALL LOGIC
function installForEditor(editorName) {
    const targetFolder = editors[editorName];
    try {
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, { recursive: true });
        }
        const targetFile = path.join(targetFolder, getFileName(editorName));
        fs.copyFileSync(sourceSkillPath, targetFile); // This safely OVERWRITES existing files
        console.log(`✅ [${editorName.toUpperCase()}] Skill installed at: ${targetFile}`);
    } catch (error) {
        console.error(`❌ [${editorName.toUpperCase()}] Failed to install:`, error.message);
    }
}

// UNINSTALL LOGIC
function uninstallForEditor(editorName) {
    const targetFolder = editors[editorName];
    const targetFile = path.join(targetFolder, getFileName(editorName));
    
    try {
        if (fs.existsSync(targetFile)) {
            fs.unlinkSync(targetFile); // Deletes the file
            console.log(`🗑️  [${editorName.toUpperCase()}] Skill removed from: ${targetFile}`);
        }
    } catch (error) {
        console.error(`❌ [${editorName.toUpperCase()}] Failed to remove:`, error.message);
    }
}

// Main Execution Block
function main() {
    const args = process.argv.slice(2);

    if (args.includes('--uninstall')) {
        console.log('\n🧹 Uninstalling 3D Web Pro Max Global AI Skills...\n');
        Object.keys(editors).forEach(uninstallForEditor);
        console.log('\n✨ Uninstallation complete! All skill files have been removed.\n');
        return;
    }

    if (args.includes('--all')) {
        console.log('\n🚀 Initializing 3D Web Pro Max Global AI Skills...\n');
        if (!fs.existsSync(sourceSkillPath)) {
            console.error('❌ CRITICAL ERROR: Source file not found!');
            console.error(`Expected location: ${sourceSkillPath}`);
            process.exit(1);
        }
        Object.keys(editors).forEach(installForEditor);
        console.log('\n🎉 Setup complete! You can now use /3d-web commands in your editors.\n');
        return;
    }

    // If no valid arguments provided
    console.log('⚠️  Usage commands:');
    console.log('  3d-web-cli --all       (To install for all supported editors)');
    console.log('  3d-web-cli --uninstall (To remove from all supported editors)\n');
}

main();
