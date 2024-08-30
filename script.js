const content = document.querySelector(".list-container");
const btn = document.querySelector("#btn");
const inputBox = document.querySelector('#input-box');
const hint = document.querySelector('#hint');

// 利用事件冒泡做到每個li都有toggle
content.addEventListener('click', (e)=>{
    console.log(e.target.tagName,e.target.classList[0]);
    if(e.target.tagName === 'LI'){//check
        console.log("列表被點擊:",e.target.textContent);
        e.target.classList.toggle("checked");
    }else if(e.target.classList[0] === 'delete'){//delete
        const li = e.target.parentNode;
        console.log(e.target.parentNode.id);
        li.remove();
    }else if(e.target.classList[0] === 'edit'){//edit
        let text = prompt("任務需要修改為?");
        if(text != null){
            const li = e.target.parentNode;
    
            li.innerHTML = `${text}<span class="edit">✎</span><span class="delete">✖</span>`;
            alert("修改完成！");
        }else{
            alert("已取消修改！");
        }
    }
    saveTasks();
});

btn.addEventListener('click', (e)=>{
    let newItem = document.createElement('li');
    let inputText = inputBox.value.trim();
    if (inputText != ''){
        let edit = document.createElement('span');  
        edit.classList.add("edit");
        edit.textContent = '✎';
        let del = document.createElement('span');    
        del.classList.add("delete");
        del.textContent = '✖';
        
        newItem.textContent = inputText;//先把文字加入再加span
        newItem.appendChild(edit);
        newItem.appendChild(del);
        
        inputBox.value = '';
        content.appendChild(newItem);
        saveTasks();
    }else{
        hint.style.display = "block";
        setTimeout(()=>{
            hint.style.display = "none";            
        },3000);
    }
});

function saveTasks(){
    localStorage.setItem("data",content.innerHTML);
    console.log("save");
}

function showTasks(){
    content.innerHTML = localStorage.getItem("data");
    console.log("show");
}

showTasks();