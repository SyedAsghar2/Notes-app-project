const form = document.querySelector(".form-note");
let newNotePost = true;

function newNote(){
    document.querySelector('#note-id').id = ''
    document.querySelector('#note-title').innerHTML = ''
    document.querySelector('#note-body').innerHTML = ''
}




//Loads all of the saved notes to in the saved-notes-container as buttons
async function loadNote (){
    document.querySelector('.saved-notes-container').innerHTML = ''
    const response = await fetch("/notes")
    const json = await response.json()
    json.forEach(note => { 
        $('.saved-notes-container').append(
            `<button class="note-button" id="${note.id}">${note.title}</button>`
        );
    });
    addButtonListeners();
}

// Event listener setup
function addButtonListeners() {
    // Using event delegation for dynamic content
    $('.saved-notes-container').on('click', '.note-button', getNote);
}

async function getNote() {
    const clickButtonId = this.id;
    console.log('Button clicked, ID:', clickButtonId); // Debug log

    try {
        const response = await fetch(`/${clickButtonId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const note = await response.json();
        console.log(note)

        document.getElementById("note-id").innerHTML = note.id;
        //document.getElementById('note-title').innerHTML = note.title;
        form.elements['note-title'].value = note.title;
        //document.getElementById('note-body').innerHTML = note.content;
        form.elements['note-body'].value = note.content;
        newNotePost = false;

    } catch (error) {
        console.error('Error fetching note:', error);
    }
}

loadNote()





async function saveNote (){
    const data = {
                    title: form.elements['note-title'].value,
                    content: form.elements['note-body'].value,
                    id: parseInt(document.getElementById('note-id').innerHTML)
                };

    try {
    const options = {
                        method: newNotePost ? "POST":"PATCH",
                        headers: {
                                    'Content-Type': 'application/json'
                                },
                        body: JSON.stringify(data)
                    }
    const response = await fetch("/", options);
    if (!response.ok){
        throw new Error(`HTTP error! status:${response.status}`)
    }
    console.log(await response.json());
    loadNote()
    newNotePost = false
    } 
    catch(e) {
        console.error(e);
    }
}

document.querySelector('.save-note').addEventListener('click', (e) => {
    e.preventDefault()
    saveNote()})



async function deleteNote () {
    const noteID = document.getElementById('note-id').innerHTML
    if(!noteID) {
        console.log("Can not delete a note that isn't saved")
        return
    }
    const data = {
                id:noteID
            };
    try {
    const options = {
                method: "DELETE",
                headers: {
                            'Content-Type': 'application/json'
                        },
                body:JSON.stringify(data)
            }
    const response = await fetch("/delete", options)
    if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    const json = await response.json()
    console.log(json)
    location.reload(true);
        } 
        catch (e) {
            console.error(e)
        }
}

document.querySelector(".delete-note").addEventListener("click", deleteNote)