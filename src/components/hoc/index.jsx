import React from 'react';

export const extractLinks = props => {
    const extract = () => {
        const links = props.links;
        let renders = [];
        links.forEach(linkObj => {
            Object.keys(linkObj).map(link => renders.push(
                <props.renderItem>
                    { link }
                </props.renderItem>
            ))
        });

        return renders;
    }

    return (
        { extract() }
    )
}