import { SignUpCard } from '@/components/SignUpCard/SignUpCard';
import signUpImg from '../../../../public/signup-img.jpg';
import signUpImg2 from '../../../../public/signup-img2.jpg';
import styles from './SectionSignUp.module.scss';

export const SectionSignUp = () => {
  return (
    <section
      className='flex flex-col
         gap-8 w-full mb-10'
    >
      <h3 className='text-4xl font-medium'>Don't have an account yet?</h3>
      <div className={`w-full flex flex-col lg:flex-row gap-10 items-center ${styles.cardsContainer}`}>
        <SignUpCard imgSrc={signUpImg} />
        <SignUpCard imgSrc={signUpImg2} />
      </div>
    </section>
  );
};
