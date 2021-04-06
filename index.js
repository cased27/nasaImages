const fetchData = async (searchTerm) => {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
        params: {
            api_key: 'azR1RTXJ6KG4pno6gZDcV3KtBtXpwNxpOkp3qquj',
            date: searchTerm
        }
    });
    if (response.data.error) {
        return [];
    }
    return response.data
};

const displayResults = (content, src, title, desc) => {
    content.innerHTML = `
            <div class="box">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-128x128">
                        <img src="${src}" alt="image" class="thumbnail-image"/>
                            <div class="modal">
                                <div class="modal-background"></div>
                                <div class="modal-content">
                                    <p class="image is-6by8">
                                        <img src="${src}" alt="image" class="modal-image" />
                                    </p>
                                </div>
                            
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p><strong>${title}</strong>
                                <br>
                                ${desc}
                            </p>
                        </div>
                    </div>
                </article>
            </div>
            <br>
            `;
    document.querySelector('#searchResultsFill').insertAdjacentElement('afterbegin', content);
    
    const modal = content.querySelector('.modal')
    const img = content.querySelector('img')
    document.addEventListener('click', (e) => {
        if (!img.contains(e.target)) {
            modal.classList.remove('is-active');
        } else {
            modal.classList.add('is-active')
        }
    });
};

const input = document.querySelector('input');
const onInput = async e => {
    const data = await fetchData(e.target.value)
    const searchResults = document.createElement('div');
    const imgSrc = data.hdurl === undefined ? data.url : data.hdurl;
    const title = data.title;
    const desc = data.explanation;
    displayResults(searchResults, imgSrc, title, desc);
};
input.addEventListener('input', debounce(onInput, 300));