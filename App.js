
const landing = document.getElementById("landing");
const starting = document.getElementById("starting");
const userName1 = document.getElementById("username1");
const userName2 = document.getElementById("username2");
starting.style.display = "none";



function toggleVisibility() {

  if ((userName1.value && userName2.value) === "" || (userName1.value.length && userName2.value.length) <= 4) {

    alert("Please fill the username first to be at 4 characters");

  } else {

    localStorage.setItem('user_name1', userName1.value);
    localStorage.setItem('user_name2', userName2.value);

    document.getElementById('placeName1').innerHTML = localStorage.getItem('user_name1')
    document.getElementById('placeName2').innerHTML = localStorage.getItem('user_name2')

    const boxContainer = document.createElement('div');
    boxContainer.style.display = 'grid';
    boxContainer.style.justifyContent = "center";
    boxContainer.style.gridTemplateColumns = 'repeat(20, 40px)';
    boxContainer.style.gridAutoRows = '40px';

    for (let i = 0; i < 400; i++) {

      const box = document.createElement('div');
      var currentPlayer = 'X';

      box.setAttribute("id", i);

      box.addEventListener('click', function (event) {
        if (event.target.textContent === '') {
          box.style.backgroundColor = 'green';
          event.target.textContent = currentPlayer;

          if (currentPlayer === 'X') {
            box.style.backgroundColor = 'red';
            currentPlayer = 'O';
          } else {
            currentPlayer = 'X';
          }
        }
      });
      box.style.border = ' 2px solid white ';
      box.setAttribute("class", 'box')
      box.style.borderRadius = '10px';
      boxContainer.appendChild(box);
    }

    document.getElementById('game').appendChild(boxContainer);


    if (landing.style.display === "block") {
      landing.style.display = "none";
    }
    if (starting.style.display === "none") {
      starting.style.display = "block";
      landing.style.display = "none";
    }
  }
}



