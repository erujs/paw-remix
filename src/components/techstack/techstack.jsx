import reactLogo from '../../assets/react.svg';

export const TechStack = () => {
    return (
        <div className="absolute top-4 left-4 p-2">
            <div className='flex justify-between gap-4'>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} alt="React logo" />
                </a>
            </div>
        </div>
    );
};
