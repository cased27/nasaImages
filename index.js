const fetchData = async (searchTerm) => {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
        params: {
            api_key: 'azR1RTXJ6KG4pno6gZDcV3KtBtXpwNxpOkp3qquj',
            title: 'searchTerm'
        }
    });
    return response.data
}

const input = document.querySelector('input');


const onInput = async e => {
    const imgData = await fetchData(e.target.value)
    console.log(imgData)
    // for (let data of imgData) {

    // }
};
input.addEventListener('input', debounce(onInput, 500));
