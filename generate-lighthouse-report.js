const lighthouse = require('lighthouse');
const { launch } = require('puppeteer');

// URL of the website you want to audit
const url = 'https://nodejs.org';

(async () => {
  // Launch a headless Chrome instance with Puppeteer
  const browser = await launch();

  // Run Lighthouse audit
  const { lhr } = await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json', // Output format
  });

  // Save the Lighthouse report as a JSON file
  const fs = require('fs');
  fs.writeFileSync('lighthouse-report.json', JSON.stringify(lhr, null, 2));

  // Close the browser
  await browser.close();

  console.log('Lighthouse report generated successfully!');
})().catch((error) => {
  console.error('Lighthouse audit failed:', error);
});
