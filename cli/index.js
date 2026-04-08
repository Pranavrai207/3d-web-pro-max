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

// ── GLOBAL INSTALL ────────────────────────────────────────────
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

// ── LOCAL INSTALL (For Project Workspaces) ────────────────────
function installLocal() {
    const currentDir = process.cwd();
    console.log(`\n📂 Installing locally in current project: ${currentDir}\n`);

    // Editors that officially support workspace-level rules
    const localPaths = {
        cursor: path.join(currentDir, '.cursor', 'rules'),
        windsurf: path.join(currentDir, '.windsurf', 'rules'),
        trae: path.join(currentDir, '.trae', 'rules'),
        roocode: path.join(currentDir, '.roo', 'rules')
    };

    let passed = 0;
    Object.keys(localPaths).forEach(editorName => {
        const targetFolder = localPaths[editorName];
        const targetFile = path.join(targetFolder, '3d-web-pro-max.mdc');

        try {
            if (!fs.existsSync(targetFolder)) {
                fs.mkdirSync(targetFolder, { recursive: true });
            }
            fs.copyFileSync(sourceSkillPath, targetFile);
            console.log(`✅ [${editorName.toUpperCase()} LOCAL] Installed → ${targetFile}`);
            passed++;
        } catch (error) {
            console.error(`❌ [${editorName.toUpperCase()} LOCAL] Failed: ${error.message}`);
        }
    });

    console.log('\n' + '─'.repeat(60));
    console.log(`🎉 Local install complete! Added to ${passed} workspace folders.`);
    console.log(`💡 You can now see the skill in the '@' menu in Cursor/Windsurf.`);
    console.log(`📌 Don't forget to commit these files to your GitHub repo!`);
    console.log('─'.repeat(60) + '\n');
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
        console.log('\n✨ Uninstall complete!\n');
        return;
    }

    if (args.includes('--local')) {
        installLocal();
        return;
    }

    if (args.includes('--all')) {
        console.log('\n🚀 Installing 3D Web Pro Max globally to all supported AI editors...\n');
        let passed = 0;
        let failed = 0;
        Object.keys(editors).forEach(editorName => {
            installForEditor(editorName) ? passed++ : failed++;
        });

        console.log('\n' + '─'.repeat(60));
        console.log(`🎉 Done! ${passed} installed globally, ${failed} failed.`);
        console.log('─'.repeat(60));
        console.log('\n📌 Antigravity IDE → restart IDE, then type: /3d-web-pro-max');
        console.log('📌 Cursor / Windsurf → active globally in background. (Use --local for @ menu)\n');
        return;
    }

    console.log('\n⚠️  Usage:\n');
    console.log('   node index.js --all         Global install to all supported editors');
    console.log('   node index.js --local       Local install for Cursor/Windsurf (enables @ menu)');
    console.log('   node index.js --uninstall   Remove from all global editor paths\n');
}

main();
