import React from 'react'

export default function Language(props) {

    const { language } = props;

    return (
        <div key={language._id} className="card">

            <a className="card--image" href={`/language/${language._id}`}>
                <img src={language.image} alt="language" />
            </a>

            <div className="card--body">
                <a href={`/language/${language.name}`}>
                    <h3>{language.name}</h3>
                </a>
            </div>
        </div>
    );
}
