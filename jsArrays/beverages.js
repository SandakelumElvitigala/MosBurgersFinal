window.bev = [
    {
        "type": "beverages",
        "foodId": "B1044",
        "foodName": "Pepsi (330ml)",
        "price": "990",
        "discount": "5",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-08-01"
    },
    {
        "type": "beverages",
        "foodId": "B1045",
        "foodName": "Coca-Cola (330ml)",
        "price": "1230",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    },
    {
        "type": "beverages",
        "foodId": "B1046",
        "foodName": "Sprite (330ml)",
        "price": "1500",
        "discount": "3",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    },
    {
        "type": "beverages",
        "foodId": "B1047",
        "foodName": "Mirinda (330ml)",
        "price": "850",
        "discount": "7",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    }
];


function displayBev(bev) {
    const container = document.getElementById('data-container');

    bev.forEach(burger => {
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
displayBev(bev);
