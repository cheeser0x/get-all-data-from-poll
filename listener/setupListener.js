import getData from "../functions/getData.js";

export async function setupListener(stream) {
    let lastProcessedId = 0; // Tracks the last processed data point

    // Initial fetch to populate the stream with current data and set the lastProcessedId
    try {
        const initialActivities = await getData();
        if (initialActivities && initialActivities.length > 0) {
            initialActivities.forEach(activity => {
                stream.push(JSON.stringify(activity));
                lastProcessedId = Math.max(lastProcessedId, activity.id);
            });
        }
    } catch (error) {
        console.error('Error fetching initial activities:', error);
    }

    // Periodically fetch new activities
    setInterval(async () => {
        try {
            const activities = await getData();
            const newActivities = activities.filter(activity => activity.id > lastProcessedId);
            if (newActivities.length > 0) {
                newActivities.forEach(activity => {
                    stream.push(JSON.stringify(activity));
                    lastProcessedId = Math.max(lastProcessedId, activity.id);
                });
            }
        } catch (error) {
            console.error('Error in periodic activity fetch:', error);
        }
    }, 30 * 1000); // Polling every 30 seconds
}
