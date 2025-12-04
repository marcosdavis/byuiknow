async function loadPosts() {
    try {
        // wait for api to be ready then implement

        // const response = await fetch('api/post.php');
        // const posts = await response.json();
        // displayPosts(posts);
        
        // load real data but use dummy data for now 
        const dummyPosts = [
            {
                id: 1,
                title: "How to use a printer",
                subhead: "Campus Tutorial",
                image: "images/placeholder.png",
                description: "How to use a printer on campus",
                tags: ["#Printer", "#Tutorial"]
            },
            {
                id: 2,
                title: "Library Resources",
                subhead: "Study Tips",
                image: "images/placeholder.png",
                description: "Guide to using library resources",
                tags: ["#Library", "#Study"]
            },
            {
                id: 3,
                title: "Campus WiFi Setup",
                subhead: "Tech Help",
                image: "images/placeholder.png",
                description: "How to connect to campus WiFi",
                tags: ["#WiFi", "#Tech"]
            },
            {
                id: 4,
                title: "Meal Plan Guide",
                subhead: "Food Services",
                image: "images/placeholder.png",
                description: "Everything about meal plans",
                tags: ["#Food", "#Campus"]
            },
            {
                id: 5,
                title: "Bus Schedule",
                subhead: "Transportation",
                image: "images/placeholder.png",
                description: "Campus bus routes and times",
                tags: ["#Bus", "#Schedule"]
            },
            {
                id: 6,
                title: "Gym Access",
                subhead: "Recreation",
                image: "images/placeholder.png",
                description: "How to access the gym facilities",
                tags: ["#Gym", "#Recreation"]
            }
        ];
        
        displayPosts(dummyPosts);
    } catch (error) {
        console.error("Error loading posts:", error);
    }
}

function displayPosts(posts) {
    const postSection = document.querySelector('.post-section');
    postSection.innerHTML = ''; 
    
    posts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = `box${index + 1}`;
        postDiv.dataset.postId = post.id; // keep post id in atribut 
        
        postDiv.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.subhead}</p>
            <img src="${post.image}" alt="${post.title}" />
            <p class="description">${post.description}</p>
            ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            <span class="share-tag">SHARE</span>
        `;
        
        postDiv.addEventListener('click', function(e) {
            if (e.target.classList.contains('share-tag')) {
                e.stopPropagation();
                sharePost(post);
                return;
            }
            
            window.location.href = `post.html?id=${post.id}`;
        });
        
        postDiv.style.cursor = 'pointer';
        postDiv.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        postDiv.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        postSection.appendChild(postDiv);
    });
}

function sharePost(post) {
    const postUrl = `${window.location.origin}/post.html?id=${post.id}`;
    
    if (navigator.share) {
        navigator.share({
            title: post.title,
            text: post.description,
            url: postUrl
        }).catch(err => console.log('Error sharing:', err));
    } else {
        navigator.clipboard.writeText(postUrl).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

const searchBtn = document.querySelector('#searchbar-container button');
const searchInput = document.querySelector('.search-bar');

searchBtn.addEventListener('click', () => {
    performSearch();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }
    
    console.log('Searching for:', searchTerm);
    
    // wait for api to be ready then implement
    // const response = await fetch(`api/search.php?q=${encodeURIComponent(searchTerm)}`);
    // const results = await response.json();
    // displayPosts(results);
    
    // use dummy posts for now
    const allPosts = document.querySelectorAll('.post-section > div');
    allPosts.forEach(post => {
        const title = post.querySelector('h4').textContent.toLowerCase();
        const description = post.querySelector('.description').textContent.toLowerCase();
        const searchLower = searchTerm.toLowerCase();
        
        if (title.includes(searchLower) || description.includes(searchLower)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

const sortSelect = document.querySelector('.multi-select.sort');

sortSelect.addEventListener('change', function() {
    const sortType = this.value;
    console.log('Sorting by:', sortType);
    
    // wait for api to be ready then implement
    // const response = await fetch(`api/post.php?sort=${sortType}`);
    // const sortedPosts = await response.json();
    // displayPosts(sortedPosts);
});

const tagSelect = document.querySelector('.multi-select.tag');

tagSelect.addEventListener('change', function() {
    const selectedTag = this.value;
    console.log('Filtering by tag:', selectedTag);
    
    if (!selectedTag) {
        document.querySelectorAll('.post-section > div').forEach(post => {
            post.style.display = 'block';
        });
        return;
    }
    // wait for api to be ready then implement
    // const response = await fetch(`api/post.php?tag=${selectedTag}`);
    // const filteredPosts = await response.json();
    // displayPosts(filteredPosts);
    
    // For now, filter visible posts
    document.querySelectorAll('.post-section > div').forEach(post => {
        const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent);
        if (tags.some(tag => tag.includes(selectedTag))) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});

window.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});