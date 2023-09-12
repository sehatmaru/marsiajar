import { INavData } from '@coreui/angular';


export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    name: 'Page',
    title: true
  },
  {
    name: 'Exam',
    url: '/exam',
    iconComponent: { name: 'cil-task' }
  },
  {
    name: 'Course',
    url: '/course',
    iconComponent: { name: 'cil-bookmark' }
  },
  {
    name: 'Webinar',
    url: '/webinar',
    iconComponent: { name: 'cil-star' }
  },
  {
    name: 'Invoice',
    url: '/invoice',
    iconComponent: { name: 'cil-credit-card' }
  }
];
