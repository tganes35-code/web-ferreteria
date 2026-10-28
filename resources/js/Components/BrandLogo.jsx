import { Link } from '@inertiajs/react';

export default function BrandLogo({ size = 'normal', className = '' }) {
    const isSmall = size === 'small';

    return (
        <Link href="/" className={`inline-flex items-center group ${className}`}>
            <img
                src="/images/logo.png"
                alt="Ferretería La Rebaja - Tu Proyecto, Nuestra Pasión"
                className={`w-auto object-contain transition-transform group-hover:scale-105 ${
                    isSmall ? 'h-12 sm:h-14' : 'h-16 sm:h-20 md:h-24 max-w-[280px] sm:max-w-[360px]'
                }`}
            />
        </Link>
    );
}
