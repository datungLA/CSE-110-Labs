import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from './themeContext';
import { dummyNoteList } from './constant';
import { Note, FavoriteButtonProps, FavoriteListProps } from './types'
function ClickCounter() {
    const [count, setCount] = useState(0);
    const theme = useContext(ThemeContext);
    return (
        <div
            style={{
                background: theme.background,
                color: theme.foreground,
                padding: "20px",
            }}
        >
            <p>You clicked {count} times</p>
            <button
                onClick={() => setCount(count + 1)}
                style={{ background: theme.background, color: theme.foreground }}
            >
                Click Me!
            </button>
        </div>
    );
}
function ToggleTheme() {
    const [currentTheme, setCurrentTheme] = useState(themes.light);

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
    };

    return (
        <ThemeContext.Provider value={currentTheme}>
            <button onClick={toggleTheme}>Toggle Theme</button>
            <ClickCounter />
        </ThemeContext.Provider>
    );
}
export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ note, toggleFavorite }) => {
    return (
        <button onClick={() => toggleFavorite(note.id)}>
            {note.liked ? '❤️' : '♡'}
        </button>
    );
}
export const FavoriteList: React.FC<FavoriteListProps> = ({ notes }) => {
    const [favorites, setFavorites] = useState<string[]>([]);
    useEffect(() => {
        const favoriteTitles = notes
            .filter(note => note.liked)
            .map(note => note.title);
        setFavorites(favoriteTitles);
    }, [notes]);
    return (
        <div className="favorite-list">
            <h3>List of favorites:</h3>
            <ul>
                {favorites.map((title, index) => (
                    <li key={index}>{title}</li>
                ))}
            </ul>
        </div>
    );

}