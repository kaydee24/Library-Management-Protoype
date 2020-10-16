
let k = localStorage.getItem("authorar");
let authorarr = JSON.parse(k);

let kk = localStorage.getItem("currqtyar");
let currqtyarr = JSON.parse(kk);


let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let html = "";

    let Txt = document.getElementById("addTxt");


    let bookarr = localStorage.getItem("bookar");
    let notesObj = JSON.parse(bookarr);


    notesObj.forEach(function (element, index) {
        if (element == Txt.value) {
            html += `<br></br>
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                        <div class="card-body">
                            <h4 class="card-title">Book: ${element}</h4>
                            <div class="card=detail">
                            <h6>Author: ${authorarr[index]}</h6>
                            <h6>Qty. Availble: ${currqtyarr[index]}</h6>
                            <label for="qty">Enter Qty:</label>
                            <input type="number" id="inputqty">
                            <br></br>

                            <button id="${index}"onclick="issue(this.id)" class="btn btn-primary mx-2 my-1">Issue this Book</button>
                            <button id="${index}"onclick="returnn(this.id)" class="btn btn-primary mx-2 my-2">Return this Book</button>
                        </div>
                    </div>
                </div>`;
        }
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }

});


//Function to issue
function issue(index) {

    let inputqty = document.getElementById('inputqty');
    let currqtyarr = localStorage.getItem("currqtyar");
    let currqtyar = JSON.parse(currqtyarr);

    inputqty = inputqty.value;
    inputqty = parseInt(inputqty);
    currqtyar[index] = parseInt(currqtyar[index])


    if (currqtyar[index] >= inputqty) {
        let x = currqtyar[index] - inputqty;
        x = x.toString();
        currqtyar[index] = x;

    }

    else {
        console.log('sorry qty not availble');
    }


    localStorage.setItem("currqtyar", JSON.stringify(currqtyar));

}


//Function to return
function returnn(index) {

    let inputqty = document.getElementById('inputqty');
    let currqtyarr = localStorage.getItem("currqtyar");
    let currqtyar = JSON.parse(currqtyarr);

    inputqty = inputqty.value;
    inputqty = parseInt(inputqty);
    currqtyar[index] = parseInt(currqtyar[index])

    let x = currqtyar[index] + inputqty;
    x = x.toString();
    currqtyar[index] = x;

    localStorage.setItem("currqtyar", JSON.stringify(currqtyar));
}
