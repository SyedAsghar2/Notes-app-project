$(document).ready(() => {
  // Creating a New Note (optional logic)
  $('#newNoteBtn').click(() => {
    $('#currentNote').val(''); // clears the input
  });

  // Posting Current Note
  const leftColumn = $('.left-column');

  $('#addNoteBtn').click((e) => {
    e.preventDefault(); // prevent form from submitting/reloading

    const noteText = $('#currentNote').val().trim();

    if (noteText === '') return; // do nothing if input is empty

    const previewText = noteText.split(' ').slice(0, 5).join(' '); // first few words

    const newBtn = $('<button></button>')
      .text(previewText)
      .click(() => {
        alert(noteText); // simple click behavior
      });

    leftColumn.append(newBtn);
  });
});
