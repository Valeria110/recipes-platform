import { myImg } from '@/shared/assets';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa6';

export const AboutPage = async () => {
  const t = await getTranslations('AboutPage');

  return (
    <div className='flex flex-col gap-10 px-4 py-8'>
      <section className='mb-8 w-full'>
        <h1 className='text-4xl font-semibold text-center mb-6'>{t('header')}</h1>
        <p className='text-gray-700 ml-auto mr-auto text-center' style={{ maxWidth: '800px', width: '100%' }}>
          {t('welcomeText')}
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>&#x1F60A; {t('keyFeatures.header')}</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>{t('keyFeatures.list.recipeManagement.title')}</h3>
            <li className='ml-2'>{t('keyFeatures.list.recipeManagement.listItem1')}</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>{t('keyFeatures.list.viewRecipes.title')}</h3>
            <li className='ml-2'>{t('keyFeatures.list.viewRecipes.listItem1')}</li>
            <li className='ml-2'>{t('keyFeatures.list.viewRecipes.listItem2')}</li>
            <li className='ml-2'>{t('keyFeatures.list.viewRecipes.listItem3')}</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>{t('keyFeatures.list.userAuth.title')}</h3>
            <li className='ml-2'>{t('keyFeatures.list.userAuth.listItem1')}</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>{t('keyFeatures.list.searchAndFilter.title')}</h3>
            <li className='ml-2'>{t('keyFeatures.list.userAuth.listItem1')}</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>{t('keyFeatures.list.userProfile.title')}</h3>
            <li className='ml-2'>{t('keyFeatures.list.userProfile.listItem1')}</li>
            <li className='ml-2'>{t('keyFeatures.list.userProfile.listItem2')}</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>{t('keyFeatures.list.createRecipes.title')}</h3>
            <li className='ml-2'>{t('keyFeatures.list.createRecipes.listItem1')}</li>
            <li className='ml-2'>{t('keyFeatures.list.createRecipes.listItem2')}</li>
          </ul>
        </div>
      </section>
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>&#x1F528; {t('techStack.title')}</h2>
        <div className='flex flex-wrap gap-4'>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-semibold'>{t('techStack.frontend')}</h3>
            <p>Next.js, React, Redux, TypeScript, SCSS, Tailwind CSS</p>
          </div>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-semibold'>{t('techStack.backend')}</h3>
            <p>NestJS, Prisma, PostgreSQL</p>
          </div>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-semibold'>{t('techStack.codeQuality')}</h3>
            <p>Eslint, prettier, Husky</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-10'>&#129303; {t('aboutMe.title')}</h2>
        <div className='flex flex-col md:flex-row items-start justify-between gap-4'>
          <div className='w-full md:w-1/2 flex flex-col gap-7'>
            <div className='flex flex-col'>
              <h3 className='font-semibold text-xl'>{t('aboutMe.fullName')}</h3>
              <p className='text-sm text-gray-500'>{t('aboutMe.position')}</p>
            </div>
            <p className='text-gray-700'>
              {/* {locale === 'en' ? `Hi, I&apos;m Valerie, the creator of this platform. I&apos;m passionate about cooking,{' '}
              <b>nutritionology</b> &#129361; and <b>technology</b> 👩🏻‍💻, and I wanted to create a tool that combines both
              of these interests. With a background in web-development, I aimed to build a platform that is not only
              functional but also enjoyable to use. I hope you find this <b>Recipe Platform</b> helpful and inspiring
              for your culinary adventures!` : ''} */}
              {t.rich('aboutMe.AboutText', {
                b: (chunks) => <b>{chunks}</b>,
              })}
            </p>
            <div className='flex gap-10'>
              <a
                className='flex gap-2 items-center group hoverable:hover:underline'
                href='https://github.com/Valeria110'
                target='_blank'
              >
                <AiFillGithub size={20} className=' hoverable:group-hover:scale-110 ease-in-out duration-300' />
                <span>Github</span>
              </a>
              <a
                className='flex gap-2 items-center group hoverable:hover:underline'
                href='https://www.linkedin.com/in/valerie-ivashkevich-a19124256/'
                target='_blank'
              >
                <FaLinkedin
                  className='text-blue-700 hoverable:group-hover:scale-110 ease-in-out duration-300'
                  size={20}
                />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div className='pr-4'>
            <Image
              className='rounded-2xl hoverable:hover:scale-105 ease-in-out duration-300 active:scale-105'
              src={myImg}
              alt='my image'
              width={300}
              height={300}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
