# PizzaOrders - Frontend App

### Uruchomienie aplikacji w środowisku deweloperskim

**1. Pobranie projektu z repozytorium**
```sh
 git clone https://github.com/ppsi2-pizza-orders/pizza-orders-frontend
 cd pizza-orders-frontend
```
**2. Budowa kontnera dockerowego**
```sh
 docker-compose build
```
**3. Uruchomienie aplikacji**
```sh
 docker-compose up
```
**4. Aplikacja jest dostępna pod adresem:**
```sh
 localhost:4200
```
<br>

### Testowanie aplikacji
Testy jednostkowe [Karma](https://karma-runner.github.io).
```sh
 docker exec -it pizza-orders-frontend bash
 ng test
```
Testy end-to-end [Protractor](http://www.protractortest.org/).
```sh
 docker exec -it pizza-orders-frontend bash
 ng e2e
```
<br>

### Budowanie aplikacji
```sh
 docker exec -it pizza-orders-frontend bash
 ng build
```
Artefakty kompilacji będą przechowywane w katalogu `dist/`. Użyj flagi `--prod` dla kompilacji produkcyjnej.