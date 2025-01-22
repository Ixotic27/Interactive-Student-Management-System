const students = [];
const allCities = ["Delhi", "Dehradun", "Durgapur", "Darjeeling", "Mumbai", "Chennai", "Kolkata", "Hyderabad", "Bangalore", "Pune"]; // Example list

// Populate cities in the dropdown
window.onload = () => {
  const cityDropdown = document.getElementById("city");
  allCities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    cityDropdown.appendChild(option);
  });
};

// Filter cities dynamically
function filterCities() {
  const searchValue = document.getElementById("citySearch").value.toLowerCase();
  const cityDropdown = document.getElementById("city");
  cityDropdown.innerHTML = ""; // Clear current options
  allCities
    .filter(city => city.toLowerCase().startsWith(searchValue))
    .forEach(filteredCity => {
      const option = document.createElement("option");
      option.value = filteredCity;
      option.textContent = filteredCity;
      cityDropdown.appendChild(option);
    });
}

// Add predefined subjects
function addPredefinedSubject() {
  const subjectSelect = document.getElementById("subjectSelect");
  const subjectName = subjectSelect.value;
  const subjectsData = JSON.parse(document.getElementById("subjectsData").value || "[]");
  const subjectsList = document.getElementById("subjectsList");

  // Prevent duplicates
  if (!subjectsData.find(sub => sub.sub === subjectName)) {
    subjectsData.push({ sub: subjectName, marks: "N/A" }); // Marks not required for predefined subjects
    document.getElementById("subjectsData").value = JSON.stringify(subjectsData);

    const subjectEntry = document.createElement("div");
    subjectEntry.textContent = `${subjectName}`;
    subjectsList.appendChild(subjectEntry);
  }
}

// Save student
function saveStudent() {
  const name = document.getElementById("name").value.trim();
  const age = parseInt(document.getElementById("age").value);
  const city = document.getElementById("city").value.trim();
  const subjects = JSON.parse(document.getElementById("subjectsData").value || "[]");

  if (name && !isNaN(age) && city) {
    students.push({ name, age, city, subjects });

    alert("Student added successfully!");

    // Clear form and subjects
    document.getElementById("studentForm").reset();
    document.getElementById("subjectsList").innerHTML = "";
    document.getElementById("subjectsData").value = "";
  } else {
    alert("Please fill out all fields to add a student.");
  }
}

// Display students
function displayStudents() {
  const output = document.getElementById("output");
  output.innerHTML = ""; // Clear previous output

  if (students.length === 0) {
    output.textContent = "No students to display.";
  } else {
    students.forEach((student, index) => {
      const studentCard = `
        <div class="student-card">
          <h4>Student ${index + 1}</h4>
          <p><strong>Name:</strong> ${student.name}</p>
          <p><strong>Age:</strong> ${student.age}</p>
          <p><strong>City:</strong> ${student.city}</p>
          <p><strong>Subjects:</strong></p>
          <ul>
            ${student.subjects.map(sub => `<li>${sub.sub}: ${sub.marks} marks</li>`).join("")}
          </ul>
        </div>
      `;
      output.innerHTML += studentCard;
    });
  }
}

// Toggle theme
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}
