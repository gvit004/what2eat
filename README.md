# What2Eat

Requires Docker and Docker-Compose

Clone Repo, enter cloned folder, `docker-compose up`, PROFIT $$$

`POST : /what2eat`

Accepts JSON with format {"list":"apple,banana,coke"} and stores as 3 separate records

`GET : /what2eat`

Retrieves random food

`GET: /what2eat/all`

Retrieves availiable food

