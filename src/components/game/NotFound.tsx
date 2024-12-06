import { useNavigate } from 'react-router-dom';
import { OctagonAlertIcon } from 'lucide-react';
import { Button } from '@/shadcn/ui/button';
import Card from '../common/Card';

const NotFound = ({ message }: { message: string }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <OctagonAlertIcon className="h-12 w-12 text-primary" />
          <p className="text-lg font-medium text-primary">{message}</p>
          <Button size="lg" onClick={() => navigate('/game')}>
            이전으로
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
