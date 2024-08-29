window.burgers = [
    {
        type: "burger",
        foodId: "B1001",
        foodName: "Classic Burger ( Large )",
        price: "750",
        discount: "0",
        img: "B1001",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1002",
        foodName: "Classic Burger ( Regular )",
        price: "1500",
        discount: "15",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1003",
        foodName: "Turkey Burger",
        price: "1600",
        discount: "0",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1004",
        foodName: "Chicken Burger ( Large )",
        price: "1400",
        discount: "0",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1005",
        foodName: "Chicken Burger ( Regular )",
        price: "800",
        discount: "20",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1006",
        foodName: "Cheese Burger ( Large )",
        price: "1000",
        discount: "0",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1007",
        foodName: "Cheese Burger ( Regular )",
        price: "600",
        discount: "0",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1008",
        foodName: "Bacon Burger",
        price: "650",
        discount: "15",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "2",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1009",
        foodName: "Shawarma Burger",
        price: "800",
        discount: "0",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1010",
        foodName: "Olive Burger",
        price: "1800",
        discount: "0",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "10",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1012",
        foodName: "Double-Cheese Burger",
        price: "1250",
        discount: "20",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1013",
        foodName: "Crispy Chicken Burger ( Regular )",
        price: "1200",
        discount: "0",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "5",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1014",
        foodName: "Crispy Chicken Burger ( Large )",
        price: "1600",
        discount: "10",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    },
    {
        type: "burger",
        foodId: "B1015",
        foodName: "Paneer Burger",
        price: "900",
        discount: "0",
        img: "",
        passkey: "123456",
        time: "",
        date: "",
        stock: "20",
        exp: "2024-09-10"
    }
];


document.addEventListener('DOMContentLoaded', (event) => {
    function displayBurgers(burgers) {
        const container = document.getElementById('data-container');
        
        if (!container) {
            console.error('Element with ID "data-container" not found.');
            return;
        }

        // Clear the container before appending new items
        container.innerHTML = '';

        burgers.forEach(burger => {
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
    displayBurgers(window.burgers);
});


// Function to check if an image exists at the given path
function imageExists(image_url){
    const http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
}




