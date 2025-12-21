import React from "react"


export const setTheme = (theme) => {
    const html = document.documentElement;

    html.classList.remove("default_theme", "gold_theme");

    html.classList.add(theme)
}