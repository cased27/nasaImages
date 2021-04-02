const fetchData = async () => {
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
        params: {
            api_key: 'azR1RTXJ6KG4pno6gZDcV3KtBtXpwNxpOkp3qquj',
            start_date: '2021-03-01',
            end_date: ''
        }
    });
    console.log(response.data)
}

fetchData()