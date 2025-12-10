const carouselContainer = document.getElementById('carousel-container');
const nextBtn = document.getElementById('next-btn');
const backBtn = document.getElementById('back-btn');

let postArray = [];
let position = ['post-1', 'post-2', 'post-3'];
let currentIndex = 0;

async function loadTrendingPosts() {
    try {
        const response = await fetch('../api/trending.php');
        const posts = await response.json();

        if (!posts || posts.length === 0) {
            carouselContainer.innerHTML = '<p>No trending posts available.</p>';
            return;
        }

        carouselContainer.innerHTML = '';

        posts.slice(0, 3).forEach((post, index) => {
            const postDiv = document.createElement('div');
            postDiv.className = 'posts ' + position[index];
            postDiv.dataset.postId = post.question_id;

            postDiv.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.question_content}</p>
                <small>by ${post.username}</small>
                <div class="tags">${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join(' ')}</div>
            `;

            carouselContainer.appendChild(postDiv);
        });

        postArray = Array.from(carouselContainer.querySelectorAll('.posts'));
    } catch (err) {
        console.error('Failed to load posts:', err);
        carouselContainer.innerHTML = '<p>Failed to load posts.</p>';
    }
}

function showNextPost() {
    if (!postArray.length) return;
    postArray.push(postArray.shift());
    updatePositions();
}

function showPrevPost() {
    if (!postArray.length) return;
    postArray.unshift(postArray.pop());
    updatePositions();
}

function updatePositions() {
    postArray.forEach((post, index) => {
        post.className = 'posts ' + position[index];
    });
}
nextBtn.addEventListener('click', showNextPost);
backBtn.addEventListener('click', showPrevPost);

loadTrendingPosts();
