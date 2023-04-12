import { Given, When, Then } from '@wdio/cucumber-framework';
import BankListPage from '../../../features/pageobjects/banklist.page';

const bankPage = BankListPage;
const searchTerm = "west";

Given('the user is on the Failed Banks page', async function () {
    await bankPage.open();
    expect(browser).toHaveTitle('FDIC | Failed Bank List');
    browser.setWindowSize(1600, 900);
})

When('the user enters text into search box', async function () {
    await bankPage.search(searchTerm);
    await browser.pause(2000);
})

When('the user clicks a column header', async function () {
    await bankPage.sort();
})

When('the user clicks a page number', async function () {
    await bankPage.changePage(3);
})

Then('the data table only shows results that match text in search box', async function () {
    var result = await bankPage.checkTable(searchTerm)
    expect(result).toBeTruthy();
})

Then('the data table sorts the results according to selected column header', async function () {
    await browser.pause(4000);
    var s = await bankPage.checkSort();
    expect(s).toBeTruthy();
})

Then('the data table shows the results from that page', async function () {
    await browser.pause(4000);
    var result = await bankPage.checkPage();
    expect(result).toBeTruthy();
})

