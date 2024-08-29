window.chicken = [
    {
        "type": "chicken",
        "foodId": "B1038",
        "foodName": "Fried Chicken (Small)",
        "price": "1200",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "chicken",
        "foodId": "B1039",
        "foodName": "Fried Chicken (Regular)",
        "price": "2300",
        "discount": "10",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "chicken",
        "foodId": "B1040",
        "foodName": "Fried Chicken (Large)",
        "price": "3100",
        "discount": "5",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "chicken",
        "foodId": "B1041",
        "foodName": "Hot Wings (Large)",
        "price": "2400",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "chicken",
        "foodId": "B1042",
        "foodName": "Devilled Chicken (Large)",
        "price": "900",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      },
      {
        "type": "chicken",
        "foodId": "B1043",
        "foodName": "BBQ Chicken (Regular)",
        "price": "2100",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
      }
];


function displayChicken(chicken) {
    const container = document.getElementById('data-container');

    chicken.forEach(burger => {
        // Create card element
        const col = document.createElement('div');
        col.className = 'col';

        // Determine the correct image file type by checking the available extensions
        let imgSrc = '../foodImages/' + burger.foodId;
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
                <img src="${imgSrc}" alt="${burger.foodName}">
                <div class="card-body">
                    <h5>${burger.foodName}&nbsp;|&nbsp;${burger.foodId}</h5>
                    <p class="price">Price: Rs. ${burger.price}</p>
                    ${burger.discount > 0 ? `<p class="discount">Discount: ${burger.discount}%</p>` : '<br>'}
                    <p>Stock: ${burger.stock}  &nbsp;&nbsp | &nbsp;&nbsp Exp : ${burger.exp}</p>
                    <button onclick="buyBurger('${burger.foodId}')">Edit</button>
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



// Display the burgers
displayChicken(chicken);
