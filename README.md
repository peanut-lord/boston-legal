# Web API for german acts (Codename: Boston Legal)

Small NodeJS service which provides a Web API for http://www.gesetze-im-internet.de/. 
It fetches its contents and parses them for the corresponding act. For performance they 
will be stored in a redis.

To start you can either use docker or npm locally:

```
docker-compose run
# OR
npm run build && npm run start
```

After this you can curl the service either with or without the section:

```
morgoth:~ chris$ curl http://localhost:8080/bgb/552
(1) Der Vermieter kann die Ausübung des Wegnahmerechts (§ 539 Abs. 2) durch Zahlung einer angemessenen Entschädigung abwenden, wenn nicht der Mieter ein berechtigtes Interesse an der Wegnahme hat.
(2) Eine Vereinbarung, durch die das Wegnahmerecht ausgeschlossen wird, ist nur wirksam, wenn ein angemessener Ausgleich vorgesehen ist.
morgoth:~ chris$ curl http://localhost:8080/bgb/552/1
(1) Der Vermieter kann die Ausübung des Wegnahmerechts (§ 539 Abs. 2) durch Zahlung einer angemessenen Entschädigung abwenden, wenn nicht der Mieter ein berechtigtes Interesse an der Wegnahme hat.
```