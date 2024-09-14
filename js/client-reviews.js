document.addEventListener('DOMContentLoaded', function () {
    // Placeholder for reviews
    let reviews = [
        { name: 'Martin Njogu', picture: './images/plc1.jpg', feedback: 'Great service, highly recommend!' },
        { name: 'Jane Smith', picture: './images/plc3.jpg', feedback: 'Lovely experience, very professional.' },
        { name: 'Alice Johnson', picture: './images/plc5.jpg', feedback: 'The apartments are well-maintained and spacious.' },
        { name: 'Maimuna Mohammed', picture: './images/plc6.jpg', feedback: 'A peaceful environment and friendly staff.' }
    ];

    const form = document.getElementById('feedback-form');
    const reviewsSlideshow = document.getElementById('reviews-slideshow');

    // Handle form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const picture = document.getElementById('picture').files[0];
        const feedback = document.getElementById('feedback').value;

        // Add new review
        const newReview = { name, picture: URL.createObjectURL(picture), feedback };
        reviews.unshift(newReview); // Add to the beginning

        if (reviews.length > 10) reviews.pop(); // Only keep the latest 10

        updateReviewsDisplay();
        form.reset(); // Clear the form
    });

    // Update the reviews slideshow
    function updateReviewsDisplay() {
        reviewsSlideshow.innerHTML = ''; // Clear previous reviews

        reviews.slice(0, 4).forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('bg-white', 'p-4', 'rounded-lg', 'shadow-md', 'text-center', 'max-w-xs', 'mx-2', 'flex', 'flex-col', 'items-center', 'w-64');

            const img = document.createElement('img');
            img.src = review.picture;
            img.alt = `${review.name}'s picture`;
            img.classList.add('w-24', 'h-24', 'rounded-full', 'mx-auto');

            const name = document.createElement('h4');
            name.textContent = review.name;
            name.classList.add('text-lg', 'font-semibold', 'mt-4');

            const feedback = document.createElement('p');
            feedback.textContent = review.feedback;
            feedback.classList.add('text-sm', 'text-gray-600', 'mt-2');

            reviewDiv.appendChild(img);
            reviewDiv.appendChild(name);
            reviewDiv.appendChild(feedback);
            reviewsSlideshow.appendChild(reviewDiv);
        });
    }

    // Initial display of reviews
    updateReviewsDisplay();

    // Set interval to update the slideshow every 10 seconds
    setInterval(() => {
        reviews.push(reviews.shift()); // Cycle the reviews
        updateReviewsDisplay();
    }, 10000); // 10 seconds interval
});

