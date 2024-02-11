import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsTrash, BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { TrainService } from '../services/train.service';
import { toast } from 'react-toastify';

const Main: FC = () => {
    const [allTrains, setAllTrains] = useState<any>([]);
    const [filteredTrains, setFilteredTrains] = useState<any>([]);
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);

    const navigate = useNavigate();

    const checkTrains = async () => {
        try {
            const data = await TrainService.getTrainList();
            setAllTrains(data);
            setFilteredTrains(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        checkTrains();
    }, []);

    const handleTrainClick = (trainId: number) => {
        navigate(`/${trainId}`);
    };

    const handleFilterChange = (filterText: string) => {
        const trimmedFilter = filterText.trim().toLowerCase();

        if (trimmedFilter === '') {
            setFilteredTrains(allTrains);
        } else {
            const filtered = allTrains.filter(
                (train: any) =>
                    train.startCity.toLowerCase().includes(trimmedFilter) ||
                    train.endCity.toLowerCase().includes(trimmedFilter)
            );
            setFilteredTrains(filtered);
        }
    };

    const requestSort = (key: string) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (name: string) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const sortedTrains = () => {
        if (!sortConfig) {
            return filteredTrains;
        }

        return [...filteredTrains].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 rounded-md">
                <div className="d-flex justify-content-between mb-4">
                    <h1 className="mb-0">Train Schedule</h1>
                    <button className="btn btn-dark" onClick={() => navigate('/create')}>
                        Add Trains
                    </button>
                </div>
                <div className="mb-3">
                    <label htmlFor="cityInput" className="form-label">
                        Enter City:
                    </label>
                    <input
                        type="text"
                        id="cityInput"
                        className="form-control"
                        onChange={(e) => handleFilterChange(e.target.value)}
                    />
                </div>
                <div>
                    <h2 className="mb-3">Filtered Trains:</h2>
                    {filteredTrains.length > 0 ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th onClick={() => requestSort('startCity')} className={getClassNamesFor('startCity')}>
                                        Start City
                                        {getClassNamesFor('startCity') === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
                                    </th>
                                    <th onClick={() => requestSort('endCity')} className={getClassNamesFor('endCity')}>
                                        End City
                                        {getClassNamesFor('endCity') === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
                                    </th>
                                    <th>
                                        Departure
                                    </th>
                                    <th>
                                        Arrival
                                    </th>
                                    <th onClick={() => requestSort('availableSeats')} className={getClassNamesFor('availableSeats')}>
                                        Available Seats
                                        {getClassNamesFor('availableSeats') === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
                                    </th>
                                    <th onClick={() => requestSort('price')} className={getClassNamesFor('price')}>
                                        Price
                                        {getClassNamesFor('price') === 'asc' ? <BsArrowUp /> : <BsArrowDown />}
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedTrains().map((train: any, index: number) => (
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
                                        <td>
                                            <BsTrash
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    TrainService.deleteTrain(train.id);
                                                    checkTrains();
                                                    toast.success('Train deleted');
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No trains found for the selected city</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Main;
