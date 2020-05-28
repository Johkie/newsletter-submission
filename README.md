# Inlämningsuppgift - Vill du ha mitt nyhetsbrev?
Nu skall vi bygga en enkel webbapplikation som samlar information från besökare och sedan gör dem tillgängliga för webbsidans administratör.

Till denna uppgift så ska du använda dig utav node.js som backend.
Applikationen skall bestå av en frontend webbsida där användaren kan skapa ett konto samt välja om de vill prenumerera på ditt nyhetsbrev, samt en backend där en administratör ska kunna logga in och se samtliga registrerade användare samt en lista på vilka användare som önskar ett nyhetsbrev.

För frontend får ni använda valfria javascript ramverk och bibliotek. Jag rekomenderar att ni kollar på React om ni vill ha stöd genom handledning under uppgiften. 
I andra ramverk är min kunskap begränsad så väljer du tex Angular så är kravet på självstudier högre. Reflektera över val utav vanilla.js vs ramverk och bibliotek i din reflektion.

I uppgiften kommer ni att få hantera läsning och presentation utav data på lite olika sätt då vi kombinerar en Headless front end med ett Monolit backend. 

## G krav:
#### Backend:
  + Administrationsvyn ska enbart nås från backend applikationen. 
  + En administratör skall kunna se en lista på samtliga användare samt en sträng (kommaseparerad) på alla mailadresser för dem som valt att prenumerera på nyhetsbrev.
#### Frontend:
  + En besökare ska kunna registrerar sig som ny användare via frontend sidan.
  + Användaren ska sparas i en json fil på servern. 
  + En registerad användare ska kunna logga in med sina sparade uppgifter och ändra prenumerationsstatus (Ja/Nej).

## VG krav:
#### Backend:
  + Administrationsvyn i backend skall vara skyddad bakom en inloggning.
  + Det skall finnas en hårdkodad administratör med användarnamn "test" samt lösenordet "1234" för backend admin.
  + Användarens (frontend) lösenord ska krypteras (på backend) innan det sparas.
#### Övrigt:
  + Lämna en skriftlig reflektion utav uppgiften (Max 4 A4-sidor)
 
 
> Lämna in uppgiften via github med ett repo med två mappar "frontend" samt "backend".
> Länken samt reflektionen (om ni siktar på VG kraven) lämnas in via Ping Pong senast fredag 5 juni kl 2300. 
> Reflektion får lämnas in som en del utav repot i readme.md! Notera då detta när ni lämnar in.
