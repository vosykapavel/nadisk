# NaDisk.cz

![alt text](http://g.recordit.co/VaicIPFUyt.gif "Jak to funguje")

## Co to je?

NaDisk je webová aplikace (běžící na adrese www.nadisk.cz), která návštěvníkům
umožňuje stáhnout si celá fotoalba (v plánu byly i videa) z různých služeb jako
jeden zazipovaný soubor. V současné době jsou podporovány pouze služby
rajce.net a instagram.com a to v těchto případech:
- veřejné album jakéhokoli uživatele na rajce.net
- jakékoli skryté album na rajce.net, pokud znám odkaz
- jakékoli zamčené album na rajce.net, pokud znám jméno a heslo k albu
- uživatel na instagram.com má veřejný profil

## Technikálie
NaDisk jsem se snažil napsat jako moderní webovou aplikaci, kde je frontend jako
Single Page Appliaction a se serverem, který zastává téměř pouze úlohu jakéhosi
API, komunikuje AJAXově. Nebo spíš AJAJově, abych byl korektní, protože formát dat
je, jak už to dnes bývá, samozřejmě JSON. Jo a csska "čistě" bez preprocesorů,
bůtsrapů, faundejšnů. Prostě mi bylo asi 16 let, když jsem to začal psát, a ty
věci jsem neznal, nebo nevěděl, jak je použít. Za to ale je to HTML5 a CSS3 ;-).

### Takže SPA?
Jo, ale bez využití nějakého Angularu nebo jiného vhodného frameworku. Trpí to
tedy obvyklými nedostatky SPA (např. ukládání stavů do historie a s tím spojené
  tlačítko zpět v prohlížeči, a vůbec routování a server-side rendering),
  které už nebyl čas ani motivace řešit. Všechno je to narvaný do souboru
  script.js, tak se nelekněte. K překreslování bylo použito jQuery.

### Backend
Backend je psaný též v "čistém" a neobjektovém PHP bez žádného framworku.
Chtěl jsem využít oficiální Rajče API, ale nebylo pro mé použití vhodné,
takže se to všechno nehezky doluje z HTML za použití krásné knihovny
 phpQuery :-).

Na instagram se napojuju pomocí adresy "instagram.com/media", kterou jsem našel
"reverzním inženýrstvým" (:D načítá se z toho taková ta nekonečná zeď) a pěkně
to aspoň vrací data v JSONu. Nicméně musí se to taky projet pěkně v cyklu. Podobně
myslím na rajčeti získávám seznam alb, jakože taky musím projet celé stránkování.

## Příběh
Tento projekt vznikl na podnět Martina Poláka, který zjistil, že mu instagram
neumožňuje stáhnout si nahrané fotografie hromadně ani po jedné. Začali jsme
vymýšlet projekt, který bude umět stahovat mediální obsah z mnoha takových služeb.
Dali jsme tomu jméno Opendown. Vytvořili jsme několik grafických návrhů, malovali
jsme loga, udělali několim html prototypů. Nicméně, neudělali jsme žádnou analýzu,
která by popsala potřeby našich návštěvníků a vůbec zjistila, zda náš projekt
nějaké bude mít, což byla myslím největší chyba projektu.

Už mě štvalo, že se projekt furt nevyplácí a těch hodin ubýhalo hodně. Koupil
jsem proto doménu NaDisk.cz, která se mi zdála pro "místní trh" lepší. Dotáhl
jsem to k fungující verzi (ale jako nemyslete si, že jsem verzoval). Chybou bylo,
že jsem snad do dnes nikde pořádně nadisk nesdílel a tak ho použilo jen pár
příbuzných. Projekt jsem ale použil jako příklad ke své maturitní práci, kterou
jsem zaměřil na Single Page Aplikace.

Jo a nasadil jsem tam reklamní banner etarget, který mi vydělal už skoro 11 Kč. :D

### Poučení
Podobně jako každý příběh má mít poučení, chěl bych, stejně jako v mé maturitní
práci odkázat na článek Jirky Knesla http://www.knesl.com/veci-ktere-me-su-na-startupech ze kterého si odnáším:
- "Ne, 99 % aplikací nemusí být single-page. Ve skutečnosti vás to jen zpomalí."
- "Pokud něco takového na trhu zatím není, může za tím být to, ... že tam ty peníze nejsou."
- "Při budování startupu počítejte s tím, že si ty uživatele a zákazníky budete muset vyběhat. Obchodní část firmy je minimálně stejně důležitá, jako ta, která vytváří produkt."
