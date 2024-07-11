'use client'
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';

const AuthWrapper = ({ children }:{children?: React.ReactNode}) => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <Spinner />; // Create a new loading layout component
    }

    if (!session) {
        return <p>You are not logged in!</p>;
    }
    return <>{children}</>;
};

export default AuthWrapper;
