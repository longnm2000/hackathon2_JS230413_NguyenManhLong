const submitBtn = document.getElementById("submit");
const nameInfo = document.getElementById("fullName");
const emailInfo = document.getElementById("email");
const numberInfo = document.getElementById("telNumber");
const homeTownInfo = document.getElementById("homeTown");
const genderInfo = document.getElementsByName("gender");
const tbodyInfo = document.getElementById("main-info");
const sortBtn = document.getElementById("sort-students");
const searchInfo = document.getElementById("searchInfo");
const searchBtn = document.getElementById("searchBtn");
let students = [];
let index = -1;

function resetForm() {
  nameInfo.value = "";
  emailInfo.value = "";
  numberInfo.value = "";
  homeTownInfo.value = "";
  genderInfo[0].checked = true;
}
function addStudent(event) {
  let fullNameAdd = nameInfo.value;
  let emailAdd = emailInfo.value;
  let telNumberAdd = numberInfo.value;
  let homeTownAdd = homeTownInfo.value;
  let genderAdd;
  index = index + 1;
  for (let i = 0; i < genderInfo.length; i++) {
    if (genderInfo[i].checked === true) {
      genderAdd = genderInfo[i].value;
    }
  }
  if (event.target.classList.contains("update")) {
    const iden = event.target.getAttribute("data-index");
    console.log(iden);
    console.log(students[0]);
    students[iden].name = fullNameAdd;
    students[iden].email = emailAdd;
    students[iden].telephone = telNumberAdd;
    students[iden].homeTown = homeTownAdd;
    students[iden].gender = genderAdd;
    renderInfo(students);
    submitBtn.textContent = "Lưu lại";
    submitBtn.classList.remove("update");
  } else {
    students.push({
      index: index,
      name: fullNameAdd,
      email: emailAdd,
      telephone: telNumberAdd,
      homeTown: homeTownAdd,
      gender: genderAdd,
    });
    renderInfo(students);
  }
  resetForm();
}

submitBtn.addEventListener("click", (event) => {
  addStudent(event);
});

function renderInfo(arr) {
  let inputTable = "";
  for (let i = 0; i < arr.length; i++) {
    inputTable += `<tr>
    <td>${i + 1}</td>
    <td>${arr[i].name}</td>
    <td>${arr[i].email}</td>
    <td>${arr[i].telephone}</td>
    <td>${arr[i].homeTown}</td>
    <td>${arr[i].gender}</td>
    <td>
        <button data-id="${i}" class="edit">Edit</button>
        <button data-id="${i}" class="delete">Delete</button>
    </td>
    </tr>`;
  }
  tbodyInfo.innerHTML = inputTable;
}

function deleteStudent(index) {
  students.splice(index, 1);
}

tbodyInfo.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete")) {
    students.splice(event.target.getAttribute("data-id"), 1);
  }
  if (event.target.classList.contains("edit")) {
    submitBtn.textContent = "Update";
    submitBtn.classList.add("update");
    updateSudent(parseInt(event.target.getAttribute("data-id")));
    submitBtn.setAttribute("data-index", event.target.getAttribute("data-id"));
  }

  renderInfo(students);
});

function updateSudent(index) {
  const findStudent = students.findIndex(function (element) {
    return +element.index === +index;
  });
  nameInfo.value = students[findStudent].name;
  emailInfo.value = students[findStudent].email;
  numberInfo.value = students[findStudent].telephone;
  homeTownInfo.value = students[findStudent].homeTown;
  for (let i = 0; i < genderInfo.length; i++) {
    if (genderInfo[i].value == students[findStudent].gender) {
      console.log(students[findStudent]);
      genderInfo[i].checked;
    }
  }

  console.log(students[findStudent]);
  renderInfo(students);
}

function sortStudent() {
  students.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
  renderInfo(students);
}

sortBtn.addEventListener("click", sortStudent);

function searchByName(key) {
  const searchResults = students.filter((student) =>
    student.name.toLowerCase().includes(key.toLowerCase())
  );
  renderInfo(searchResults);
}

searchBtn.addEventListener("click", () => {
  let keyword = searchInfo.value;
  searchByName(keyword);
});
