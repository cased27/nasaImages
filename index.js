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

const pageDisplay = document.querySelector('#searchResultsFill')
pageDisplay.addEventListener('click', e => {    
    const img = document.querySelector('img');
    const recallImgSrc = img.src;
    expandImg(img, recallImgSrc)
})

function displayResults(content, img, title, desc) {
    content.innerHTML = `
            <div class="box">
                <article class="media">
                    <div class="media-left">
                        <figure class="image is-128x128">
                            <img src="${img}" alt="image"/>
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
};

function expandImg(item, src) {
    const modal = document.createElement('div');
    const img = document.querySelector('img')
    modal.classList.add('modal');
    document.addEventListener('click', e => {
        if (img.contains(e.target)) {
           modal.classList.add('is-active')
        } else {
            modal.classList.remove('is-active')
       }
    });
    modal.innerHTML = `
        <div class="modal-background"></div>
        <div class="modal-content">
            <p class="image is-10by12">
            <img src="${src}" alt="">
            </p>
        </div>
`;
    item.insertAdjacentElement('beforebegin', modal)
}
