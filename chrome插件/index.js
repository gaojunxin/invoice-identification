function start() {
    let value = document.getElementById("area").value
    if(!value){
        alert("配置内容不能为空")
        return;
    }
    try {
        let content = JSON.parse(value);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "fillForm", data: content}, function(resp) {
                console.log(resp);
            }); 
        });
        console.log(value)
    } catch (error) {
        alert("json格式错误")
        return
    }

}



document.getElementById('ok_button').addEventListener('click', function() {
    start();
});