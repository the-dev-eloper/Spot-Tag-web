import React from 'react'

export default function Language(props) {

    const { language } = props;

    return (
        <div key={language._id} className="card">

            <a href={`/language/${language._id}`}>
                <img class="medium" src={language.image} alt="language" />
            </a>

            <div class="card-body">
                <a href={`/language/${language.name}`}>
                    <h2>{language.name}</h2>
                </a>
            </div>
        </div>
    );
}
