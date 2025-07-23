import { Breadcrumbs } from '@/components/breadcrumbs';
import { Icon } from '@/components/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserMenuContent } from '@/components/user-menu-content';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: '~/',
        href: '/',
        icon: null,
        auth: false,
    },
    {
        title: '~/New post',
        href: '/posts/new',
        icon: null,
        auth: true,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: '/Login',
        href: '/login',
        icon: null,
        auth: false,
    },
];

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    function NavLink(props: { item: NavItem }) {
        const { item } = props;
        return (
            <NavigationMenuItem className="relative flex h-full items-center">
                <Link
                    href={item.href}
                    className={cn(
                        navigationMenuTriggerStyle(),
                        page.url === item.href ? 'text-neutral-700' : 'text-neutral-500',
                        'h-9 cursor-pointer px-3',
                    )}
                >
                    {item.icon && <Icon iconNode={item.icon} className="mr-2 h-4 w-4" />}
                    {item.title}
                </Link>
            </NavigationMenuItem>
        );
    }

    function NavLinkMobile(props: { item: NavItem }) {
        const { item } = props;
        return (
            <Link key={item.title} href={item.href} className="flex items-center space-x-2 font-medium">
                {item.icon && <Icon iconNode={item.icon} className="h-5 w-5" />}
                <span>{item.title}</span>
            </Link>
        );
    }

    return (
        <>
            <div className="border-b border-sidebar-border/80">
                <div className="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex h-full w-64 flex-col items-stretch justify-between bg-sidebar">
                                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <p>Bloggerrr</p>
                                </SheetHeader>
                                <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item, index) => {
                                                if (item.auth) {
                                                    if (auth.user) {
                                                        return <NavLinkMobile item={item} key={index} />;
                                                    } else {
                                                        return;
                                                    }
                                                } else {
                                                    return <NavLinkMobile item={item} key={index} />;
                                                }
                                            })}
                                        </div>

                                        <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item, index) => {
                                                if (item.auth) {
                                                    if (auth.user) {
                                                        return <NavLinkMobile item={item} key={index} />;
                                                    } else {
                                                        return;
                                                    }
                                                } else {
                                                    if (auth.user) {
                                                        return;
                                                    }
                                                    return <NavLinkMobile item={item} key={index} />;
                                                }
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link href="/" className="flex items-center space-x-2">
                        <AppLogo />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => {
                                    if (item.auth) {
                                        if (auth.user) {
                                            return <NavLink item={item} key={index} />;
                                        } else {
                                            return;
                                        }
                                    } else {
                                        return <NavLink item={item} key={index} />;
                                    }
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="ml-auto flex items-center space-x-2">
                        <div className="relative flex items-center space-x-1">
                            <div className="hidden lg:flex">
                                {rightNavItems.map((item, index) => {
                                    if (item.auth) {
                                        if (auth.user) {
                                            return <NavLink item={item} key={index} />;
                                        } else {
                                            return;
                                        }
                                    } else {
                                        if (auth.user) {
                                            return;
                                        }
                                        return <NavLink item={item} key={index} />;
                                    }
                                })}
                            </div>
                        </div>
                        {auth.user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="size-10 rounded-full p-1">
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56" align="end">
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>
            {breadcrumbs.length > 1 && (
                <div className="flex w-full border-b border-sidebar-border/70">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
