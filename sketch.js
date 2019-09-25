var myCanvasl;

var submitButton;
var idInput;

var studentIds = ["1", "2", "3", "4", "5"];

var students = [];

var classTime = {
  startHour: 11,
  startMinutes: 15,
  startText: `11:15`,
  endHour: 16,
  endMinute: 20,
  endText: `12:20`
};

function setup() {
  populateStudents();
  myCanvas = createCanvas(innerWidth, innerHeight);
  myCanvas.parent("mainSketch");

  background(0);
  submitButton = createButton("Submit");
  submitButton.size(53, 18);
  submitButton.position(width / 2, height / 2);

  idInput = createInput("");
  idInput.position(width / 2, height / 2 + submitButton.height + 3);

  submitButton.mousePressed(onSubmit);
}

function draw() {
  background(0);
  fill(255);
  let myText;

  for (let i = 0; i < students.length; i++) {
    myText += `\n ID: ${students[i].id}, TIME: ${students[i].submitTime}, ON_TIME: ${students[i].onTime}`;
  }

  text(myText, 10, 10, width / 2, height);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  alert(position.coords.latitude);
  alert(position.coords.longitude);
}

function populateStudents() {
  for (let i = 0; i < studentIds.length; i++) {
    students.push({
      onTime: false,
      tardy: false,
      appcent: true,
      submitTime: "Didn't show up",
      id: studentIds[i]
    });
  }
}

function onSubmit() {
  //   console.log(idInput.value());
  getLocation();
  showPosition();
  if (idInput.value() === undefined) {
    alert("Enter some ID");
  } else {
    isValidId(idInput.value());
  }
}

function isValidId(input) {
  let indexOfId = studentIds.indexOf(input);
  console.log(indexOfId);
  if (indexOfId === -1) {
    //was not found
    alert("Invalid ID");
    return false;
  } else {
    alert("You were signed in");

    let dateObject = getDate();
    let curHour = getDate().hour;
    let curMinute = getDate().minute;

    // console.log(students[indexOfId].submitTime, dateObject.text);
    if (curHour > classTime.startHour && curHour < classTime.endHour) {
      alert("You are on Time");
      students[indexOfId].onTime = true; //set to on time
      students[indexOfId].appcent = false;
      students[indexOfId].tardy = false;
      students[indexOfId].submitTime = dateObject.text;
    } else if (
      curHour < classTime.startHour &&
      curMinute < classTime.startMinute
    ) {
      alert("Too early!");
    } else if (curHour < classTime.endHour && curMinute < classTime.endMinute) {
      alert("You are tardy!");
      students[indexOfId].onTime = false; //set to tardy
      students[indexOfId].appcent = false;
      students[indexOfId].tardy = true;
      students[indexOfId].submitTime = dateObject.text;
    } else {
      alert("Too late! Class is over!");
    }
    return indexOfId;
  }
}

function getDate() {
  let date = new Date();
  let output = `${date.getHours()}:${date.getMinutes()}`;
  return {
    hour: date.getHours(),
    minute: date.getMinutes(),
    text: `${date.getHours()}:${date.getMinutes()}`
  };
}
