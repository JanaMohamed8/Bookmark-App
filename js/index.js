//create

var rowNameInput=document.getElementById("siteNameINput");
var rowLinkInput=document.getElementById("siteSiteINput");
var rowSearchInput=document.getElementById("siteSearch");

var data=[];
if(localStorage.getItem("sites data")!=null){
    data = JSON.parse(localStorage.getItem("sites data"));
    display(data);
}

//add
function addRow(){

    if(validation("siteNameINput")&&validation("siteSiteINput"))
    {

      var siteData={
        code: rowNameInput.value,
        link: rowLinkInput.value,
       }
        data.push(siteData);
        setForLocalStorage()
        display(data);
        clearInputs()
    }else{
        // Swal.fire({
        //     title: "Site Name or Url is not valid, Please follow the rules below :",
        //     text: `Site name must contain at least 3 characters
        //     Site URL must be a valid one
        //     `,
        //     color: "black",
        //   });

        document.getElementById("errorAlert").classList.remove("d-none");
    }
}

//display
function display(arrToDisplay){
  var cartona =``;
   
  for(var i=0;i<arrToDisplay.length;i++){
    cartona+=`<tr>
      <th>${i+1}</th>
      <td>${arrToDisplay[i].code}</td>
      <td><a href="${arrToDisplay[i].link}" target ="_blank" class="btn" id="visitBtn"><i class="fa-solid fa-eye"></i> Visit</a></td>
      <td><button type="button" class="btn btn-danger" id="DeleteBtn" onclick="deleteRow(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
      <td><button type="button" class="btn btn-warning" id="updateBtn" onclick="setValuesForUpdate(${i})"><i class="fa-solid fa-pen"></i> Update</button></td>
      </tr> `
  }
   document.getElementById("dataTableBody").innerHTML=cartona;
  
}

//clear inputs
function clearInputs(){
    rowNameInput.value=null;
   rowLinkInput.value=null;
   document.getElementById("siteNameINput").classList.remove("is-valid");
   document.getElementById("siteSiteINput").classList.remove("is-valid"); 
   document.getElementById("siteNameINput").classList.remove("is-invalid");
   document.getElementById("siteSiteINput").classList.remove("is-invalid"); 
}

//set at local storage
function setForLocalStorage(){
    localStorage.setItem("sites data",JSON.stringify(data));
}


//delete
function deleteRow(index){
   data.splice(index,1);
   display(data);
   setForLocalStorage();
}

//update
var myIndex;
function setValuesForUpdate(index){
    myIndex = index;
    rowNameInput.value=data[index].code;
    rowLinkInput.value=data[index].link;

    document.getElementById("updateBtnMain").classList.remove("d-none")
    document.getElementById("addBtn").classList.add("d-none")
}

//search
function search(){
    var term=rowSearchInput.value
   var searchArr=[];
   for(var i=0;i<data.length;i++)
   {
      if(data[i].code.toLowerCase().includes(term.toLowerCase()))
        searchArr.push(data[i]);
   }
   if(searchArr.length>0){
    display(searchArr);
   }
   else
   {
    document.getElementById("dataTableBody").innerHTML="NOT FOUND";
   }
   
}

function update(){
        if(validation("siteNameINput")&&validation("siteSiteINput"))
        {
           data[myIndex].code = rowNameInput.value;
           data[myIndex].link= rowLinkInput.value;
          
        }else{
            document.getElementById("errorAlert").classList.remove("d-none");
            // update();
        }
        display(data);
        setForLocalStorage();
        clearInputs();
        document.getElementById("updateBtnMain").classList.add("d-none");
        document.getElementById("addBtn").classList.remove("d-none");
        document.getElementById("siteNameINput").classList.remove("is-valid");
        document.getElementById("siteSiteINput").classList.remove("is-valid");  
} 

//validation
function validation(id){
    // console.log(id);
    var myString = document.getElementById(id).value;
    var regex={
        siteNameINput:/^[a-zA-z][a-zA-z ]{2,30}$/,
        siteSiteINput:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    }
    if(regex[id].test(myString))
    {
        document.getElementById(id).classList.add("is-valid");
        document.getElementById(id).classList.remove("is-invalid");
        return true;
    }
    else{
        document.getElementById(id).classList.remove("is-valid");
        document.getElementById(id).classList.add("is-invalid");
        return false;
    }
}

//alert
function closeAlert(){
    document.getElementById("errorAlert").classList.add("d-none");
}