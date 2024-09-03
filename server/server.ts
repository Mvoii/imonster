const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());


// hardcoded user
const users = [
    { name: "Drac Jr", password: "transylvania", dob: "2041-11-08" },
    { name: 'Wolfie Wolf', password: 'moon', dob: '2000-01-01' },
    { name: 'mummy', password: 'egypt', dob: '1000-01-01' },
];

app.post('/login', (req, res) => {
    const { name, password } = req.body;

    const user = users.find(u => u.name === name && u.password === password);

    if (user) {
        return res.status(200).json({ message: "Login successfull"});
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

app.listen(port, () => {
    console.log(`we are alive on port ${port}`);
});
