window.pasta = [
    {
        "type": "pasta",
        "foodId": "B1031",
        "foodName": "Chicken n Cheese Pasta",
        "price": "1600",
        "discount": "15",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    },
    {
        "type": "pasta",
        "foodId": "B1032",
        "foodName": "Chicken Penne Pasta",
        "price": "1700",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    },
    {
        "type": "pasta",
        "foodId": "B1033",
        "foodName": "Ground Turkey Pasta Bake",
        "price": "2900",
        "discount": "10",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    },
    {
        "type": "pasta",
        "foodId": "B1034",
        "foodName": "Creamy Shrimp Pasta",
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
        "type": "pasta",
        "foodId": "B1035",
        "foodName": "Lemon Butter Pasta",
        "price": "1950",
        "discount": "0",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    },
    {
        "type": "pasta",
        "foodId": "B1036",
        "foodName": "Tagliatelle Pasta",
        "price": "2400",
        "discount": "1",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    },
    {
        "type": "pasta",
        "foodId": "B1037",
        "foodName": "Baked Ravioli",
        "price": "2000",
        "discount": "1",
        "img": "",
        "passkey": "123456",
        "time": "",
        "date": "",
        "stock": "20",
        "exp": "2024-09-10"
    }
];


function displayPasta(pasta) {
    const container = document.getElementById('data-container');

    pasta.forEach(burger => {
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
displayPasta(pasta);
