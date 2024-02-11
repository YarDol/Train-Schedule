import { FC, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TrainService } from '../services/train.service';

const Tickets: FC = () => {
    const ticketsPerPage = 36;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [trainInfo, setTrainInfo] = useState<any>({});
    const { id } = useParams();
    const navigate = useNavigate()

    const fetchTrainInfo = async () => {
        try {
            const data = await TrainService.getTrainById(`${id}`);
            setTrainInfo(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchTrainInfo();
    }, [id]);

    const totalPages = Math.ceil(trainInfo?.availableSeats / ticketsPerPage) || 0;
    const startIndex = (currentPage - 1) * ticketsPerPage;
    const endIndex = startIndex + ticketsPerPage;

    const ticketData: string[] = Array.from({ length: trainInfo?.availableSeats || 0 }, (_, index) => `Ticket ${index + 1}`);
    const currentTickets = ticketData.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleEditTrain = () => {
        navigate(`/${id}/edit`);
    }

    return (
        <div className='container mt-5'>
            <div className='d-flex justify-content-between mb-4'>
                <button className='btn btn-dark' onClick={handleGoBack}>
                    Back
                </button>
                <button className='btn btn-dark' onClick={handleEditTrain}>
                    Edit Train Info
                </button>
            </div>
            <h1 className='mb-4'>{trainInfo?.startCity} - {trainInfo?.endCity}</h1>
            <div className='d-flex flex-wrap'>
                {currentTickets.map((ticket, index) => (
                    <button
                        key={index}
                        className='btn btn-outline-dark m-2'
                        onClick={() => console.log(`Ticket ${index + 1} clicked`)}
                    >
                        {ticket}
                    </button>
                ))}
            </div>
            <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', background: 'white', padding: '10px' }}>
                <nav aria-label='Page navigation'>
                    <ul className='pagination justify-content-center'>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className='page-link'
                                    onClick={() => handlePageChange(index + 1)}
                                    style={{ color: 'black', backgroundColor: 'white' }}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Tickets;
