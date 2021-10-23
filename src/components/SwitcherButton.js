import React from 'react';

const SwitcherButton = ({active, toggleActive, current}) => {
    let classNames = active ? 'button-switcher_active' : ''
    classNames += current ? ' button-switcher_current' : ''

    return (
        <button className={'button-switcher ' + classNames} onClick={toggleActive}>
            {active ? '-' : '●'}
        </button>
    );
};

export default SwitcherButton;