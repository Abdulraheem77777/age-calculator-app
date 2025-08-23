class AgeCalculator {
  constructor() {
    this._parentElement = document.querySelector(".form");
    this._inputDay = document.getElementById("day");
    this._inputMonth = document.getElementById("month");
    this._inputYear = document.getElementById("year");
    this._handleForm();
  }
  _handleForm() {
    this._parentElement.addEventListener(
      "submit",
      this._0nFormSubmission.bind(this)
    );
  }
  _0nFormSubmission(e) {
    e.preventDefault();
    this._clearErrors();
    const formData = [...new FormData(this._parentElement)];
    const data = Object.fromEntries(formData);
    const input = [this._inputDay, this._inputMonth, this._inputYear];
    let isValid = true;

    // Validating if the inputs are empty
    if (!data.day.trim()) {
      this._showError(this._inputDay, "This field is required");
      isValid = false;
    }
    if (!data.month.trim()) {
      this._showError(this._inputMonth, "This field is required");
      isValid = false;
    }
    if (!data.year.trim()) {
      this._showError(this._inputYear, "This field is required");
      isValid = false;
    }
    // Validating if the inputs are invalid(day.month/year)
    // Day must be 1–31
    if (data.day < 1 || data.day > 31) {
      this._showError(this._inputDay, "Must be a valid day");
      isValid = false;
    }
    //Month must be 1-12
    if (data.month < 1 || data.month > 12) {
      this._showError(this._inputMonth, "Must be a valid month");
      isValid = false;
    }
    //the year must be less than or equal to the current year
    const currentYear = new Date().getFullYear();
    if (data.year < 1000 || data.year > currentYear) {
      this._showError(this._inputYear, "Must be a valid year");
      isValid = false;
    }
    if (isValid) {
      this._parentElement.reset();
      //get the input values(form data) and convert to number
      const inputDay = Number(data.day);
      const inputMonth = Number(data.month);
      const inputYear = Number(data.year);

      const birthDate = new Date(inputYear, inputMonth - 1, inputDay);
      //current Date
      const today = new Date();
      //the current date - the user's input
      let years = today.getFullYear() - birthDate.getFullYear();
      let months = today.getMonth() - birthDate.getMonth();
      let days = today.getDate() - birthDate.getDate();
      //to not get negative answer in the days
      if (days < 0) {
        months--; //Borrow one month
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate(); // Add total days in previous month
      }
      //to not get negative answer in the month
      if (months < 0) {
        years--; //Borrow one year
        months += 12;
      }

      const daysLabel = document.getElementById("day-label");
      const monthsLabel = document.getElementById("month-label");
      const yearsLabel = document.getElementById("year-label");
      const daysShow = document.getElementById("days");

      const monthsShow = document.getElementById("months");
      const yearsShow = document.getElementById("years");

      daysShow.textContent = days;

      monthsShow.textContent = months;

      yearsShow.textContent = years;

      daysLabel.textContent = days === 1 ? "day" : "days";
      monthsLabel.textContent = months === 1 ? "month" : "months";
      yearsLabel.textContent = years === 1 ? "year" : "years";
      // ✨ Countdown animation here
      countUp(daysShow, days, 2000);
      countUp(monthsShow, months, 2000);
      countUp(yearsShow, years, 2000);

      // 🧼 Clear the form after success
      this._parentElement.reset();
    }
  }
  _showError(inputEl, message) {
    const parent = inputEl.parentElement;
    const errorHTML = `<div class="error-msg"><p>${message}</p></div>`;
    parent.insertAdjacentHTML("beforeend", errorHTML);

    inputEl.style.outline = "1px solid hsl(7, 100%, 60%)"; //put this color
  }
  _clearErrors() {
    document.querySelectorAll(".error-msg").forEach((el) => el.remove());
    document.querySelectorAll("input").forEach((input) => {
      input.style.outline = "none";
    });
  }
}
const app = new AgeCalculator();
const today = new Date();
console.log(today);
function countUp(el, target, duration = 2000) {
  let start = 0;
  const stepTime = Math.max(Math.floor(duration / target), 20);
  const timer = setInterval(() => {
    el.textContent = start;
    start++;
    if (start > target) {
      el.textContent = target;
      clearInterval(timer);
    }
  }, stepTime);
}
