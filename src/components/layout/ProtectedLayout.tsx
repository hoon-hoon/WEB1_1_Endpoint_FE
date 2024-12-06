import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean;
};

/**
 * ProtectedLayout
 * @description 인증 여부에 따라 라우터를 관리하는 레이아웃입니다.
 * @param requireAuth 인증이 필요한 페이지일 경우 true / 필요없는 경우 false
 */
export function ProtectedLayout({ children, requireAuth = true }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/main" replace />;
  }

  return <>{children}</>;
}
