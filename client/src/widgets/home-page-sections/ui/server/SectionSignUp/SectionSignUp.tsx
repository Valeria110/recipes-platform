import { SignUpCard } from '@/shared/ui/client/SignUpCard/SignUpCard';
import { signUpImg } from '@/shared/assets';
import { signUpImg2 } from '@/shared/assets';
import styles from './SectionSignUp.module.scss';

export const SectionSignUp = () => {
  return (
    <section
      className='flex flex-col
         gap-8 w-full mb-10 mt-10'
    >
      <h3 className='text-4xl font-medium'>Don&apos;t have an account yet?</h3>
      <div className={`w-full flex flex-col lg:flex-row gap-10 items-center ${styles.cardsContainer}`}>
        <SignUpCard imgSrc={signUpImg}>Sign up to explore your wished recipes</SignUpCard>
        <SignUpCard imgSrc={signUpImg2}>Sign up to create your recipes</SignUpCard>
      </div>
    </section>
  );
};
