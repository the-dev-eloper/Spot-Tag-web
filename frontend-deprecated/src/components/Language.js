import React from 'react'

import { Card } from 'antd';

export default function Language(props) {

    const { language } = props;

    return (
        <div key={language._id}>

            <Card
                hoverable
                style={{ padding: 20, marginBottom: 30, marginRight: 8 }}
                cover={
                    <img src={language.image} alt="language" />
                }
            >
                <div className="card--body">
                    <a href={`/language/${language.id}`}>
                        <h3>{language.name}</h3>
                    </a>
                </div>
            </Card>
        </div>
    );
}
