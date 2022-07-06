/**
 * Combine component and style to html template
 * @param {string} component
 * @param {string} styleComponent
 * @return {string} The string of Completed Html Template
 */
const handleRender = (component: string, styleComponent: string): string => {
    const html = `
        <html>
            <head>
                ${styleComponent}
            </head>
            <body>
                <div id="root">${component}</div>
                <script src="bundle.js"></script>
            </body>
        </html>
    `;

    return html;
};

export default handleRender;
