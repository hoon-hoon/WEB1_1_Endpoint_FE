import { Outlet } from 'react-router-dom';
import { ProtectedLayout } from './ProtectedLayout';

function AuthLayout() {
  return (
    <ProtectedLayout requireAuth={false}>
      <div className="h-dvh px-2 py-8">
        <Outlet />
      </div>
    </ProtectedLayout>
  );
}

export default AuthLayout;
