function togglebox(){
    if(document.getElementById("login-box").style.display === "block"){
        document.getElementById("login-box").style.display = "none";
    }
    else{
        document.getElementById("login-box").style.display = "block";
    }
}



function showcombo1options(){
    if(document.getElementById("combo1options").style.display === "block"){
        document.getElementById("combo1options").style.display = "none";
    }
    else{
        document.getElementById("combo1options").style.display = "block";
    }
}

function selectme(name){
    document.getElementById("combo1head").innerHTML = name.innerHTML; 
    document.getElementById("combo1options").style.display = "none"
}

// document.addEventListener("DOMContentLoaded", (event) => {

//     const classes = ["Math 100", "CSC 220", "BIOL 100", "ENGL 320", "ART 200", "BUS 202"]
//         classes.forEach((element, index) =>{
//             var option1 = document.createElement("div");
//             option1.id = `option${index+1}`;
//             option1.innerText = element;
//             option1.addEventListener("click", function(){
//            selectme(this)
//         })
//             console.log(`option${index+1}`)
//             optionslist.appendChild(option1);
//         })
// });

function check_token(){
    login_box.style.display = "none"
    const current_token = localStorage.getItem("token");
    //console.log(current_token)

    const axiosConfig = {
        headers: {
            'Authorization': `Token ${current_token}`,
        }
    }
    axios.get("https://svu-csc-django-backend.online/section/", axiosConfig)

        .then(function(response) {
            section_data = response.data;
            //console.log(section_data)
            set_sections_combo();
        })

        .catch(function(error) {
            console.log(error);
            login_box.style.display = "block"
        })
}

function login(){
    const data = {
        "username": username.value,
        "password": password.value
    }

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
        }
      }
    //console.log(data);

    axios.post("https://svu-csc-django-backend.online/api-token-auth/", data, axiosConfig)

    .then((response) => {
        //console.log("data: ", response.data)
        window.localStorage.setItem("token", response.data.token)
        login_box.style.display = "none"
        get_section_data(response.data.token)
    })

    .catch(function (error) {
        console.log(error);
        login_messages.innerHTML = "Failed to login"
    })
}

function get_section_data(token){
    const axiosConfig = {
        headers: {
            'Authorization': `Token ${token}`,
        }
    }
    axios.get("https://svu-csc-django-backend.online/section/", axiosConfig)
        .then(function(response) {
            login_box.style.display = "none"
            section_data = response.data;
            //console.log(section_data)
            set_sections_combo();
        })
}

function set_sections_combo(){
    const onptionslist = document.getElementById("combo1ptions");

    var index=0;
    if (optionslist == ""){
        optionslist = document.getElementById("combo1options");
        for (key of section_data){
            var optioni = document.createElement("div")

            optioni.id = `section-option-${index+1}`;
            optioni.className = "section-list-item"
            optioni.innerText = key.title;
            optioni.dataset.sectionid = key.id;
            optioni.addEventListener("click", function() {
                select_section(this);
            });
            //console.log(optioni)
            optionslist.appendChild(optioni);
            index++;
    }}
}

function set_page_list(){
    //console.log(current_section_id)
    for(key of section_data) {
        //console.log(key.id)
        if (current_section_id == key.id) {
            //console.log("yes")
            const pageslist = document.getElementById("page-list");
            pageslist.innerHTML = "";
            var index = 0;
            for (pg of key.pages) {
                //console.log(pg)
                var optionp = document.createElement("div");
                optionp.id = `page-option-${index + 1}`;
                optionp.className = "page-list-item"
                optionp.innerHTML = pg.title;
                optionp.dataset.pageid = pg.id;
                // optionp.addEventListener("click", function(){
                //     console.log(`${this.id} was selected.`);
                // });
                optionp.addEventListener("click", function(){
                    select_page(this, false);
                });
                //console.log(optionp)
                pageslist.appendChild(optionp);
                index++;
            }
        }
    }
}

function select_section(thisoption){
    document.getElementById("theright").innerHTML = ""
    document.getElementById("combo1head").innerHTML = thisoption.innerHTML;
    document.getElementById("combo1options").style.display = "none";
    current_section_id = thisoption.dataset.sectionid;
    set_page_list();
}

function update_block(thisblockdiv){
    //console.log("update block")
    check_token_wherever()
    const theblockid = thisblockdiv.dataset.blockid
    const theindex = thisblockdiv.dataset.index
    const thetitlediv = `block-title-${theblockid}`
    const thedetaildiv = `block-detail-${theblockid}`
    const current_token = localStorage.getItem("token");
    const url = `https://svu-csc-django-backend.online/block/${theblockid}/`
    const mytitle = document.getElementById(thetitlediv).innerHTML
    const mydetail = document.getElementById(thedetaildiv).innerText

    const body = {
        "title" : mytitle,
        "content" : mydetail
    };

    const header = {
        headers: {
            'Authorization': `Token ${current_token}`,
        }
    }
    //console.log(thedetaildiv)
    //console.log(mydetail)

    axios.patch(url, body, header)
    .then(function(response) {
        reset_block_background(theblockid)
        check_token()
        section_data[current_section_id].pages[current_page_id].blocks[theindex].content = mydetail
        //console.log(section_data[current_section_id].pages[current_page_id].blocks[theindex].content)
        section_data[current_section_id].pages[current_page_id].blocks[theindex].title = mytitle
        //console.log(section_data[current_section_id].pages[current_page_id].blocks[theindex].title)
    })

    .catch(function(error) {
        console.log("An xx Error occured")
        console.log(error);
    })

}

