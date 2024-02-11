import React, { FC, useState } from 'react';
import { TrainService } from '../services/train.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const CreateTrain: FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        startCity: '',
        endCity: '',
        departure: '',
        arrival: '',
        availableSeats: 0,
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const createdTrain = await TrainService.createTrain(formData);
            toast.success('Train created successfully');
            navigate('/');
        } catch (error) {
            toast.error('Error creating train');
        }
    };

        const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="container mt-5 d-flex justify-content-center align-items-center">
            <div className="p-4 shadow-lg w-75">
            <button className='btn btn-dark mb-4' onClick={handleGoBack}>
                Back
            </button>
                <h1 className="text-center text-3xl font-weight-bold">Create Train</h1>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="startCity" className="form-label font-weight-semibold">
                            Start City
                        </label>
                        <input
                            type="text"
                            id="startCity"
                            name="startCity"
                            className="form-control"
                            value={formData.startCity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endCity" className="form-label font-weight-semibold">
                            End City
                        </label>
                        <input
                            type="text"
                            id="endCity"
                            name="endCity"
                            className="form-control"
                            value={formData.endCity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="departure" className="form-label font-weight-semibold">
                            Departure
                        </label>
                        <input
                            type="text"
                            id="departure"
                            name="departure"
                            className="form-control"
                            value={formData.departure}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="arrival" className="form-label font-weight-semibold">
                            Arrival
                        </label>
                        <input
                            type="text"
                            id="arrival"
                            name="arrival"
                            className="form-control"
                            value={formData.arrival}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="availableSeats" className="form-label font-weight-semibold">
                            Available Seats
                        </label>
                        <input
                            type="number"
                            id="availableSeats"
                            name="availableSeats"
                            className="form-control"
                            value={formData.availableSeats}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label font-weight-semibold">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-control"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-dark">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTrain;
