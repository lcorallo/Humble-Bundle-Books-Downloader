console.clear();

let timeStart = Date.now();
let i = 0;
let j = 0;

const dots = [".", "..", "..."]
const TEXT = prompt("Which file do you want to download (one type of: 'PDF', 'MOBI', 'EPUB')");
const TIME = prompt("Lets your browser work for a total of (ms):", 4000);

const subproductsHolder = document.getElementsByClassName("column subproducts-holder js-subproducts-holder")[0].children;

const outputLoading = () => {
    console.clear()
    console.info("Wait, I'm getting your book 🥸");
    console.info("Loading"+dots[i%3])
    console.info("Total Downloads: "+j)
    console.info("-------------------------------");
}

const letBrowserWork = async () => new Promise(resolve => setTimeout(resolve, TIME))

const downloadFile = async (btn) => btn.click()

const processBook = async (book) => {
    outputLoading()
    book.click();
    const section = document.getElementsByClassName("column details-column js-details-column")[0].children[0].children[0].children[0].children[2].children;
    const lastSectionElement = section[section.length - 1];

    if (lastSectionElement !== undefined && lastSectionElement.innerText.includes(TEXT)) {
        for (const c of lastSectionElement.children) {
            if (c.innerText.includes(TEXT)) {
                downloadFile(c.children[0])
                await letBrowserWork();
                j += 1;
            }
        }
    }
    i += 1;
}

const main = async () => {
    for (const book of subproductsHolder) {
        await processBook(book);
    }

    console.clear();
    console.info("Operation success! ✅");
    console.info("Total book checked: " + i + "; 🔍 \nTotal Download (" + TEXT + "): " + j + "; ⬇️");
	console.info(`Execution time: ${Math.floor((Date.now()-timeStart) / 1000)} seconds ⌛️`)
}

main();