function delete_block_confirmation(thisblockdiv){
    //console.log("delete block confirm")
    document.getElementById("delete-block-confirmation").style.display = "block"
    block_id_to_delete = Number(thisblockdiv.dataset.blockid)
}

function confirmDeleteBlock(thisblockdiv){
    //console.log("Confirm delete block")
    const current_token = localStorage.getItem("token");
    const url = `https://svu-csc-django-backend.online/block/${block_id_to_delete}/`

    const header = {
        headers: {
            'Authorization': `Token ${current_token}`,
        }
    }

    axios.delete(url, header)
    .then(function(response) {
        document.getElementById(`block-detail-${block_id_to_delete}`).remove()
        document.getElementById(`block-title-holder-${block_id_to_delete}`).remove()
        document.getElementById('delete-block-confirmation').style.display = 'none'
    })

    .catch(function(error) {
        console.log(error);
    });
}

function delete_block(thisblockdiv){
    console.log("delete block")
}

function cancelDeleteBlock(){
    document.getElementById("delete-block-confirmation").style.display = "none"
}

function set_block_background(thisblockdiv) {
    //console.log("set block background")
    check_token_wherever()
    document.getElementById(`block-title-${thisblockdiv.dataset.blockid}`).style.backgroundColor = "white";
    document.getElementById(`block-detail-${thisblockdiv.dataset.blockid}`).style.backgroundColor = "white";
}

function reset_block_background(thisblockdiv) {
    //console.log("reset block background")
    document.getElementById(`block-title-${thisblockdiv}`).style.backgroundColor = "tan";
    document.getElementById(`block-detail-${thisblockdiv}`).style.backgroundColor = "tan";
    
}

function check_token_wherever(){
    //console.log("token checked!")
}

function select_page(thispage, arrows){
    if(arrows == false){
        current_page_id = thispage.dataset.pageid;
    }
    else{
        current_page_id = thispage;
    }
    console.log(thispage.dataset)

    for(key of section_data){

    if (current_section_id == key.id) {

        const theright = document.getElementById("theright");
        theright.innerHTML = "";
        
        let listspot = 0;
        for (pg of key.pages) {
            if(current_page_id == pg.id) {
                console.log(`current page id: ${current_page_id}`)
                var navbar = document.createElement("div");
                navbar.id = "nav-bar";
                navbar.className = "nav-bar";
                theright.appendChild(navbar)

                var leftBox = document.createElement("div");
                leftBox.id = "left-box";
                leftBox.className = "left-box"
                navbar.append(leftBox)

                var navLeftArrow = document.createElement("div")
                navLeftArrow.innerHTML = "<span class='material-symbols-outlined'>arrow_back</span>"
                if (listspot == 0){
                    navLeftArrow.className = "navleft greyed"
                }
                else {
                    navLeftArrow.className = "navleft"
                    navLeftArrow.addEventListener("click", function(){
                        select_page(current_page_id - 1, true);
                    })
                }
                leftBox.appendChild(navLeftArrow);

                var pagetitle = document.createElement("div");
                pagetitle.id = "page-title";
                pagetitle.className = "page-title";
                pagetitle.innerHTML = pg.title;
                pagetitle.dataset.pageid = pg.id;
                navbar.appendChild(pagetitle);

                var rightBox = document.createElement("div");
                rightBox.id = "right-box";
                rightBox.className = "right-box"
                navbar.append(rightBox)

                var navRightArrow = document.createElement("div")
                navRightArrow.innerHTML = "<span class='material-symbols-outlined'>arrow_forward</span>"
                if (listspot == key.pages.length - 1){
                    navRightArrow.className = "navright greyed"
                }
                else {
                    navRightArrow.className = "navright"
                    navRightArrow.addEventListener("click", function(){
                        select_page(current_page_id + 1, true);
                    })
                }
                rightBox.appendChild(navRightArrow);
            
            
                var index = 0
                for (block of pg.blocks){
                    var blocktitleholder = document.createElement("div");
                    var blocktitle = document.createElement("div");

                    blocktitleholder.id = `block-title-holder-${index + 1}`;
                    blocktitleholder.className = "block-title-holder";
                    theright.appendChild(blocktitleholder);

                    blocktitle.contentEditable='true'
                    // only make editable if the user has edit rights
                    blocktitle.id = `block-title-${block.id}`;
                    blocktitle.className = "block-title";
                    blocktitle.dataset.blockid = block.id
                    blocktitle.dataset.index = index;
                    blocktitle.innerHTML = block.title;
                    blocktitle.addEventListener("blur", function() {
                        update_block(this);
                    });
                    blocktitle.addEventListener("click", function(){
                        set_block_background(this);
                    })
                    blocktitleholder.appendChild(blocktitle);

                    //var blocktitleicon1 = document.createElement("div");
                    var blocktitleicon2 = document.createElement("div");

                    // blocktitleicon1.id = `block-title-icon1-${index + 1}`;
                    // blocktitleicon1.innerHTML = "<span class='material-symbols-outlined'>edit</span>"
                    // blocktitleicon1.dataset.blockid = block.id;
                    // blocktitleicon1.addEventListener("click", function() {
                    //     update_block(this);
                    // })

                    
                    blocktitleicon2.id = `block-title-icon2-${block.id}`;
                    blocktitleicon2.innerHTML = "<span class='material-symbols-outlined'>delete</span>"
                    blocktitleicon2.dataset.blockid = block.id;
                    blocktitleicon2.addEventListener("click", function() {
                        delete_block_confirmation(this);
                    })

                    //blocktitleholder.appendChild(blocktitleicon1);
                    blocktitleholder.appendChild(blocktitleicon2);

                    var blockdetail = document.createElement("div");
                    blockdetail.contentEditable = 'true';
                    blockdetail.id = `block-detail-${block.id}`;
                    blockdetail.className = "block-detail";
                    blockdetail.dataset.blockid = block.id;
                    blockdetail.dataset.index = index;
                    blockdetail.innerHTML = block.content;
                    blockdetail.addEventListener("blur", function(){
                        update_block(this);
                    });
                    blockdetail.addEventListener("click", function(){
                        set_block_background(this);
                    });
                    theright.appendChild(blockdetail);
                    index++;
                }
            newblock();
            }
            listspot += 1;
        }
        
    }
}
}

