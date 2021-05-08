const data = {
    languages: [
        {
            _id: '1',
            name: 'JavaScript',
            image: '/images/l1.png',
            bugList: [
                {
                    _id: 'b1',
                    name: 'Null is not an object',
                    category: 'TypeError',
                    language: 'JavaScript',
                    reason: 'calling method on null objects',
                    testingTool: 'Safari Developer Console',
                    solution: 'adding an event listener',
                    refLink: 'https://stackoverflow.com/questions/14207922/javascript-error-null-is-not-an-object',
                    addedBy: 'Admin',
                },
                {
                    _id: 'b3',
                    name: 'Null is not an object',
                    category: 'TypeError Adv',
                    language: 'JavaScript',
                    reason: 'calling method on null objects',
                    testingTool: 'Safari Developer Console',
                    solution: 'adding an event listener',
                    refLink: 'https://stackoverflow.com/questions/14207922/javascript-error-null-is-not-an-object',
                    addedBy: 'ddd',
                }
            ]
        },
        {
            _id: '2',
            name: 'Python',
            image: '/images/l2.png',
            bugList: []
        },
        {
            _id: '3',
            name: 'TypeScript',
            image: '/images/l3.png',
            bugList: []
        },
        {
            _id: '4',
            name: 'Dart',
            image: '/images/l4.png',
            bugList: []
        },
        {
            _id: '5',
            name: 'HTML',
            image: '/images/l5.png',
            bugList: []
        },
        {
            _id: '6',
            name: 'CSS',
            image: '/images/l6.png',
            bugList: []
        },
    ]
}

export default data;
