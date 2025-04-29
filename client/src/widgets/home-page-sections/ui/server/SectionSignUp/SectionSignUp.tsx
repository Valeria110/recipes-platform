import { SignUpCard } from '@/shared/ui/client/SignUpCard/SignUpCard';
import { signUpImg } from '@/shared/assets';
import { signUpImg2 } from '@/shared/assets';
import styles from './SectionSignUp.module.scss';
import { getTranslations } from 'next-intl/server';

export const SectionSignUp = async () => {
  const t = await getTranslations('HomePage.SectionSignUp');

  return (
    <section
      className='flex flex-col
         gap-8 w-full mb-10 mt-10'
    >
      <h3 className='text-xl sm:text-3xl md:text-4xl font-medium'>{t('Header')}</h3>
      <div className={`w-full flex flex-col lg:flex-row gap-10 items-center ${styles.cardsContainer}`}>
        <SignUpCard imgSrc={signUpImg}>{t('SignUpCard1.title')}</SignUpCard>
        <SignUpCard imgSrc={signUpImg2}>{t('SignUpCard2.title')}</SignUpCard>
      </div>
    </section>
  );
};
