import { LegalPage } from './LegalPage';

export function AGB() {
  return (
    <LegalPage title="Allgemeine Geschäftsbedingungen">
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginBottom: '32px' }}>
        Stand: Juni 2026 — meintraumflug GmbH, Flugplatzstraße 100, 82205 Gilching
      </p>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der meintraumflug GmbH
        (nachfolgend „Anbieter") und dem Kunden über die Buchung von Gyrocopter-Rundflügen und
        Flug-Gutscheinen. Abweichende Bedingungen des Kunden werden nicht anerkannt, soweit der Anbieter
        ihnen nicht ausdrücklich schriftlich zugestimmt hat.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Die Buchung eines Rundflugs oder Gutscheins stellt ein verbindliches Angebot des Kunden dar.
        Der Vertrag kommt mit der Buchungsbestätigung per E-Mail durch den Anbieter zustande.
      </p>
      <p>
        Bei Online-Buchungen erhält der Kunde unmittelbar nach Abschluss des Zahlungsvorgangs eine
        Buchungsbestätigung an die angegebene E-Mail-Adresse.
      </p>

      <h2>§ 3 Preise und Zahlung</h2>
      <p>
        Alle angegebenen Preise sind Endpreise und beinhalten die gesetzliche Mehrwertsteuer. Die Zahlung
        erfolgt im Voraus per Kreditkarte, Apple Pay, Google Pay, Klarna oder SEPA-Lastschrift über den
        Zahlungsdienstleister Stripe.
      </p>
      <p>
        Für Gutscheine gilt: Der Kaufpreis entspricht dem Nennwert des Gutscheins. Gutscheine sind nicht
        auszahlbar und können nicht auf andere Personen übertragen werden, sofern nicht ausdrücklich anders
        vereinbart.
      </p>

      <h2>§ 4 Stornierung und Umbuchung</h2>

      <h3>Stornierung durch den Kunden</h3>
      <ul>
        <li><strong>Bis 14 Tage vor dem gebuchten Termin:</strong> kostenfreie Stornierung, volle Rückerstattung.</li>
        <li><strong>7 bis 13 Tage vor dem Termin:</strong> 50 % des Buchungspreises werden einbehalten.</li>
        <li><strong>Weniger als 7 Tage vor dem Termin:</strong> keine Rückerstattung. Eine kostenfreie Umbuchung auf einen anderen Termin ist einmalig möglich.</li>
        <li><strong>Nichtersch­einen:</strong> keine Rückerstattung.</li>
      </ul>

      <h3>Umbuchung durch den Kunden</h3>
      <p>
        Eine Umbuchung auf einen anderen Termin ist bis 48 Stunden vor dem gebuchten Flug einmalig
        kostenlos möglich. Weitere Umbuchungen werden mit einer Bearbeitungsgebühr von 15 € berechnet.
      </p>

      <h3>Stornierung wegen Wetter</h3>
      <p>
        Muss ein Flug aus wetterbedingten oder sicherheitstechnischen Gründen vom Anbieter abgesagt
        werden, wird dem Kunden ein Ersatztermin angeboten oder — auf Wunsch — der Buchungspreis
        vollständig erstattet. Ansprüche auf Schadensersatz, insbesondere für Reise- oder Unterkunftskosten,
        sind in diesem Fall ausgeschlossen.
      </p>

      <h2>§ 5 Gutscheine</h2>
      <p>
        Flug-Gutscheine sind ab Kaufdatum <strong>3 Jahre</strong> gültig. Sie können auf alle angebotenen
        Flugrouten angerechnet werden. Im Falle eines Preisunterschieds ist der Differenzbetrag vom
        Kunden zu entrichten bzw. wird dem Kunden erstattet. Eine Barauszahlung ist nicht möglich.
      </p>
      <p>
        Gutscheine können beim Tod des Inhabers auf Erben übertragen werden. Im Übrigen sind Gutscheine
        nicht übertragbar.
      </p>

      <h2>§ 6 Gesundheitliche Anforderungen und Gewichtsbeschränkung</h2>
      <p>
        Der Kunde versichert, dass er zum Zeitpunkt des Flugs körperlich in der Lage ist, an einem
        Gyrocopter-Rundflug teilzunehmen. Das Maximalgewicht der Passagiere ist aus Sicherheitsgründen
        beschränkt; die geltenden Grenzen werden im Buchungsprozess mitgeteilt und können bei Bedarf
        auch telefonisch erfragt werden.
      </p>
      <p>
        Der Anbieter behält sich vor, einen Flug abzulehnen oder abzubrechen, wenn der Gesundheitszustand
        oder das Gewicht des Kunden die Sicherheit des Flugs gefährdet. In diesem Fall wird der Buchungspreis
        erstattet.
      </p>

      <h2>§ 7 Haftung</h2>
      <p>
        Der Anbieter haftet für Schäden, die durch vorsätzliches oder grob fahrlässiges Handeln seiner
        Mitarbeiter oder seiner selbst verursacht wurden, nach den gesetzlichen Bestimmungen. Die Haftung
        für leichte Fahrlässigkeit ist — soweit gesetzlich zulässig — ausgeschlossen, es sei denn, es
        handelt sich um die Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), um Schäden aus
        der Verletzung des Lebens, des Körpers oder der Gesundheit oder um Schäden nach dem
        Produkthaftungsgesetz.
      </p>
      <p>
        Jeder Rundflug unterliegt den Zulassungsbedingungen der zuständigen Luftfahrtbehörde. Das Fliegen
        erfolgt nach den einschlägigen Luftverkehrsvorschriften. Der Pilot ist berechtigt, einen Flug
        jederzeit aus Sicherheitsgründen abzubrechen.
      </p>

      <h2>§ 8 Datenschutz</h2>
      <p>
        Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß unserer{' '}
        <a href="#datenschutz" onClick={() => { window.location.hash = 'datenschutz'; window.scrollTo(0, 0); }}>
          Datenschutzerklärung
        </a>.
      </p>

      <h2>§ 9 Anwendbares Recht und Gerichtsstand</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
        Gerichtsstand für Kaufleute ist München. Gegenüber Verbrauchern gilt die gesetzliche
        Zuständigkeit.
      </p>

      <h2>§ 10 Salvatorische Klausel</h2>
      <p>
        Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der
        übrigen Bestimmungen unberührt. Die unwirksame Bestimmung wird durch eine wirksame ersetzt, die
        dem wirtschaftlichen Zweck der unwirksamen Bestimmung am nächsten kommt.
      </p>
    </LegalPage>
  );
}
