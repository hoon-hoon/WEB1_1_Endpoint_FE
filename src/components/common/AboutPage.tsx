import { Helmet } from 'react-helmet';

interface AboutPageProps {
  title: string;
  description: string;
  keywords: string;
}

const AboutPage = ({ title, description, keywords }: AboutPageProps) => {
  return (
    <Helmet>
      <title>Quizy - {title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default AboutPage;
