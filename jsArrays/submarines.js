window.submarines = [
    {
        "type": "submarines",
        "foodId": "B1016",
        "foodName": "Crispy Chicken Submarine (Large)",
        "price": "2000",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "submarines",
        "foodId": "B1017",
        "foodName": "Crispy Chicken Submarine (Regular)",
        "price": "1500",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "submarines",
        "foodId": "B1018",
        "foodName": "Chicken Submarine (Large)",
        "price": "1800",
        "discount": "3",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "submarines",
        "foodId": "B1019",
        "foodName": "Chicken Submarine (Regular)",
        "price": "1400",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "submarines",
        "foodId": "B1020",
        "foodName": "Grinder Submarine",
        "price": "2300",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "submarines",
        "foodId": "B1021",
        "foodName": "Cheese Submarine",
        "price": "2200",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "submarines",
        "foodId": "B1022",
        "foodName": "Double Cheese n Chicken Submarine",
        "price": "1900",
        "discount": "16",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-08-10"
      },
      {
        "type": "submarines",
        "foodId": "B1023",
        "foodName": "Special Horgie Submarine",
        "price": "2800",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "submarines",
        "foodId": "B1024",
        "foodName": "MOS Special Submarine",
        "price": "3000",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-08-10"
      }
];


function displaySubmarines(submarines) {
    const container = document.getElementById('data-container1');

    submarines.forEach(submarines => {
        // Create card element
        const col = document.createElement('div');
        col.className = 'col';

        // Determine the correct image file type by checking the available extensions
        let imgSrc = '../foodImages/' + submarines.foodId;
        const imageExtensions = ['jpg', 'jpeg', 'png'];

        let imgFound = false;
        for (let ext of imageExtensions) {
            const imgPath = imgSrc + '.' + ext;
            if (imageExists(imgPath)) {
                imgSrc = imgPath;
                imgFound = true;
                break;
            }
        }

        // If no image found, use the placeholder
        if (!imgFound) {
            imgSrc = 'https://via.placeholder.com/300x200?text=No+Image';
        }

        col.innerHTML = `
            <div class='card'>
                <img src="${imgSrc}" alt="${submarines.foodName}">
                <div class="card-body">
                    <h5>${submarines.foodName}&nbsp;|&nbsp;${submarines.foodId}</h5>
                    <p class="price">Price: Rs. ${submarines.price}</p>
                    ${submarines.discount > 0 ? `<p class="discount">Discount: ${submarines.discount}%</p>` : '<br>'}
                    <p>Stock: ${submarines.stock}  &nbsp;&nbsp | &nbsp;&nbsp Exp : ${submarines.exp}</p>
                    <button onclick="buyBurger('${submarines.foodId}')">Edit</button>
                </div>
            </div>
        `;

        // Append card to container
        container.appendChild(col);
    });
}

// Function to check if an image exists at the given path
function imageExists(image_url){
    const http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}

// Function to handle the "Buy Now" button click
function buyBurger(foodId) {
    const burger = submariness.find(b => b.foodId === foodId);
    if (submarines) {
        alert(`You have selected ${submarines.foodName}.`);
    }
}

// Display the burgers
displaySubmarines(submarines);
