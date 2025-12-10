document.addEventListener("DOMContentLoaded", () => {
  const postSection = document.querySelector(".post-section");
  postSection.innerHTML = "";

  fetch("/byuiknow/api/posts.php")
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        postSection.innerHTML = `<p>Error loading posts: ${data.error}</p>`;
        return;
      }

      if (data.length === 0) {
        postSection.innerHTML = "<p>No posts available.</p>";
        return;
      }

      data.forEach((post) => {
        const card = document.createElement("div");
        card.classList.add("post-card");

        const title = document.createElement("h4");
        title.textContent = post.title;
        card.appendChild(title);

        const username = document.createElement("p");
        username.textContent = post.username;
        card.appendChild(username);

        const img = document.createElement("img");
        img.src = "images/placeholder.png";
        img.alt = post.title;
        card.appendChild(img);

        const desc = document.createElement("p");
        desc.classList.add("description");
        desc.textContent = post.question_content;
        card.appendChild(desc);

        const tagsContainer = document.createElement("div");
        tagsContainer.classList.add("tags");
        post.tags.forEach(tag => {
          const tagSpan = document.createElement("span");
          tagSpan.textContent = `#${tag}`;
          tagsContainer.appendChild(tagSpan);
        });
        card.appendChild(tagsContainer);

        const share = document.createElement("span");
        share.classList.add("share-tag");
        share.textContent = "SHARE";
        card.appendChild(share);

        postSection.appendChild(card);
      });
    })
    .catch(err => {
      postSection.innerHTML = `<p>failed t get posts: ${err}</p>`;
    });
});
