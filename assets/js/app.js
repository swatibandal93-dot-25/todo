const cl =console.log;

const todoForm=document.getElementById('todoForm')
const todoItem=document.getElementById('todoItem')
const addTodoBtn=document.getElementById('addTodoBtn')
const updateTodoBtn=document.getElementById('updateTodoBtn')

let todoArr;
if(localStorage.getItem("todoArr")){
todoArr= JSON.parse(localStorage.getItem("todoArr"))
} else{
    todoArr=[];
}
function snackbar(msg){
    swal.fire({
        title:msg,
        icon:'success',
        timer:3000
    })
}
function createLists(arr){
	result="";
	arr.forEach((res)=>{
		result +=` <li class="list-group-item d-flex justify-content-between" id="${res.todoId}">
		           <strong>${res.todoItem}</strong>
		         <div>
		            <i class="fa-solid fa-pen-to-square fa-2x text-success mr-2" onclick="onEdit(this)"></i>
	                <i class="fa-solid fa-trash fa-2x text-danger" onclick="onRemove(this)" ></i>
		          </div>
		        </li>`
	})
	todoList.innerHTML=result
}
createLists(todoArr)


function onSubEve(eve){
	eve.preventDefault()
	// cl(eve)
	
	let todoobj={
		todoItem:todoItem.value,
		todoId:Date.now().toString()
	}
	//
	todoArr.push(todoobj)
    localStorage.setItem('todoArr',JSON.stringify(todoArr))

	//createLists(todoArr)
	
	let li=document.createElement('li')
	li.id=todoItem.todoId
	li.className=`list-group-item d-flex justify-content-between`
	
	li.innerHTML=`
	<strong>${todoobj.todoItem}</strong>
	<div>
	 <i class="fa-solid fa-pen-to-square fa-1x text-success mr-2" onclick="onEdit(this)"></i>
	 <i class="fa-solid fa-trash fa-1x text-danger" onclick="onRemove(this)" ></i>
	</div>
	`
	
	todoList.append(li)
  snackbar('New todoItem Added successfully!!');
}


function onRemove(ele){
	let REMOVE_ID=ele.closest('li').id

	let conformation=confirm(`Are you sure Remove This Todoitem with id="${REMOVE_ID}" `)
		if(conformation){
			
		let resIndex=todoArr.findIndex(t => t.todoId === REMOVE_ID	)
		
		
		todoArr.splice(resIndex,1)
        localStorage.setItem('todoArr',JSON.stringify(todoArr))
		ele.closest('li').remove()
		
		snackbar(` TODO ITEM with id ${REMOVE_ID} Removed successfully!!`);	
		}
}


function onEdit(ele){
	EDIT_ID=ele.closest('li').id
	localStorage.setItem('EDIT_ID', EDIT_ID)

	let getelement=todoArr.find(t => t.todoId === EDIT_ID)
	//if(!getelement)return;

    todoItem.value=getelement.todoItem
	addTodoBtn.classList.add('d-none')
	updateTodoBtn.classList.remove('d-none')
}

function onTodoUpdate(){
  let UPDATE_ID=localStorage.getItem('EDIT_ID')
  localStorage.removeItem(EDIT_ID)
	let UPDATE_TODO={
		todoItem:todoItem.value,
		todoId:UPDATE_ID
	}
	todoForm.reset()
	let getIndex=todoArr.findIndex(t => t.todoId === UPDATE_ID)
	todoArr[getIndex]=UPDATE_TODO
   
    localStorage.setItem('todoArr',JSON.stringify(todoArr))

    addTodoBtn.classList.remove('d-none')
	updateTodoBtn.classList.add('d-none')

	let li=document.getElementById(UPDATE_ID).firstElementChild
	li.innerText=UPDATE_TODO.todoItem

    snackbar("TODO ITEM UPDATED SUCCESSFULLY!!")
	
}


updateTodoBtn.addEventListener('click', onTodoUpdate)
todoForm.addEventListener('submit', onSubEve)






