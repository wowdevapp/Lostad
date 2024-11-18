import { usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

type Props = {}

export type BreadcrumbItem = {
    label: string;
    href?: string;
    isCurrentPage?: boolean;
}

const useBreadcrumb = (props: Props) => {
    const pathname = usePathname();
    const t = useTranslations();
    const paths = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [
        {
            label: t('nav.dashboard'),
            href: '/dashboard'
        }
    ];

    let currentPath = '';
    paths.forEach((path, index) => {
        currentPath += `/${path}`;
        if (path !== 'dashboard') {
            const translationKey = `nav.${path}`;
            items.push({
                label: t.has(translationKey) ? t(translationKey) : path.charAt(0).toUpperCase() + path.slice(1),
                href: currentPath,
                isCurrentPage: index === paths.length - 1
            });
        }
    });

    return items;
};


export default useBreadcrumb