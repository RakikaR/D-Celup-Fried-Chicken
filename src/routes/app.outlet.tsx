import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useAuth } from '@/hooks/use-auth'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/outlet')({
    component: OutletGuard,
})

function OutletGuard() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Jika admin pusat iseng mengetik URL kasir, kembalikan ke pusat
        if (!isLoading && user && user.role !== 'outlet_staff') {
            navigate({ to: '/app/hq', replace: true });
        }
    }, [isLoading, user, navigate]);

    if (isLoading || user?.role !== 'outlet_staff') return null;

    return <Outlet />;
}