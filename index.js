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
    const searchData = document.createElement('div')
    const imgSrc = data.hdurl === undefined ? data.url : data.hdurl;
    searchData.innerHTML = `
        <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-128x128">
                        <a>
                        <img src="${imgSrc}" alt="image"/>
                        </a>
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p><strong>${data.title}</strong>
                            <br>
                            ${data.explanation}
                        </p>
                    </div>
                </div>
            </article>
        </div>
        <br>
        `;
    document.querySelector('#searchDataFill').insertAdjacentElement('afterbegin', searchData);
    
    
    document.addEventListener('click', e => {
        const imgContainer = document.querySelector('a');
        const searchElement = document.querySelector('#searchDataFill')
        if (!searchElement.contains(e.target)) {
            imgContainer.href = '#';
        } else {
            imgContainer.href = `${imgSrc}`;
            imgContainer.target = '_blank';
        }
    })

};
input.addEventListener('input', debounce(onInput, 300));


