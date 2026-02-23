const http = require('http');

const data = JSON.stringify({
    name: "Automation Test",
    email: "test@example.com",
    phone: "+91-0000000000",
    companyName: "Test Studio",
    decisionRole: "owner",
    projectType: "private-commission",
    location: "New Delhi",
    dimensions: "2m x 2m",
    budget: "under-200k",
    timeline: "1-3-months",
    description: "Automated test submission to verify email recipient update."
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/commission',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
});

req.on('error', (error) => {
    console.error(error);
});

req.write(data);
req.end();
