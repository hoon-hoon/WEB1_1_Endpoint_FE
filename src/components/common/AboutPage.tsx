import { Helmet } from 'react-helmet';

interface AboutPageProps {
  title: string;
  description: string;
}
const AboutPage = ({ title, description }: AboutPageProps) => {
  return (
    <Helmet>
      <title>Quizy - {title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default AboutPage;
