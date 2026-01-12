import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { Locale, getTranslation } from '../locales';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: ReturnType<typeof getTranslation>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [locale, setLocale] = useState<Locale>('de');
    const t = useMemo(() => getTranslation(locale), [locale]);

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
