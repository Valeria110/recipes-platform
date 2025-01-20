import { SignUpForm } from '@/widgets/sign-in';
import styles from './signup.module.scss';

export default function SignUpPage() {
  return (
    <>
      <div className={`flex justify-center min-h-dvh p-5 pt-16 ${styles.formContainer}`}>
        <SignUpForm />
      </div>
    </>
  );
}
