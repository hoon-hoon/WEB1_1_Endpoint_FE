import { HelmetProvider } from 'react-helmet-async';

interface AboutPageProps {
  title: string;
  description: string;
}
const AboutPage = ({ title, description }: AboutPageProps) => {
  return (
    <HelmetProvider>
      <title>Quizy - {title}</title>
      <meta name="description" content={description} />
    </HelmetProvider>
  );
};

export default AboutPage;
