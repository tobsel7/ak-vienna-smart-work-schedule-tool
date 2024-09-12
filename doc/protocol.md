# Workshop Protokoll

## Sammlung der Annahmen und Fakten

- 20 Mitarbeiter, deren Arbeitspensum geplant werden soll.
- Input: geplante Urlaube und Abwesenheiten.
- Annahme: Personalabteilung trägt diese Informationen händisch in ein Excel ein.
- Erwartetes Arbeitspensum ist bekannt, ändert sich jedoch häufig.
- Ziel: Arbeitsdauer für die nächsten Tage/Wochen mit einem Tool automatisieren.

## Involvierte Nutzer

### Rechtsberater

Mitarbeiter planen ihren Urlaub und Abwesenheiten in einem bis jetzt unbekannten Tool. Sie pflegen also eine Art von
Kalender. Wir sehen vor, dass Mitarbeiter, wenn noch nicht so vorgesehen, auch Präferenzen für die Arbeitszeiten und
Arbeitstage angeben können.

### Vorgesetzte

Vorgesetzte haben Informationen zum erwarteten Arbeitspensum und genehmigen Urlaube. Ihr Wissen kann auch einfließen
in die Planung.

### Personalabteilung

Ein Personalmitarbeiter ist der direkte Nutzer des neuen Tools. Die Interaktionen und Workflows sollten sich stark an
seinen Bedürfnissen orientieren.

## Datengrundlage

### Historische Daten

Man kann die Beratungen und Dienstpläne speichern und auch als Input für die Planung verwenden.

### Geplante Abwesenheiten

Der Kalender der Mitarbeiter enthält Informationen zu geplanten Abwesenheiten. Dieser ist maßgeblich für die Zuordnung
von einzelnen Mitarbeitern zu bestimmten Tagen.

### Terminbuchungen

Die Beratungen werden in einem anderen Tool gebucht. Die bereits eingetragenen Termine sind hilfreich für Abschätzungen
des Beratungsbedarfs.

## Geplantes Resultat

### Demo Tool für die Planung

Ein Tool, das alle erfassten Daten aus einem Excel extrahiert, es dem Mitarbeiter erlaubt zusätzliche Daten zu erfassen
und einen Planungsvorschlag erstellt.

Kernfeatures:
- Import des Mitarbeiterkalenders aus Excel
- Aufruf eines AI Regelmodells mit den Daten
- Anzeige des Planungsvorschlags

Zusatzfeatures:
- Interpretation des Vorschlags (alle Anforderungen erfüllt?)
- Vorschläge für manuelle Anpassungen
- Export des Planungsvorschlags

### Konzept für vollumfängliches Planungstool

Das Demotool soll als Proof of Concept für ein vollumfängliches Planungstool dienen. Dieses Tool soll neben der
Einsatzplanung auch die Erfassung von Arbeitszeiten und Urlauben ermöglichen. Zusätzlich können Modelle
für die Beratungsbedarfsvorhersage entwickelt werden.

Als Resultat würde gar nicht mehr manuell einen Plan erstellen, sondern hat die Planung automatisiert. Vorgesetzte und
die Personalabteilung überprüfen lediglich die Pläne ändern sie.
