import chromium from "chrome-aws-lambda";

const generatePDFBuffer = async (htmlString: string): Promise<Buffer> => {
    let browser = null;

    try {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
            ignoreDefaultArgs: ["--disable-extensions"],
        });

        const page = await browser.newPage();

        await page.setContent(htmlString);

        return await page.pdf();
    } catch (error) {
        throw error;
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};

export default generatePDFBuffer;
