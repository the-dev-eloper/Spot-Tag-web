import React from 'react'
import Language from '../components/Language'
import data from '../data'

export default function HomeScreen() {
    return (
        <div>

            <div class="row center">

                {data.languages.map((language) => (
                    <Language key={language._id} language={language} />
                ))}
            </div>
        </div>
    );
}
