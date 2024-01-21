export default async function getData() {
    try {
        const response = await fetch("http://localhost:3030/");
        
        if (response.ok) {
            const data = await response.json();
            return data
            // console.log('Data was successfully fetched:', data);
        } else {
            console.log('Failed to fetch data. Status:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// getData()