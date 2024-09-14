// blogs.js

document.addEventListener('DOMContentLoaded', function() {
    // Load blogs from localStorage
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const blogContainer = document.querySelector('.grid');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function displayBlogs(blogsToDisplay) {
        blogContainer.innerHTML = '';
        blogsToDisplay.forEach((blog) => {
            const blogHTML = `
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <a href="#" class="block">
                        <img src="${blog.coverPhoto}" alt="${blog.title}" class="w-full h-48 object-cover">
                    </a>
                    <div class="p-4">
                        <h2 class="text-xl font-bold mb-2"><a href="#" class="hover:text-blue-600">${blog.title}</a></h2>
                        <p class="text-gray-600 mb-2">${blog.author} | ${blog.date}</p>
                        <p class="text-gray-700 mb-4">${blog.metaTag}</p>
                        <a href="#" class="text-blue-600 hover:text-blue-800">Continue Reading →</a>
                    </div>
                </div>
            `;
            blogContainer.innerHTML += blogHTML;
        });
    }

    function filterBlogs(query) {
        return blogs.filter(blog => 
            blog.title.toLowerCase().includes(query.toLowerCase()) ||
            blog.metaTag.toLowerCase().includes(query.toLowerCase()) ||
            blog.content.toLowerCase().includes(query.toLowerCase())
        );
    }

    searchButton.addEventListener('click', function() {
        const query = searchInput.value.trim();
        if (query) {
            const filteredBlogs = filterBlogs(query);
            displayBlogs(filteredBlogs);
        } else {
            displayBlogs(blogs);
        }
    });

    // Initial display
    displayBlogs(blogs);

    // Admin form handling
    const adminForm = document.getElementById('admin-form');
    adminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const newBlog = {
            title: adminForm.title.value,
            coverPhoto: adminForm['cover-photo'].value,
            author: adminForm.author.value,
            date: adminForm.date.value,
            metaTag: adminForm.content.value.slice(0, 100) + '...',
            content: adminForm.content.value
        };
        blogs.unshift(newBlog);
        localStorage.setItem('blogs', JSON.stringify(blogs));
        displayBlogs(blogs);
        adminForm.reset();
    });
});
