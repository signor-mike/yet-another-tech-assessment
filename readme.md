# clone, cd, start
```
git clone https://github.com/Mike-OxHuge/yet-another-tech-assessment.git
cd yet-another-tech-assessment
npm i && npm run start
```

And fire your POST requests to http://localhost:42069/api/transaction

JSON:
{
"date": "2021-01-01",
"amount": "100.00",
"currency": "EUR",
"client_id": 42
}

Available IDs:
1 - default comission
42 - discount comission
666 - turnover more than 1000

## OR if you're a happy Debian based Linux user you can run included scripts:

run:
$ sh run.sh

delete local repo with all its files:
$ sh cleanup.sh
