// content.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fillForm') {
        fillForm(message.data)
    }

});

function fillForm(data) {

    async function executeQueue(queue) {
        for (let task of queue) {
            await task(); // 等待当前任务完成
        }
    }

    function getParentElement() {
        const iframes = document.querySelectorAll('iframe.tabsIframe-content-select');
        return iframes[0].contentDocument.getElementById("pansoft-tabs-1");
    }
    // 创建填充表单任务
    function createFillFormTask(id, rowData) {
        return () => new Promise(resolve => {
            const parentElement = getParentElement();

            // 在 parentElement 下查找 id 为 btn_1 的子元素
            const targetElement = parentElement.querySelector("#btn_1");

            if (targetElement) {
                targetElement.click()
            } else {
                console.log('Element not found.');
            }

            setTimeout(() => {
                let tbody = parentElement.getElementsByTagName("tbody")[0]
                let item = tbody.lastChild

                let billtype = item.children[4]
                if (billtype) {
                    billtype.click()
                    billtype.children[0].children[0].value = rowData['发票类型']
                }

                let billdate = item.children[9]
                if (billdate) {
                    billdate.click()
                    billdate.children[0].children[0].value = rowData['日期']
                }

                let billaddr = item.children[10]
                if (billaddr) {
                    billaddr.click()
                    billaddr.children[0].children[0].value = rowData['地点']
                }

                const tax = item.children[19]
                if (tax) {
                    tax.click()
                    const editElment = tax.querySelector('div[name="F_SLBH_FMC"]')
                    setTimeout(() => {
                        editElment.value = rowData['税率编号']
                        editElment.dispatchEvent(new Event('change', { bubbles: true}));
                    }, 100);
                    
                }

                let amount = item.children[14]
                if (amount) {
                    amount.click()
                    amount.children[0].children[0].value = rowData['金额']
                }

                let invoiceNumber = item.children[15]
                if (invoiceNumber) {
                    invoiceNumber.click()
                    invoiceNumber.children[0].children[0].value = rowData['发票号码']
                }

                let invoiceCode = item.children[16]
                if (invoiceCode) {
                    invoiceCode.click()
                    invoiceCode.children[0].children[0].value = rowData['发票代码']
                }

                let note = item.children[24]
                if (note) {
                    note.click()
                    note.children[0].children[0].value = rowData['备注']
                }
                resolve();

            }, 300)
        });
    }

    var fillQueue = []
    for (let index = 0; index < data.length; index++) {
        fillQueue.push(createFillFormTask(index, data[index]))
    }

    executeQueue(fillQueue);
}