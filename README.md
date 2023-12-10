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
5. Damit ist die Datenbank fertig, jedoch bleiben sie auf den Pfad.

**Webseite**

1. Um die Webseite zu starten müssen sie den Befehl ausführen: python manage.py runserver
