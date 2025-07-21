
import ApplyIqContext from './ApplyIqContex';

const ApplyIqProvider = ({ children }) => {
    const shareData={
      name: "ApplyIq",
      version: "1.0.0",
    }
    return (
        <ApplyIqContext value={shareData}>
            {children}
        </ApplyIqContext>
    );
};

export default ApplyIqProvider;