(function temp() {

    async function executeQueue(queue) {
        for (let task of queue) {
            await task(); // 等待当前任务完成
        }
    }

    // 创建填充表单任务
    function createTask(index) {
        return () => new Promise(resolve => {
            const iframes = document.querySelectorAll('iframe.tabsIframe-content-select');
            const parentElement = iframes[0].contentDocument.getElementById("pansoft-tabs-1");
            let tbody = parentElement.getElementsByTagName("tbody")[0]

            const element = tbody.children[index];
            const tax = element.children[19]
            if (tax) {
                tax.click()
                setTimeout(() => {
                    const editElment = tax.querySelector('div[name="F_SLBH_FMC"]')
                    editElment.setValue("01")
                    editElment.dispatchEvent(new Event('change', { bubbles: true}));
                    resolve()
                }, 300);

            }

        });
    }
    function createValueChangeTask(index) {
        return () => new Promise(resolve => {
            const iframes = document.querySelectorAll('iframe.tabsIframe-content-select');
            const parentElement = iframes[0].contentDocument.getElementById("pansoft-tabs-1");
            let tbody = parentElement.getElementsByTagName("tbody")[0]

            const element = tbody.children[index];
            let amount = element.children[14]
            if (amount) {
                amount.click()
                setTimeout(() => {
                amount.children[0].children[0].value = amount.children[0].children[0].value + "0"
                amount.children[0].children[0].dispatchEvent(new Event('change_value', { bubbles: true}));
                amount.children[0].children[0].dispatchEvent(new Event('keydown', { bubbles: true}));
                amount.children[0].children[0].dispatchEvent(new Event('keyup', { bubbles: true}));
                resolve()
                }, 200)
            }
        });
    }

    var fillQueue = []
    const iframes = document.querySelectorAll('iframe.tabsIframe-content-select');
    const parentElement = iframes[0].contentDocument.getElementById("pansoft-tabs-1");
    let tbody = parentElement.getElementsByTagName("tbody")[0]

    for (let index = 1; index <  tbody.children.length; index++) {
        // fillQueue.push(createTask(index))
        fillQueue.push(createValueChangeTask(index))
    }

    executeQueue(fillQueue);


})()