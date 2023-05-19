import { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { useTranslation } from 'next-i18next';

import Section from 'components/UI/Section';
import Typography from 'components/UI/Typography';

import styles from './styles.module.scss';

const GradientText = ({ children }: { children: ReactNode }) => {
  return <span className={styles.textGradient}>{children}</span>;
};

const Introduction = () => {
  const { t } = useTranslation('home');
  const { t: tc } = useTranslation('common');

  return (
    <Section className="mt-32 mb-20 md:mb-0 pt-3 sm:pt-3 md:pt-3 lg:pt-3 xl:pt-3">
      <Box className="flex flex-col items-center pt-5 px-5 md:items-center">
        <Typography variant="h1" className="mb-6 md:m-1 md:text-center">
          <GradientText>BA</GradientText>NK <GradientText>OF</GradientText>  <GradientText>PEOP</GradientText>LE
        </Typography>
        <Typography variant="p" className="mb-8 md:m-1">
          {t('siteDescription')}
        </Typography>
        <Box className="flex flex-col w-full md:flex-row md:w-max md:mt-4">
          <Button
            className="h-16 mb-4 md:mb-0 md:h-10"
            variant="contained"
            color="primary"
            classes={{ label: 'text-lg md:text-sm' }}
            href="/login"
          >
            {tc('useDopex')}
          </Button>
        </Box>
      </Box>
    </Section>
  );
};

export default Introduction;