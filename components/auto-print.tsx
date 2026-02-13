'use client';

import { useEffect } from 'react';

export function AutoPrint() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.search.includes('print=true')) {
            // Slight delay to allow images to load
            setTimeout(() => {
                window.print();
            }, 1000);
        }
    }, []);

    return null;
}
