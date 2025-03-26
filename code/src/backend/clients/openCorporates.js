

import { chromium } from 'playwright';

const getDetails = async (name) => {
    // Step 1: Launch browser
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Step 2: Go to OpenCorporates
    await page.goto('https://opencorporates.com/');

    // Step 3: Search for the company
    const searchBox = await page.waitForSelector('.oc-home-search_input.js-oc-search-input');
    await searchBox.fill(name); // Change this to your variable
    await page.keyboard.press('Enter');

    // Wait for results to load
    await page.waitForTimeout(3000);

    // Step 4: Click the "Exclude Inactive" checkbox
    const excludeInactiveCheckbox = await page.waitForSelector('input[type="checkbox"]');
    await excludeInactiveCheckbox.check();

    // Click "Go" button
    const goButton = await page.waitForSelector('input[value="Go"]');
    await goButton.click();

    // Wait for the new search results to load
    await page.waitForTimeout(3000);

    // Step 5: Click the first search result
    const firstResult = await page.waitForSelector('#companies li.search-result a.company_search_result');
    await firstResult.click();

    // Wait for entity details page to load
    await page.waitForTimeout(3000);

    // Step 6: Extract company details
    //change the format
    const companyDetails = await page.evaluate(() => {
        const data = {};
        data.name = document.querySelector('h1')?.innerText.trim();
        data.companyNumber = document.querySelector('.company_number')?.innerText.trim();
        data.status = document.querySelector('.status')?.innerText.trim();
        // data.incorporationDate = document.querySelector('.incorporation_date a')?.innerText.trim() || 'Login required';
        data.companyType = document.querySelector('.company_type')?.innerText.trim();
        data.jurisdiction = document.querySelector('.jurisdiction a')?.innerText.trim();
        data.agentName = document.querySelector('.agent_name')?.innerText.trim();
        data.agentAddress = document.querySelector('.agent_address')?.innerText.trim();
        // data.officers = document.querySelector('.officers.trunc8 a')?.innerText.trim() || 'Login required';

        return JSON.stringify(data, null, 2);
    });


    console.log("Extracted Company Details:", companyDetails);

    // Close browser
    await browser.close();

    return companyDetails;
}

getDetails('Apple Inc');

export default { getDetails }