function newblock (){
    var blockbutton = document.createElement("button")
    var blockbox = document.createElement("div");
    var nbb_title = document.createElement("input");
    var nbb_content = document.createElement("textarea");
    var nbb_button = document.createElement("button");
    var nbb_cancel = document.createElement("button");

    blockbutton.id = "new-block-button";
    blockbutton.innerHTML = "Click to add a block to the page";
    blockbutton.addEventListener("click", showblockbox);
    blockbutton.className = "block-button";
    theright.appendChild(blockbutton);

    blockbox.id = "block-box";
    blockbox.className = "block-box";
    theright.appendChild(blockbox);

    const theblockbox = document.getElementById("block-box");

    nbb_title.id = "new-block-title";
    nbb_title.type = "text";
    nbb_title.className = "nbb-title";
    nbb_title.value = "Title";
    theblockbox.appendChild(nbb_title);

    nbb_content.id = "new-block-content";
    nbb_content.name = "new-block-content";
    nbb_content.className = "nbb-content";
    nbb_content.value = "Content";
    theblockbox.appendChild(nbb_content);

    nbb_button.innerHTML = "Create Block";
    nbb_button.addEventListener("click", create_block);
    nbb_button.className = "nbb-button";
    theblockbox.appendChild(nbb_button)

    nbb_cancel.innerHTML = "Cancel";
    nbb_cancel.addEventListener("click", cancel_block);
    nbb_cancel.className = "nbb-cancel";
    theblockbox.appendChild(nbb_cancel);

    theblockbox.style.display = "none";
}

function showblockbox(){
    const blockbox = document.getElementById("block-box");
    document.getElementById("new-block-button").style.display = "none";
    blockbox.style.display = "block";
}

function cancel_block() {
    document.getElementById("block-box").style.display = "none";
    document.getElementById("new-block-button").style.display = "block";
}

function create_block() {
    cancel_block();
    const newtitle = document.getElementById("new-block-title").value;
    const newcontent = document.getElementById("new-block-content").value;
    const current_token = localStorage.getItem("token");
    const data = {
        "title": newtitle,
        "content": newcontent,
        "pageids": [current_page_id],
    }
    const axiosConfig = {
        headers: {
            'Authorization': `Token ${current_token}`,
        }
    }
    //console.log(current_token)
    axios.post("https://svu-csc-django-backend.online/block/", data, axiosConfig)
        .then(function(response) {
            const element1 = document.getElementById("block-box");
            element1.remove();
            const element2 = document.getElementById("new-block-button");
            element2.remove();

            var blocktitle = document.createElement("div");
            blocktitle.id = `block-title-new`;
            blocktitle.className = "block-title";
            blocktitle.innerHTML = newtitle;
            theright.appendChild(blocktitle);

            var blockdetail = document.createElement("div");
            blockdetail.id = `block-detail-new`;
            blockdetail.className = "block-detail";
            blockdetail.innerHTML = newcontent
            theright.appendChild(blockdetail);

            newblock();
        })

    .catch(function(error) {
        console.log(error);
    });
}

let username = document.getElementById("myusername")
let password = document.getElementById("mypassword")
let login_messages = document.getElementById("login-messages")
let login_box = document.getElementById("login-box")
let optionslist = ""
let section_data
let current_section_id
let current_page_id;
let block_id_to_delete = 0;

check_token()