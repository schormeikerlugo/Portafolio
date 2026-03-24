import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('site-settings');
        return saved ? JSON.parse(saved) : {
            customCursor: true,
            smoothScroll: true,
            terminalGlitch: true,
            mode: 'EXPLORING'
        };
    });

    useEffect(() => {
        localStorage.setItem('site-settings', JSON.stringify(settings));
        
        // Apply smooth scroll to html
        document.documentElement.style.scrollBehavior = settings.smoothScroll ? 'smooth' : 'auto';
        
        // Hide default cursor if custom is on
        document.body.style.cursor = settings.customCursor ? 'none' : 'auto';
    }, [settings]);

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const setMode = (mode) => {
        setSettings(prev => ({ ...prev, mode }));
    };

    return (
        <SettingsContext.Provider value={{ settings, toggleSetting, setMode }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
