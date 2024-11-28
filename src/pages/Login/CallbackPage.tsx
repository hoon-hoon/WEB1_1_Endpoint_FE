import useOAuthHandler from '@/hooks/useOAuthHandler';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import Card from '@/components/common/Card';
import { Provider } from '@/types/AuthType';

const OAuthCallback = ({ provider }: { provider: Provider }) => {
  const { handleRedirectCallback } = useOAuthHandler(provider);

  useEffect(() => {
    handleRedirectCallback();
  }, [handleRedirectCallback]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-lg font-medium text-primary">로그인 처리 중입니다...</p>
    </div>
  );
};

const CallbackPage = ({ provider }: { provider: Provider }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full flex items-center justify-center">
        <OAuthCallback provider={provider} />
      </Card>
    </div>
  );
};

export default CallbackPage;
