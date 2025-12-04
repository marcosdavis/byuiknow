const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

async function loadPost() {
    if (!postId) {
        console.error("No post ID provided");
        return;
    }

    try {
        // impelment when api is ready 

        // const response = await fetch(`api/post.php?id=${postId}`);
        // const post = await response.json();
        // displayPost(post);
        
        console.log(`Loading post with ID: ${postId}`);
    } catch (error) {
        console.error("Error loading post:", error);
    }
}

function displayPost(post) {
    document.querySelector('.post-title').textContent = post.title;
    document.querySelector('.author strong').textContent = post.author;
    document.querySelector('.date').textContent = post.date;
    document.querySelector('.views').textContent = `👁 ${post.views} views`;
    
    const tagsContainer = document.querySelector('.post-tags');
    tagsContainer.innerHTML = '';
    post.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = `#${tag}`;
        tagsContainer.appendChild(tagSpan);
    });
    // update post image, pots body, like count 
    document.querySelector('.post-image img').src = post.image;
    document.querySelector('.post-body').innerHTML = post.content;
    document.querySelector('.like-btn span:last-child').textContent = `Like (${post.likes})`;
}

const likeBtn = document.querySelector('.like-btn');
let isLiked = false;

likeBtn.addEventListener('click', async () => {
    isLiked = !isLiked;
    
    if (isLiked) {
        likeBtn.style.backgroundColor = '#e3f2fd';
        likeBtn.style.color = '#1976d2';
        likeBtn.querySelector('.material-icons').textContent = 'thumb_up';
    } else {
        likeBtn.style.backgroundColor = 'white';
        likeBtn.style.color = 'inherit';
        likeBtn.querySelector('.material-icons').textContent = 'thumb_up';
    }
    
    // impelment when api is ready 
    // await fetch(`api/like-post.php`, {
    //     method: 'POST',
    //     body: JSON.stringify({ postId: postId, action: isLiked ? 'like' : 'unlike' })
    // });
});

const shareBtn = document.querySelector('.share-btn');

shareBtn.addEventListener('click', () => {
    const postUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: document.querySelector('.post-title').textContent,
            url: postUrl
        }).catch(err => console.log('Error sharing:', err));
    } else {
        navigator.clipboard.writeText(postUrl).then(() => {
            alert('Link copied to clipboard!');
        });
    }
});

const bookmarkBtn = document.querySelector('.bookmark-btn');
let isBookmarked = false;

bookmarkBtn.addEventListener('click', async () => {
    isBookmarked = !isBookmarked;
    
    if (isBookmarked) {
        bookmarkBtn.querySelector('.material-icons').textContent = 'bookmark';
        bookmarkBtn.style.color = '#1976d2';
    } else {
        bookmarkBtn.querySelector('.material-icons').textContent = 'bookmark_border';
        bookmarkBtn.style.color = 'inherit';
    }
    
    // impelment when api is ready 
    // await fetch(`api/bookmark-post.php`, {
    //     method: 'POST',
    //     body: JSON.stringify({ postId: postId, action: isBookmarked ? 'save' : 'unsave' })
    // });
});

const submitCommentBtn = document.querySelector('.submit-comment-btn');
const commentInput = document.getElementById('comment-input');

submitCommentBtn.addEventListener('click', async () => {
    const commentText = commentInput.value.trim();
    
    if (!commentText) {
        alert('Please enter a comment');
        return;
    }
    // impelment when api is ready 
    // await fetch(`api/add-comment.php`, {
    //     method: 'POST',
    //     body: JSON.stringify({ postId: postId, comment: commentText })
    // });
    
    addCommentToPage({
        author: 'Current User',
        date: 'Just now',
        text: commentText,
        likes: 0
    });
    
    commentInput.value = '';
});

function addCommentToPage(comment) {
    const commentsList = document.querySelector('.comments-list');
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    
    commentDiv.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-date">${comment.date}</span>
        </div>
        <p class="comment-text">${comment.text}</p>
        <div class="comment-actions">
            <button class="comment-like">
                <span class="material-icons">thumb_up</span>
                <span>${comment.likes}</span>
            </button>
            <button class="comment-reply">Reply</button>
        </div>
    `;
    
    commentsList.insertBefore(commentDiv, commentsList.firstChild);
    
    attachCommentEventListeners(commentDiv);
}

//  event listeners
function attachCommentEventListeners(commentElement) {
    const likeBtn = commentElement.querySelector('.comment-like');
    const replyBtn = commentElement.querySelector('.comment-reply');
    
    likeBtn.addEventListener('click', function() {
        const likesSpan = this.querySelector('span:last-child');
        const currentLikes = parseInt(likesSpan.textContent);
        likesSpan.textContent = currentLikes + 1;
        this.style.color = '#1976d2';
    });
    
    replyBtn.addEventListener('click', function() {
        commentInput.focus();
        const author = commentElement.querySelector('.comment-author').textContent;
        commentInput.value = `@${author} `;
    });
}
//

document.querySelectorAll('.comment').forEach(comment => {
    attachCommentEventListeners(comment);
});

// Related post click handlers
document.querySelectorAll('.related-post-card').forEach(card => {
    card.addEventListener('click', function() {
        // window.location.href = `post.html?id=${relatedPostId}`;
        console.log('Related post clicked');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    loadPost();
});