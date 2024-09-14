document.getElementById('blogPostForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Capture form data
    const title = document.getElementById('blogTitle').value;
    const meta = document.getElementById('blogMeta').value;
    const coverImage = document.getElementById('coverImage').files[0];
    const author = document.getElementById('authorName').value;
    const content = document.getElementById('blogContent').value;
    const additionalImages = document.getElementById('additionalImages').files;

    // Process and store the data (you'll need backend code for saving the data)
    console.log("Blog Post Data: ", {
        title,
        meta,
        coverImage,
        author,
        content,
        additionalImages
    });

    // Optionally, send this data to your server or store it in local storage
    // For example, using AJAX or Fetch API to send data to a server
});
