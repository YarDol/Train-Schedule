import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainModal from '../components/trainModal';
import { TrainService } from '../services/train.service';

const Main: FC = () => {
    const [allTrains, setAllTrains] = useState<any>([]);
    const [filteredTrains, setFilteredTrains] = useState<any>([]);
    const [visibleModal, setVisibleModal] = useState<boolean>(false);

    const navigate = useNavigate();

    const checkTrains = async () => {
        try {
            const data = await TrainService.getTrainList();
            setAllTrains(data);
            setFilteredTrains(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        checkTrains();
    }, []);

    const handleTrainClick = (trainId: number) => {
        navigate(`/${trainId}`);
    }

    const handleFilterChange = (filterText: string) => {
        const trimmedFilter = filterText.trim().toLowerCase();

        if (trimmedFilter === '') {
            setFilteredTrains(allTrains);
        } else {
            const filtered = allTrains.filter((train: any) =>
                train.startCity.toLowerCase().includes(trimmedFilter) ||
                train.endCity.toLowerCase().includes(trimmedFilter)
            );
            setFilteredTrains(filtered);
        }
    }

    return (
        <div className='container mt-5'>
            <div className='card p-4 rounded-md'>
                <div className='d-flex justify-content-between mb-4'>
                    <h1 className='mb-0'>Train Schedule</h1>
                    <button className='btn btn-dark' onClick={() => setVisibleModal(true)}>
                        Add Trains
                    </button>
                </div>
                <div className='mb-3'>
                    <label htmlFor='cityInput' className='form-label'>
                        Enter City:
                    </label>
                    <input
                        type='text'
                        id='cityInput'
                        className='form-control'
                        onChange={(e) => handleFilterChange(e.target.value)}
                    />
                </div>
                <div>
                    <h2 className='mb-3'>Filtered Trains:</h2>
                    {filteredTrains.length > 0 ? (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Start City</th>
                                    <th>End City</th>
                                    <th>Departure</th>
                                    <th>Arrival</th>
                                    <th>Available Seats</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTrains.map((train: any, index: number) => (
                                    <tr
                                        key={index}
                                        onClick={() => handleTrainClick(train.id)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td>{train.startCity}</td>
                                        <td>{train.endCity}</td>
                                        <td>{train.departure}</td>
                                        <td>{train.arrival}</td>
                                        <td>{train.availableSeats}</td>
                                        <td>{train.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No trains found for the selected city</p>
                    )}
                </div>
            </div>
            {visibleModal && (
                <TrainModal type='post' setVisibleModal={setVisibleModal} />
            )}
        </div>
    );
};

export default Main;
