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
    antigravity: path.join(homeDir, '.antigravity', 'rules'),
    copilot: path.join(homeDir, '.github', 'copilot-instructions'), 
    kiro: path.join(homeDir, '.kiro', 'rules'),
    codex: path.join(homeDir, '.codex', 'skills'),
    roocode: path.join(homeDir, '.roo', 'rules'),
    qoder: path.join(homeDir, '.qoder', 'rules'),
    gemini: path.join(homeDir, '.gemini', 'skills'),
    trae: path.join(homeDir, '.trae', 'rules'),
    opencode: path.join(homeDir, '.opencode', 'rules'),     // <-- OpenCode is here!
    continue: path.join(homeDir, '.continue', 'prompts'),
    kilocode: path.join(homeDir, '.kilocode', 'rules')       // <-- KiloCode added here!
};

// Safely resolve the path to SKILL.md
const sourceSkillPath = path.join(__dirname, 'templates', 'SKILL.md');

function installForEditor(editorName) {
    const targetFolder = editors[editorName];
    
    try {
        // 1. Create the target directory if it doesn't exist
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, { recursive: true });
        }

        // 2. Define the output file name
        // Certain modern editors prefer .mdc extension for rules
        const mdcEditors = ['cursor', 'windsurf', 'trae', 'roocode'];
        const fileName = mdcEditors.includes(editorName) 
            ? '3d-web-pro-max.mdc' 
            : '3d-web-pro-max.md';

        const targetFile = path.join(targetFolder, fileName);
        
        // 3. Copy the file
        fs.copyFileSync(sourceSkillPath, targetFile);
        console.log(`✅ [${editorName.toUpperCase()}] Skill installed at: ${targetFile}`);
    } catch (error) {
        console.error(`❌ [${editorName.toUpperCase()}] Failed to install:`, error.message);
    }
}

// Main Execution Block
function main() {
    const args = process.argv.slice(2);

    console.log('\n🚀 Initializing 3D Web Pro Max Global AI Skills...\n');

    // Pre-flight check: Ensure SKILL.md actually exists before running
    if (!fs.existsSync(sourceSkillPath)) {
        console.error('❌ CRITICAL ERROR: Source file not found!');
        console.error(`Expected location: ${sourceSkillPath}`);
        console.log('Please make sure SKILL.md is placed inside the "templates" folder.');
        process.exit(1);
    }

    // Process arguments
    if (args.includes('--all')) {
        Object.keys(editors).forEach(installForEditor);
        console.log('\n🎉 Setup complete! You can now use /3d-web commands in your editors.\n');
    } else {
        console.log('⚠️  Usage: 3d-web-cli --all');
        console.log('Please run the command with the --all flag to install for all supported editors.\n');
    }
}

main();
