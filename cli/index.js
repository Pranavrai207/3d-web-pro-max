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

// ── INSTALL ───────────────────────────────────────────────────
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
        console.error(`❌ [${editorName.toUpperCase()}] Failed: ${error.message}`);
        return false;
    }
}

// ── UNINSTALL ─────────────────────────────────────────────────
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

    if (args.includes('--uninstall')) {
        console.log('\n🧹 Uninstalling 3D Web Pro Max from all AI editors...\n');
        Object.keys(editors).forEach(uninstallForEditor);
        console.log('\n✨ Uninstall complete!\n');
        return;
    }

    if (args.includes('--all')) {
        console.log('\n🚀 Installing 3D Web Pro Max to all supported AI editors...\n');

        if (!fs.existsSync(sourceSkillPath)) {
            console.error('❌ CRITICAL: templates/SKILL.md not found!');
            console.error(`   Expected: ${sourceSkillPath}`);
            console.error('   Run this script from inside the cli/ folder.');
            process.exit(1);
        }

        let passed = 0;
        let failed = 0;
        Object.keys(editors).forEach(editorName => {
            installForEditor(editorName) ? passed++ : failed++;
        });

        console.log('\n' + '─'.repeat(60));
        console.log(`🎉 Done! ${passed} installed, ${failed} failed.`);
        console.log('─'.repeat(60));
        console.log('\n📌 Antigravity IDE → restart IDE, then type: /3d-web-pro-max');
        console.log('📌 Claude / Cursor / others → skill is active automatically\n');
        return;
    }

    console.log('\n⚠️  Usage:\n');
    console.log('   node index.js --all         Install to all supported editors');
    console.log('   node index.js --uninstall   Remove from all editors');
    console.log('\n   Must be run from inside the cli/ folder.\n');
}

main();