import { myImg } from '@/shared/assets';
import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa6';

export const AboutPage = () => {
  return (
    <div className='flex flex-col gap-10 px-4 py-8'>
      <section className='mb-8 w-full'>
        <h1 className='text-4xl font-semibold text-center mb-6'>About Recipe Platform</h1>
        <p className='text-gray-700 ml-auto mr-auto text-center' style={{ maxWidth: '800px', width: '100%' }}>
          Welcome to the Recipe Platform, a place where cooking enthusiasts can discover, share, and organize their
          favorite recipes. This platform is designed to make cooking easier and more enjoyable by providing a
          user-friendly interface and a wide range of features to help you manage your culinary creations.
        </p>
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>&#x1F60A; Key Features</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>Recipe Management</h3>
            <li className='ml-2'>Easily add, edit, and organize your recipes.</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>View recipes</h3>
            <li className='ml-2'>A page with recipe cards displaying the title, image, short description.</li>
            <li className='ml-2'>Detailed recipe page with full details and comments.</li>
            <li className='ml-2'>Add recipes to &quot;Favorites&quot; for quick access.</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>User registration and authentication</h3>
            <li className='ml-2'>Logging in and logging out of the app.</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>Search and Filter</h3>
            <li className='ml-2'>
              Search by a recipe name, cuisine types and categories (e.g. breakfast, sugar free, desserts, etc.).
            </li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>User Profile</h3>
            <li className='ml-2'>Personal profile with information about the user.</li>
            <li className='ml-2'>Edit your profile data.</li>
          </ul>
          <ul className='bg-gray-100 p-4 rounded-lg list-disc'>
            <h3 className='font-semibold mb-3'>Creating and editing recipes</h3>
            <li className='ml-2'>
              Form for adding a new recipe with fields: name, ingredients, step-by-step description, cooking time,
              photos.
            </li>
            <li className='ml-2'>Possibility to edit and delete your own recipes.</li>
          </ul>
        </div>
      </section>
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>&#x1F528; Technology Stack</h2>
        <div className='flex flex-wrap gap-4'>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-semibold'>Frontend</h3>
            <p>Next.js, React, Redux, TypeScript, SCSS, Tailwind CSS</p>
          </div>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-semibold'>Backend</h3>
            <p>NestJS, Prisma, PostgreSQL</p>
          </div>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h3 className='font-semibold'>Code quality</h3>
            <p>Eslint, prettier, Husky</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-10'>&#129303; About Me</h2>
        <div className='flex flex-col md:flex-row items-start justify-between gap-4'>
          <div className='w-full md:w-1/2 flex flex-col gap-7'>
            <div className='flex flex-col'>
              <h3 className='font-semibold text-xl'>Valerie Ivashkevich</h3>
              <p className='text-sm text-gray-500'>Full-stack developer</p>
            </div>
            <p className='text-gray-700'>
              Hi, I&apos;m Valerie, the creator of this platform. I&apos;m passionate about cooking,{' '}
              <b>nutritionology</b> &#129361; and <b>technology</b> 👩🏻‍💻, and I wanted to create a tool that combines both
              of these interests. With a background in web-development, I aimed to build a platform that is not only
              functional but also enjoyable to use. I hope you find this <b>Recipe Platform</b> helpful and inspiring
              for your culinary adventures!
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
