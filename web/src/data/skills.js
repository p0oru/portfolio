import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiAwsamplify,
  SiDocker,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiOpenai,
  SiGit,
  SiLinux,
  SiExpress,
  SiFastapi,
  SiMysql,
  SiFramer,
  SiVite,
} from 'react-icons/si'
import { FaDatabase } from 'react-icons/fa'

// Featured skills - displayed as large glowing cards
export const featuredSkills = [
  { name: 'React', Icon: SiReact },
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Python', Icon: SiPython },
  { name: 'AWS', Icon: SiAwsamplify },
  { name: 'Docker', Icon: SiDocker },
]

// Categorized skills - displayed as pill tags
export const skillCategories = [
  {
    title: 'Frontend',
    items: [
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Tailwind CSS', Icon: SiTailwindcss },
      { name: 'Framer Motion', Icon: SiFramer },
      { name: 'Vite', Icon: SiVite },
    ],
  },
  {
    title: 'Backend',
    items: [
      { name: 'Express.js', Icon: SiExpress },
      { name: 'FastAPI', Icon: SiFastapi },
      { name: 'MongoDB', Icon: SiMongodb },
      { name: 'MySQL', Icon: SiMysql },
      { name: 'Redis', Icon: SiRedis },
    ],
  },
  {
    title: 'AI & Tools',
    items: [
      { name: 'OpenAI API', Icon: SiOpenai },
      { name: 'RAG Architecture', Icon: FaDatabase },
      { name: 'Git', Icon: SiGit },
      { name: 'Linux', Icon: SiLinux },
    ],
  },
]
