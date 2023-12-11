# SbD

Stromzähler Kundenportal

# Autoren

**Benedikt Gebauer**

- **Alter:** [21]
- **Wohnort:** [Mannheim]
- **Unternehmen:** [Siemens AG]

**Pascal Weider**

- **Alter:** [20]
- **Wohnort:** [Mannheim]
- **Unternehmen:** [Siemens Healthcare GmbH]

**Samuel Amoah**

- **Alter:** [22]
- **Wohnort:** [Ludwigshafen]
- **Unternehmen:** [Siemens AG]

**Yichen Zhang**

- **Alter:** [21]
- **Wohnort:** [Mannheim]
- **Unternehmen:** [REWE digital GmbH]

# Projekt starten

Um das Projekt starten zu lassen müssen noch vorbereitungen angepasst werden:
**Datebank**

1. Navigieren sie zum Pfad: "sbd_django\MySQL"
2. Der Docker muss erstellt werden mit: **docker-compose up --build**
3. Wenn der Docker läuft, müssen sie in dem Pfad: "sbd_django" zurück.
4. Geben sie nacheinander zwei Befehle ins cmd ein:
   - python manage.py makemigrations provider_portal
   - python manage.py makemigrations users
   - python manage.py migrate

**Applikation**

1. Um das Backend zu starten muss der Befehel python manage.py runserver ausgeführt werden
2. Innerhalbd des Ordners sbd_react wird durch npm start das Frontend gestartet

## Modulstruktur

- **sbd_django**: Backend-Verzeichnis mit Django-Konfigurationen.
  - **cert**: Sicherheitszertifikate.
  - **json.schemas**: JSON-Validierungsschemata.
  - **MySQL**: Dockerfile und Docker-Compose für die Erstellung der Datenbank.
  - **provider_portal**: Hauptschnittstelle für unsere Applikation.
  - **users**: Modul für Authentifikation und Autorisierung.
  - **Resources**: Statische und andere Ressourcen.

- **sbd_react**: Frontend-Verzeichnis mit React-Komponenten.
  - **public**: Statische Assets und Einstiegspunkte.
  - **src**: Hauptentwicklungsverzeichnis.
    - **components**: Unterteilte Funktionsmodule.
    - **js**: JavaScript-Hilfsdateien.
    - **styles**: CSS-Stildefinitionen.
    - **tests**: Testfälle.
    - **utils**: Skript für die Inputvalidierung.

## Abhängigkeiten

### Frameworks
- **django**
- **ReactJs**

### Libraries
- **pyjwt**

## Testplan

- **SAST CodeQL**
  - Aufruf nach merge nach Main branch.
  - Testet alle Javascript und python files.
  - Testet gegen Injection-Angriffe, Sicherheitslücken in Authentifikation und Autorisierung und unsichere Datenverarbeitung.

- **Automatisierte Tests für Ein-/ und Ausgabevalidierung**
  - Testet, ob die Eingabe und Ausgabe dem Json-Format entspricht.
  - Testet alle möglichen Eingaben und Ausgaben.

- **Automatisierte Tests für API**
  - Testet register und login Schnittstelle im Django-Backend.
