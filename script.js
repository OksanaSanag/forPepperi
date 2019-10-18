
let pairsArray = [];

const container = document.querySelector('.formOutput');
const userPairInput = document.querySelector('#userPair');
const buttonAddPair = document.querySelector('#addPair');
const buttonSortByName = document.querySelector('#sortByName');
const buttonSortByValue = document.querySelector('#sortByValue');
const buttonDeleteAll = document.querySelector('#deleteAll');
const buttonDeletePairs = document.querySelector('#delete');
const buttonXML = document.querySelector('#showXML');

buttonAddPair.addEventListener('click', addPair);
buttonSortByName.addEventListener('click', sortByNames);
buttonSortByValue.addEventListener('click', sortByValues);
buttonDeleteAll.addEventListener('click', deleteAll);
buttonDeletePairs.addEventListener('click', deleteSomePairs);
buttonXML.addEventListener('click', showXML);

function addPair() {
    const pair = userPairInput.value;

    const newData = correctInput(pair); 
   
    if (newData) {
        userPairInput.value = '';
        pairsArray.push(newData);
    }; 
    console.log('pairsArray', pairsArray);
 
    output();
    //console.log('newpairsArray', newpairsArray);
    return pairsArray;  
}

function correctInput(data) {
    if (data == "") {
        alert( "Enter correct pair");
        return null;
    }
    
    let pos = data.indexOf('='); //console.log('pos',pos);
    if (pos == -1) {
        alert("Enter correct pair");
        return null;
    }
    
    let name = data.slice(0, pos); // console.log(name);
    let value = data.slice(pos+1);  //console.log(value);
    
    if (name[name.length-1] == ' ') {
        name = name.slice(0,length-1);
        //console.log('NEWname',name);
    }
    if (value[0] == ' ') {
        value = value.slice(1);
        //console.log('NEWvalue',value);
    }
    if (name.length == 0) {
        alert('Enter correct Name');
        return null;
    }
    if (value.length == 0) {
        alert('Enter correct Value');
        return null;
    }
    if ( /\W/.test(name) || (/_/.test(name)) === true) {
        alert('Enter correct Name');
        return null;
    } 
    if ( /\W/.test(value) || (/_/.test(value)) === true) {
        alert('Enter correct Value');
        return null;
    } 

    const id = Date.now();
    return {id, name, value};
}
//
function output() {
    container.innerHTML = '';

    pairsArray.forEach(user => {
        const divPair = document.createElement('div');
        divPair.className = 'divOnePair';
        
        function innerDivPair(user) {
            divPair.innerHTML = `
            <p>${user.name}=${user.value}</p>
            <input type="checkbox" class='checkBox' id='${user.id}'>`
        }

        innerDivPair(user);
        container.append(divPair);
    })   
}

function sorting(type) {
    pairsArray.sort(function(a,b) {
        const dataA = a[type].toLowerCase();
        const dataB = b[type].toLowerCase();
        if (dataA < dataB) 
          return -1;
        if (dataA > dataB)
          return 1;
        return pairsArray;
    });
}

function sortByNames() {
    sorting('name');
    output();
} 

function sortByValues() {
    sorting('value');
    output();
}

function deleteAll() {
    container.innerHTML = '';
    pairsArray = [];
    //console.log('NEWpairsArray', pairsArray);
}

function deleteSomePairs() {
    const cbox = document.querySelectorAll('.checkBox');
    //console.log(cbox);
    const arrayCB_id = [];
    cbox.forEach((cb) => { if (cb.checked) { arrayCB_id.push(+cb.id) } })
    console.log('arrayCB_id', arrayCB_id);

    pairsArray = pairsArray.filter(el  => !arrayCB_id.includes(el.id))
    output();
}
  
function showXML() {
    console.log('pairsArrayXML', pairsArray);
    container.innerHTML = '&#060;?xml version="1.0" encoding="UTF-8"?><br>&#060;page><br>';
    
    pairsArray.forEach(elem => {            
        container.innerHTML = container.innerHTML + 
            '&emsp;&emsp;&#060;pair>' + `${elem.name}` + '&#060;/pair><br>' +
            '&emsp;&emsp;&#060;name>' + `${elem.value}` + '&#060;/name><br>'       
    })
    container.innerHTML = container.innerHTML + '&#060;/page>'
}

