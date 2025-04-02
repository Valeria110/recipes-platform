import { SignUpForm } from '@/widgets/sign-in';
import styles from './signup.module.scss';
import Image from 'next/image';
import { signupBg } from '@/shared/assets';

export default function SignUpPage() {
  return (
    <>
      <div className={`flex justify-center min-h-dvh p-5 pt-16 ${styles.formContainer}`}>
        <Image className='object-cover bg-[25%_25%]' src={signupBg} alt='signup page background image' fill={true} />
        <SignUpForm />
      </div>
    </>
  );
}
