// DECLARING VARIABLES
// Time requiring moment.js

// Selects the elment with id: currentDay
var date = $('#currentDay');

// Selects the div with class: container
var scheduler = $('.container');

// Formats date and adds it to jumbotron
var day = moment().format('MMMM Do YYYY, h:mm:ss a');
date.text(day);

// Get current hour
var currentHour = moment().hour();

// Creates an array that will list the hours for the date
var workingHours = [];
for(var i = 9;i <= 17; i++){
    workingHours.push(moment().hour(i).format('hA'));
}

// Declaring the div that will hold the timeblocks and hours
var timeBlockHour = $('col-1 hour');

// Declaring the div that will hold task descriptions
var task = $('.description');

// END OF GLOBAL VARIABLES

// This function will be used to compare the time and change the background of each timeblock depending on the current hour
function checkTimeBlock(event) {
    // Takes the time from the div and converts to the hour of the day
    var currentBlockHour = moment($(timeBlockHour).text().trim(), 'hA').hour();

    // Removes classes: 'past', 'present', and 'future' from event
    $(event).removeClass('past');
    $(event).removeClass('present');
    $(event).removeClass('future');

    // Conditional that changes the background of a Time Block depending if it's in the past present or future
    if (currentBlockHour > currentHour) {
        $(event).addClass('future');
    }
    else if (currentBlockHour === currentHour) {
        $(event).addClass('present');
    }
    else {
        $(event).addClass('past');
    }
}

// This function will load tasks to the timeblocks
function loadTask() {
    // for loop gets tasks for each hour
    for (var i = 0; i < workingHours.length; i++) {
        let task = localStorage.getItem(workingHours[i])

        if (task) {
            $('#' + (i + 9)).siblings().first().children().text(task);
        }
    }
}

// This function takes in the hour and a task description and saves it to localStorage
function saveTask(hour, task) {
    localStorage.setItem(hour, task);
}

// This loop will create and append the scheduler for the amount of working hours
for (var i = 0; i < workingHours.length; i++) {

    // Declares a div with classes row and time-block, adds id of row-
    var timeBlockRow = $('<div>').addClass('row time-block').attr({ id: 'row-' + (i + 9) });

    // Declares the time blocks for the scheduler
    var timeBlockHour = $('<div>').addClass('col-1 hour').text(workingHours[i]).attr({ id: i + 9 })

    // Declares event space
    var timeBlockEventSpace = $('<div>').addClass('col-10').attr({ id: 'time-block-' + (i + 9) });

    // Declares a user Input for the time blocks
    var userInput = $('<p>').addClass('description').text(' ').attr({ id: 'Hour-' + (i + 9) });

    // Checks time using checkTimeBlock function
    checkTimeBlock(timeBlockEventSpace);

    // Creates a save button to save tasks
    var saveBtn = $('<button>').addClass('col-1 saveBtn').attr({ id: 'save-button-' + (i + 9), type: 'button', })
        .on('click', function () {
            // retrieve the hour of the timeblock
            var hour = $(this).siblings().first().text();
            // retrieve the value in <p> element
            var task = $(this).siblings().last().text();

            //save to local storage
            saveTask(hour, task)

        });

    // Appends all elements declared
    $(scheduler).append(timeBlockRow);
    $(timeBlockRow).append(timeBlockHour);
    $(timeBlockRow).append(timeBlockEventSpace);
    $(timeBlockEventSpace).append(userInput);
    $(timeBlockRow).append(saveBtn);
    $(saveBtn).text('Save Task');
}

// add functionality so when user clicks into time block:
// edit the text content on focus
$('.col-10').on('click', 'p', function () {

    var text = $(this).text().trim()

    var textInput = $('<textarea>').addClass('form-control').val(text);

    $(this).replaceWith(textInput);

    textInput.trigger('focus');
});

//  - hardcode the <p> content on blur
$('.col-10').on('blur', 'textarea', function () {
    // get the textarea's current value/text
    var text = $(this).val().trim();

    // recreate p element
    var userTextP = $("<p>").addClass("description").text(text);

    // replace textarea with p element
    $(this).replaceWith(userTextP);
})

// Load Tasks save from local storage
loadTask();







