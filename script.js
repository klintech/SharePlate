document.addEventListener('DOMContentLoaded', () => {
    const navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    navSlide();

    // Sample food items data
    const foodItems = [
        { name: 'Fresh Vegetables', quantity: '5 lbs', expiry: '2026-05-25', description: 'Assorted fresh vegetables including carrots, broccoli, and bell peppers.', category: 'vegetables', distance: 2, image: 'images/Fresh Vegetables.jpg' },
        { name: 'Canned Soup', quantity: '10 cans', expiry: '2026-01-01', description: 'Variety of canned soups including tomato, chicken noodle, and vegetable.', category: 'protein', distance: 5, image: 'images/Canned Soup.jpg' },
        { name: 'Bread', quantity: '3 loaves', expiry: '2026-05-23', description: 'Freshly baked whole wheat bread.', category: 'grains', distance: 1, image: 'images/Bread.jpg' },
        { name: 'Apples', quantity: '2 dozen', expiry: '2026-05-30', description: 'Red delicious apples, perfect for snacking or baking.', category: 'fruits', distance: 3, image: 'images/Red delicious apples, perfect for snacking or baking.jpg' },
        { name: 'Pasta', quantity: '5 boxes', expiry: '2026-06-15', description: 'Assorted pasta shapes including spaghetti, penne, and fusilli.', category: 'grains', distance: 4, image: 'images/Pasta.jpg' },
        { name: 'Rice', quantity: '10 lbs', expiry: '2025-12-31', description: 'Long-grain white rice.', category: 'grains', distance: 6, image: 'images/Rice.jpg' }
    ];

    const foodList = document.getElementById('food-list');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const donateForm = document.getElementById('donate-form');
    const categoryFilter = document.getElementById('category-filter');
    const distanceFilter = document.getElementById('distance-filter');

    function displayFoodItems(items) {
        foodList.innerHTML = '';
        items.forEach(item => {
            const foodItem = document.createElement('div');
            foodItem.classList.add('food-item');
            foodItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <p><strong>Expiry:</strong> ${item.expiry}</p>
                <p><strong>Distance:</strong> ${item.distance} miles</p>
                <p>${item.description}</p>
                <button onclick="claimFood('${item.name}')">Claim</button>
            `;
            foodList.appendChild(foodItem);
        });
    }

    function filterFoodItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const distance = parseInt(distanceFilter.value) || Infinity;

        return foodItems.filter(item => 
            (item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)) &&
            (category === '' || item.category === category) &&
            item.distance <= distance
        );
    }

    searchButton.addEventListener('click', () => {
        const filteredItems = filterFoodItems();
        displayFoodItems(filteredItems);
    });

    categoryFilter.addEventListener('change', () => {
        const filteredItems = filterFoodItems();
        displayFoodItems(filteredItems);
    });

    distanceFilter.addEventListener('change', () => {
        const filteredItems = filterFoodItems();
        displayFoodItems(filteredItems);
    });

    donateForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newItem = {
            name: document.getElementById('food-name').value,
            quantity: document.getElementById('quantity').value,
            expiry: document.getElementById('expiry-date').value,
            description: document.getElementById('description').value,
            category: 'other',
            distance: 0,
            image: 'https://source.unsplash.com/random/300x200/?food'
        };
        foodItems.push(newItem);
        displayFoodItems(foodItems);
        donateForm.reset();
        alert('Thank you for your donation!');
    });

    // Login Modal
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close');

    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Login Form
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        // Here you would typically send a request to your server to authenticate the user
        console.log(`Login attempt with email: ${email} and password: ${password}`);
        alert('Login functionality would be implemented here.');
        loginModal.style.display = 'none';
    });

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Here you would typically send a request to your server to add the email to your newsletter list
        console.log(`Newsletter signup with email: ${email}`);
        alert('Thank you for signing up for our newsletter!');
        newsletterForm.reset();
    });

    // Community Impact Stats Animation
    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const mealsShared = document.getElementById("meals-shared");
    const wasteReduced = document.getElementById("waste-reduced");
    const activeUsers = document.getElementById("active-users");

    animateValue(mealsShared, 0, 10000, 2000);
    animateValue(wasteReduced, 0, 5000, 2000);
    animateValue(activeUsers, 0, 1000, 2000);

    // Initial display of food items
    displayFoodItems(foodItems);
});

function claimFood(itemName) {
    alert(`You have claimed: ${itemName}`);
    // In a real application, you would update the database and refresh the list
}