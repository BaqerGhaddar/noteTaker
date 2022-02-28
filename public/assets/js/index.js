var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// this variable keeps track of the current note in the text area
var currNote = {};

// get all notes from the database
var getNotes = function() {
  return $.ajax({
    url: "/api/notes",
    method: "GET"
  });
};

// save notes to the db
var saveNote = function(note) {
  return $.ajax({
    url: "/api/notes",
    data: note,
    method: "POST"
  });
};

// delete note from the database
var deleteNote = function(id) {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE"
  });
};

// If there is a current note, show it
// otherwise render empty notes
var rendercurrNote = function() {
  $saveNoteBtn.hide();
  if (currNote.id) {
    $noteTitle.attr("readonly", true);
    $noteText.attr("readonly", true);
    $noteTitle.val(currNote.title);
    $noteText.val(currNote.text);
  } else {
    $noteTitle.attr("readonly", false);
    $noteText.attr("readonly", false);
    $noteTitle.val("");
    $noteText.val("");
  }
};

// get the note data from inputs, save it to the database and update the current view
var manageNoteSave = function() {
  var newNote = {
    title: $noteTitle.val(),
    text: $noteText.val()
  };

  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    rendercurrNote();
  });
};

// delete the desired note
var manageNoteDelete = function(event) {
  event.stopPropagation();
  var note = $(this)
    .parent(".list-group-item")
    .data();

  if (currNote.id === note.id) {
    currNote = {};
  }
  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    rendercurrNote();
  });
};

// sets the currNote and displays it
var manageNoteView = function() {
  currNote = $(this).data();
  rendercurrNote();
};

// sets the current note to null object and enables the user to enter a new note
var manageNewNoteView = function() {
  currNote = {};
  rendercurrNote();
};

// if there is no text in the title or text area then hide the save button otherwise show it
var manageRenderSaveBtn = function() {
  if (!$noteTitle.val().trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// processes the list of note titles
var renderNoteList = function(notes) {
  $noteList.empty();
  var noteListItems = [];
  for (var i = 0; i < notes.length; i++) {
    var note = notes[i];
    var $li = $("<li class='list-group-item'>").data(note);
    var $span = $("<span>").text(note.title);
    var $delBtn = $(
      "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
    );
    $li.append($span, $delBtn);
    noteListItems.push($li);
  }
  $noteList.append(noteListItems);
};

// retrieves notes from the database and renders them to the sidebar
var getAndRenderNotes = function() {
  return getNotes().then(function(data) {
    renderNoteList(data);
  });
};

$saveNoteBtn.on("click", manageNoteSave);
$noteList.on("click", ".list-group-item", manageNoteView);
$newNoteBtn.on("click", manageNewNoteView);
$noteList.on("click", ".delete-note", manageNoteDelete);
$noteTitle.on("keyup", manageRenderSaveBtn);
$noteText.on("keyup", manageRenderSaveBtn);

// retrieves and renders the initial list of notes
getAndRenderNotes();
