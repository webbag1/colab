const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  
  // Adjust the date to local timezone
  function adjustDateToLocal(dateString) {
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date;
  }
  
  function generateCalendar(month, year, names, records) {
    const monthName = months[month];
    const daysInMonth = new Date(year, month + 1, 0).getUTCDate();
  
    let calendarHTML = `
      <h3>${monthName} ${year}</h3>
      <table>
        <tr>
          <th>Name</th>
          <th colspan="${daysInMonth}">Weight</th>
          <th>Total Weight</th>
          <th>Commission</th>
          <th>Net Payable</th>
          <th>Paid</th>
          <th>Unpaid</th>
        </tr>
        <tr>
          <td></td>
    `;
  
    for (let i = 1; i <= daysInMonth; i++) {
      calendarHTML += `<td>${i}</td>`;
    }
  
    calendarHTML += `
        <td>Total Weight</td>
        <td>Commission Value</td>
        <td>Net Payable Value</td>
        <td>Paid Value</td>
        <td>Unpaid Value</td>
      </tr>
    `;
  
    names.forEach(name => {
      let totalWeight = 0; // Initialize total weight for the row
      calendarHTML += `<tr><td>${name}</td>`;
      for (let i = 1; i <= daysInMonth; i++) {
        const record = records.find(entry => entry.name === name && adjustDateToLocal(entry.date).getUTCDate() === i);
        if (record) {
          totalWeight += parseFloat(record.weight); // Add weight to total weight
          calendarHTML += `<td>${record.weight}</td>`;
        } else {
          calendarHTML += `<td></td>`;
        }
      }
      calendarHTML += `
        <td>${totalWeight.toFixed(2)}</td> <!-- Display total weight for the row -->
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>`;
    });
  
    calendarHTML += `</table>`;
    document.getElementById('calendar').innerHTML = calendarHTML;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3300/getrecords')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const names = data.map(entry => entry.name);
        generateCalendar(currentMonth, currentYear, names, data);
      })
      .catch(error => console.error('Error:', error));
  });
  
  function prevMonth() {
    console.log("Previous month button clicked");
    currentMonth -= 1;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear -= 1;
    }
    generateCalendar(currentMonth, currentYear);
  }
  
  function nextMonth() {
    currentMonth += 1;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear += 1;
    }
    generateCalendar(currentMonth, currentYear);
  }
  
  
  generateCalendar(currentMonth, currentYear);
  