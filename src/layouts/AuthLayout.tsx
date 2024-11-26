import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="h-dvh px-2 py-8">
      <Outlet />
    </div>
  );
}

export default AuthLayout;
