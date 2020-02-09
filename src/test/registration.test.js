const puppeteer = require('puppeteer');

const TestRunner = require("jest-runner");

const timeout = 50000;

describe("Prueba Registro", () => {
    test('Vacio', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 35
        });
        const page = await browser.newPage();
        await page.goto(URL);
        await page.waitForSelector('form');
        await page.click('button');
        let errormesage = await page.waitForSelector('div.invalid-feedback');
        expect(errormesage).toBeDefined();
        await page.screenshot({
            path: 'imagestest/PruebaCamposVacios.png'
        });
        await browser.close();
    }, timeout);

    test('Validar todos los campos', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 35
        });
        const page = await browser.newPage();
        await page.goto(URL);
        await page.waitForSelector('form');
        await page.click('input[formcontrolname = firstName]');
        await page.type('input[formcontrolname = firstName]', '');
        await page.click('input[formcontrolname = lastName]');
        await page.type('input[formcontrolname = lastName]', 'Doe');
        await page.click('input[formcontrolname = username]');
        await page.type('input[formcontrolname = username]', 'userdoe');
        await page.click('input[formcontrolname = password]');
        await page.type('input[formcontrolname = password]', '123456abc');
        await page.click('button');
        let errormesage = await page.waitForSelector('div.invalid-feedback');
        expect(errormesage).toBeDefined();        
        await page.screenshot({
            path: 'imagestest/PruebaCamposCompletos.png'
        });
        await browser.close();
    }, timeout);

    test('Longitud de Password', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 35
        });
        const page = await browser.newPage();
        await page.goto(URL);
        await page.waitForSelector('form');
        await page.click('input[formcontrolname = firstName]');
        await page.type('input[formcontrolname = firstName]', 'Jhon');
        await page.click('input[formcontrolname = lastName]');
        await page.type('input[formcontrolname = lastName]', 'Doe');
        await page.click('input[formcontrolname = username]');
        await page.type('input[formcontrolname = username]', 'jdoe');
        await page.click('input[formcontrolname = password]');
        await page.type('input[formcontrolname = password]', '12345');
        await page.click('button');
        let errormesage = await page.waitForSelector('div.invalid-feedback');
        expect(errormesage).toBeDefined();        
        await page.screenshot({
            path: 'imagestest/PruebaLongitudPassword.png'
        });
        await browser.close();
    }, timeout);

    test('Registro Exitoso', async () => {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 35
        });
        const page = await browser.newPage();
        await page.goto(URL);
        await page.waitForSelector('form');
        await page.click('input[formcontrolname = firstName]');
        await page.type('input[formcontrolname = firstName]', 'Jhon');
        await page.click('input[formcontrolname = lastName]');
        await page.type('input[formcontrolname = lastName]', 'Doe');
        await page.click('input[formcontrolname = username]');
        await page.type('input[formcontrolname = username]', 'jdoe');
        await page.click('input[formcontrolname = password]');
        await page.type('input[formcontrolname = password]', '123456abc');
        await page.click('button');
        //let successpage = await page.waitForResponse('https://angular-6-registration-login-example.stackblitz.io/login');
        let successmessage = await Promise.all([page.waitForNavigation()]);
        expect(successmessage).toBeDefined();        
        await page.screenshot({
            path: 'imagestest/PruebaRegistroExitoso.png'
        });
        await browser.close();
    }, timeout);

    
});