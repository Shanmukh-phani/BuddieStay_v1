import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Switch, Typography } from '@mui/material';

const ToggleVacancyButton = ({ hostelId }) => {
    const [vacancyAvailable, setVacancyAvailable] = useState(false);

    useEffect(() => {
        // Fetch the current vacancy status on mount
        const fetchVacancyStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_URL}/admin/getVacancyStatus/${hostelId}`);
                setVacancyAvailable(response.data.hostel_vacancy_available);
            } catch (error) {
                console.error("Error fetching vacancy status:", error);
            }
        };

        fetchVacancyStatus();
    }, [hostelId]);

    const toggleVacancy = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_URL}/admin/toggleVacancy/${hostelId}`);
            setVacancyAvailable(response.data.hostel_vacancy_available);
        } catch (error) {
            console.error("Error toggling vacancy:", error);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '20px 0' }}>
            <Switch
                checked={vacancyAvailable}
                onChange={toggleVacancy}
                color="primary"
            />
            <Typography style={{ fontSize: '1em', color: vacancyAvailable ? '#4caf50' : '#f44336' }}>
                {vacancyAvailable ? 'Vacancy Available' : 'No Vacancy'}
            </Typography>
        </div>
    );
};

export default ToggleVacancyButton;
