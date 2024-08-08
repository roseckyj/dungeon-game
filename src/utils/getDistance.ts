export const getDistance = (
    coord1: [number, number],
    coord2: [number, number]
): number => {
    const radius = 6371e3; // Earth's radius in meters
    const [lat1, lon1] = coord1.map((degree) => (degree * Math.PI) / 180); // Convert degrees to radians
    const [lat2, lon2] = coord2.map((degree) => (degree * Math.PI) / 180); // Convert degrees to radians

    const deltaLat = lat2 - lat1;
    const deltaLon = lon2 - lon1;

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLon / 2) *
            Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return radius * c; // Distance in meters
};
