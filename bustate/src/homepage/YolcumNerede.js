import React, { useState, useEffect } from 'react';

function YolcumNerede() {
    const [location, setLocation] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState(true);


    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            (position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => {
                console.error('Konum bilgisi alınamadı:', error);
            }
        );

        const updateConnectionStatus = () => {
            setConnectionStatus(navigator.onLine);
        };

        window.addEventListener('online', updateConnectionStatus);
        window.addEventListener('offline', updateConnectionStatus);

        return () => {

            navigator.geolocation.clearWatch(watchId);
            window.removeEventListener('online', updateConnectionStatus);
            window.removeEventListener('offline', updateConnectionStatus);
        };
    }, []);

    return (
        <div className="App">
            <h1>Location Tracking App</h1>
            {location && (
                <div>
                    <p>Latitude: {location.latitude}</p>
                    <p>Longitude: {location.longitude}</p>
                </div>
            )}
            <p>Connection Status: {connectionStatus ? 'Online' : 'Offline'}</p>
        </div>
    );
}

export default YolcumNerede;
