const { app } = require('@azure/functions');

app.http('fruits', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('HTTP trigger function processed a request.');

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fruits: ["apple", "banana", "orange"]
            })
        };
    }
});
