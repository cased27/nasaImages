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
                        <img src="${imgSrc}" alt="image"/>
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
        enlargeImg()
    })

};
input.addEventListener('input', debounce(onInput, 300));

function enlargeImg() {
    const imgContainer = document.querySelector('#enlargeImgBox');
    imgContainer.classList.add('m-0')
    const image = document.querySelector('img');
    image.classList.add('enlarge')
    document.querySelector('#enlargeImgBox').insertAdjacentElement('afterbegin', image)
}


//Auto close the enlarged img window upon click anywhere
// document.addEventListener('click', e => {
//     const searchElement = document.querySelector('#searchDataFill')
//     if (!searchElement.contains(e.target)) {
//         //add/remove the class to open/close popup
//         // dropdown.classList.remove('is-active');
//     }
// })


// image.addEventListener('mouseover', () => {
//     image.classList.add("enlarge");

// })



