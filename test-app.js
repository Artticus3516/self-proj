const { spawn } = require('child_process');
const { chromium } = require('@playwright/test');

async function run() {
  console.log('Starting dev server...');
  const server = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'dev'], {
    stdio: 'pipe',
    shell: true
  });

  let serverReady = false;
  server.stdout.on('data', (data) => {
    const output = data.toString();
    console.log('[SERVER]', output.trim());
    if (output.includes('Ready in') || output.includes('started server on') || output.includes('Local:')) {
      serverReady = true;
    }
  });

  server.stderr.on('data', (data) => {
    console.error('[SERVER ERR]', data.toString().trim());
  });

  // wait up to 15s for server to start
  for (let i = 0; i < 30; i++) {
    if (serverReady) break;
    await new Promise(r => setTimeout(r, 500));
  }

  console.log('Server is assumed ready. Launching browser...');
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const logs = [];
  page.on('console', msg => {
    logs.push(`[BROWSER ${msg.type()}] ${msg.text()}`);
  });
  page.on('pageerror', err => {
    logs.push(`[BROWSER ERROR] ${err.message}`);
  });

  console.log('Navigating to http://localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000); // wait for animations
  } catch (err) {
    console.log('Navigation failed:', err.message);
  }

  console.log('--- BROWSER LOGS ---');
  logs.forEach(l => console.log(l));
  console.log('--------------------');

  await browser.close();
  server.kill('SIGINT');
  console.log('Done.');
}

run();
