import { IconAddPersonal, IconHome, IconPrevious, IconUpcomingTab, IconVideo } from "@/components/custom/IconList";

type SideBarLink = {
    label: string;
    route: string;
    imgUrl: JSX.Element | any;
}

export const SideBarLinks: SideBarLink[] = [
    {
        label: 'Home',
        route: '/',
        imgUrl: <IconHome  />,
    },
    {
        label: 'Upcoming',
        route: '/upcoming',
        imgUrl: <IconUpcomingTab  />,
    },
    {
        label: 'Previous',
        route: '/previous',
        imgUrl: <IconPrevious  />,
    },
    {
        label: 'Recordings',
        route: '/recordings',
        imgUrl: <IconVideo />,
    },
    {
        label: 'Personal Room',
        route: '/personal-room',
        imgUrl: <IconAddPersonal />,
    },
]

export const avatarImages = [
    '/images/avatar-1.jpeg',
    '/images/avatar-2.jpeg',
    '/images/avatar-3.png',
    '/images/avatar-4.png',
    '/images/avatar-5.png',
  ];