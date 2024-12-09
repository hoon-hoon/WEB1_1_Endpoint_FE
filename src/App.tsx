import { RouterProvider } from 'react-router-dom';
import createRoutes from './routes';

function App() {
  const router = createRoutes();

  return <RouterProvider router={router} />;
}

export default App;
