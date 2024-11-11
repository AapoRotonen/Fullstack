// JavaScript file
// Get the canvas element
var ctx = document.getElementById("myChart").getContext("2d");

// Define the JSON data
var data = {
  labels: ["HTML", "CSS", "JavaScript", "React", "Node", "Git"],
  datasets: [{
    label: "Skill",
    data: [9, 7, 3, 5, 2, 3],
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)"
    ],
    borderColor: [
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 206, 86)",
      "rgb(75, 192, 192)",
      "rgb(153, 102, 255)",
      "rgb(255, 159, 64)"
    ],
    borderWidth: 1
  }]
};

// Create a new chart instance
var myChart = new Chart(ctx, {
  type: "bar",
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          max: 10
        }
      }
    }
  }
});
