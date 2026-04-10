#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

const homeDir = os.homedir();
const repoRoot = path.join(__dirname, '..');

// ─────────────────────────────────────────────────────────────
// EDITOR PATHS
// Antigravity: ~/.gemini/antigravity/skills/<skill-name>/SKILL.md
// Each skill = its own subfolder containing SKILL.md
// ─────────────────────────────────────────────────────────────
const editors = {
    claude: path.join(homeDir, '.claude', 'skills', '3d-web-pro-max'),
    cursor: path.join(homeDir, '.cursor', 'rules'),
    windsurf: path.join(homeDir, '.windsurf', 'rules'),
    antigravity: path.join(homeDir, '.gemini', 'antigravity', 'skills', '3d-web-pro-max'),
    copilot: path.join(homeDir, '.github', 'copilot-instructions'),
    kiro: path.join(homeDir, '.kiro', 'rules'),
    codex: path.join(homeDir, '.codex', 'skills'),
    roocode: path.join(homeDir, '.roo', 'rules'),
    qoder: path.join(homeDir, '.qoder', 'rules'),
    gemini: path.join(homeDir, '.gemini', 'skills'),
    trae: path.join(homeDir, '.trae', 'rules'),
    opencode: path.join(homeDir, '.opencode', 'rules'),
    'continue': path.join(homeDir, '.continue', 'prompts'),
    kilocode: path.join(homeDir, '.kilocode', 'rules')
};

// Source SKILL.md inside cli/templates/
const sourceSkillPath = path.join(__dirname, 'templates', 'SKILL.md');

// Editors that need .mdc extension
const MDC_EDITORS = ['cursor', 'windsurf', 'trae', 'roocode'];

// Antigravity uses SKILL.md (not 3d-web-pro-max.md) inside a named subfolder
const ANTIGRAVITY_EDITORS = ['antigravity'];

function getFileName(editorName) {
    if (ANTIGRAVITY_EDITORS.includes(editorName)) return 'SKILL.md';
    if (MDC_EDITORS.includes(editorName)) return '3d-web-pro-max.mdc';
    return '3d-web-pro-max.md';
}

// INSTALL LOGIC
function installForEditor(editorName) {
    const targetFolder = editors[editorName];
    try {
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder, { recursive: true });
        }
        const targetFile = path.join(targetFolder, getFileName(editorName));
        fs.copyFileSync(sourceSkillPath, targetFile);
        console.log(`✅ [${editorName.toUpperCase()}] Installed → ${targetFile}`);
        return true;
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
            fs.unlinkSync(targetFile);
            console.log(`🗑️  [${editorName.toUpperCase()}] Removed → ${targetFile}`);
        } else {
            console.log(`⚪ [${editorName.toUpperCase()}] Not found, skipping.`);
        }
    } catch (error) {
        console.error(`❌ [${editorName.toUpperCase()}] Failed: ${error.message}`);
    }
}

// ── MAIN ──────────────────────────────────────────────────────
function main() {
    const args = process.argv.slice(2);

    // Pre-flight check for Install Commands
    if (args.includes('--all') || args.includes('--local')) {
        if (!fs.existsSync(sourceSkillPath)) {
            console.error('❌ CRITICAL: templates/SKILL.md not found!');
            console.error(`   Expected: ${sourceSkillPath}`);
            console.error('   Run this script from inside the cli/ folder, or ensure the templates folder exists.');
            process.exit(1);
        }
    }

    if (args.includes('--uninstall')) {
        console.log('\n🧹 Uninstalling 3D Web Pro Max from all AI editors...\n');
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