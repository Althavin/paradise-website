document.getElementById("blogForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form data
    const title = document.getElementById("title").value;
    const metaTag = document.getElementById("metaTag").value;
    const coverPhoto = document.getElementById("coverPhoto").files[0];
    const authorName = document.getElementById("authorName").value;
    const bodyContent = document.getElementById("bodyContent").value;
    const bodyImages = document.getElementById("bodyImages").files;
    const date = new Date().toLocaleDateString();

    // Create blog HTML structure
    const blogHTML = `
    <div class="blog-post">
        <img src="images/cover_photos/${coverPhoto.name}" alt="${title}" class="cover-photo">
        <h1>${title}</h1>
        <h4>${authorName} - ${date}</h4>
        <h2><i>${metaTag}</i></h2>
        <h3>${bodyContent}</h3>
        ${Array.from(bodyImages).map(image => `<img src="images/body_images/${image.name}" alt="">`).join('')}
    </div>`;

    // Save cover photo and body images (implement this if using server-side logic)
    // For now, this is just a representation.

    // Append blog to blogs.html
    // (This step is for client-side only, would require server-side logic to actually persist the data)

    // Assuming blogs.html has a container with id "blogContainer"
    const blogContainer = document.getElementById("blogContainer");
    blogContainer.innerHTML += blogHTML;

    // Also, update the latest blogs section on index.html if needed
    // Add code to update latest blogs section
});
