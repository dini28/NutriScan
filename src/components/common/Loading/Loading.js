import './Loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <h1 className="loading-logo">
          Nutri<span className="loading-logo-accent">Scan</span>
        </h1>
        <div className="scanner-line"></div>
        <p className="loading-text">Initializing System...</p>
      </div>
    </div>
  );
};

export default Loading; 