const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'reviews_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected');
});

// Setup Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Store new review
app.post('/api/reviews', upload.single('picture'), (req, res) => {
  const { name, email, feedback } = req.body;
  const image_url = `/uploads/${req.file.filename}`;

  const query = 'INSERT INTO reviews (name, email, image_url, feedback) VALUES (?, ?, ?, ?)';
  db.query(query, [name, email, image_url, feedback], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Review added successfully' });
  });
});

// Get reviews (last 10 reviews)
app.get('/api/reviews', (req, res) => {
  const query = 'SELECT * FROM reviews ORDER BY created_at DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Function to submit the review
document.getElementById('feedbackForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const formData = new FormData(this);
  
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        alert('Review submitted successfully');
        loadReviews(); // Reload reviews after submitting a new one
      } else {
        alert('Error submitting review');
      }
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('There was an issue submitting your review');
    }
  });
  
  // Function to load reviews for the slideshow
  async function loadReviews() {
    try {
      const response = await fetch('/api/reviews');
      const reviews = await response.json();
  
      const reviewContainer = document.getElementById('reviewsContainer');
      reviewContainer.innerHTML = ''; // Clear existing reviews
  
      reviews.forEach((review) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.innerHTML = `
          <img src="${review.image_url}" alt="Client Picture" class="client-image"/>
          <h4>${review.name}</h4>
          <p>${review.feedback}</p>
        `;
        reviewContainer.appendChild(reviewCard);
      });
    } catch (err) {
      console.error('Error loading reviews:', err);
    }
  }
  
  // Load the reviews when the page is ready
  document.addEventListener('DOMContentLoaded', loadReviews);
    
  document.addEventListener('DOMContentLoaded', function () {
    // Array to hold the blog posts data
    const blogPosts = [
        {
            title: "HOW TO CHOOSE THE PERFECT SHORT-TERM RENTAL FOR YOUR STAY",
            date: "15th August 2024",
            imageUrl: "images/blog1.jpg",
            link: "admin/post1.html"
        },
        {
            title: "MUST-SEE PLACES TO VISIT IN EMBU",
            date: "28th March 2024",
            imageUrl: "images/blog2.jpg",
            link: "blog-single.html"
        },
        {
            title: "HOW TO USE BOOKING.COM TO BOOK YOUR NEXT STAY",
            date: "18th January 2024",
            imageUrl: "images/blog3.jpg",
            link: "blog-single.html"
        }
    ];

    // Container where the blogs will be displayed
    const blogsContainer = document.getElementById('blogs-container');

    // Function to create a blog post card
    function createBlogPostCard(post) {
        return `
            <div class="col-md-4">
                <div class="blog-post-card">
                    <img src="${post.imageUrl}" alt="${post.title}">
                    <div class="card-body">
                        <h3><a href="${post.link}">${post.title}</a></h3>
                        <p>${post.date}</p>
                        <a href="${post.link}">Read More</a>
                    </div>
                </div>
            </div>
        `;
    }

    // Loop through the last 3 blog posts and add them to the DOM
    blogPosts.slice(0, 3).forEach(post => {
        blogsContainer.innerHTML += createBlogPostCard(post);
    });
});

//In case change of video to ensure it is dynamic
document.addEventListener('DOMContentLoaded', function() {
    const heroVideoDesktop = document.getElementById('hero-video-desktop');
    const heroVideoMobile = document.getElementById('hero-video-mobile');

    function adjustHeroVideo() {
        if (window.innerWidth >= 768) { // Medium screen and larger
            heroVideoDesktop.style.display = 'block';
            heroVideoMobile.style.display = 'none';
        } else { // Small screen (mobile)
            heroVideoDesktop.style.display = 'none';
            heroVideoMobile.style.display = 'block';
        }
    }

    adjustHeroVideo(); // Run on page load
    window.addEventListener('resize', adjustHeroVideo); // Run on window resize
});

<script>
    document.addEventListener('DOMContentLoaded', async function () {
        const response = await fetch('/.netlify/functions/fetchReviews');
        const reviews = await response.json();

        const reviewContainer = document.getElementById('review-slides');
        reviewContainer.innerHTML = reviews.map(review => `
            <div class="slide">
                <h3>${review.name}</h3>
                <p>${review.message}</p>
                ${review.pictureUrl ? `<img src="${review.pictureUrl}" alt="User Picture">` : ''}
            </div>
        `).join('');
    });
</script>
let currentSlide = 0; // Initialize current slide index
const reviewsSlideshow = document.getElementById('reviews-slideshow');
const reviewCards = document.querySelectorAll('.review-card');
const totalSlides = reviewCards.length;
const slideWidth = reviewCards[0].clientWidth;

// Function to update the slideshow position
function updateSlideshowPosition() {
    const newTransform = -currentSlide * slideWidth;
    reviewsSlideshow.style.transform = `translateX(${newTransform}px)`;
}

// Event listener for the "Previous" button
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlideshowPosition();
    }
});

// Event listener for the "Next" button
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSlideshowPosition();
    }
});

// Adjust the slide width on window resize
window.addEventListener('resize', () => {
    slideWidth = reviewCards[0].clientWidth;
    updateSlideshowPosition();
});

