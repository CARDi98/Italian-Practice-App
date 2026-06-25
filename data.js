const chapters = [
  {
    title: "Chapter 1: Core Conversation",
    items: [
      {focus:"Introductions", instruction:"Answer the question about your name.", question:"Come ti chiami?", answerItalian:"Mi chiamo Maureen.", answerEnglish:"My name is Maureen.", hint:"Use mi chiamo for 'my name is.'"},
      {focus:"Where you live", instruction:"Answer where you live.", question:"Dove abiti?", answerItalian:"Abito a New York.", answerEnglish:"I live in New York.", hint:"Use a with cities: a New York, a Roma."},
      {focus:"Where you are from", instruction:"Answer where you are from.", question:"Di dove sei?", answerItalian:"Sono di New York.", answerEnglish:"I am from New York.", hint:"Di dove sei? asks origin. Dove abiti? asks where you live."},
      {focus:"Nationality", instruction:"Answer yes, using sono.", question:"Sei americana?", answerItalian:"Sì, sono americana.", answerEnglish:"Yes, I am American.", hint:"For you: americana, with -a."},
      {focus:"Age", instruction:"Answer with avere, not essere.", question:"Quanti anni hai?", answerItalian:"Ho sessantuno anni.", answerEnglish:"I am sixty-one years old.", hint:"Italian says 'I have 61 years.'"},
      {focus:"Study", instruction:"Say what you study.", question:"Che cosa studi?", answerItalian:"Studio italiano.", answerEnglish:"I study Italian.", hint:"No article needed here: studio italiano."},
      {focus:"Why", instruction:"Say why you study Italian.", question:"Perché studi italiano?", answerItalian:"Studio italiano perché mi piace.", answerEnglish:"I study Italian because I like it.", hint:"Keep it simple. You do not need a long answer."},
      {focus:"Work", instruction:"Answer what work you do.", question:"Che lavoro fai?", answerItalian:"Lavoro nell'EdTech.", answerEnglish:"I work in EdTech.", hint:"You can also say: Faccio la product designer."},
      {focus:"Family", instruction:"Answer if you have siblings.", question:"Hai fratelli o sorelle?", answerItalian:"Sì, ho una sorella.", answerEnglish:"Yes, I have a sister.", hint:"Use ho for 'I have.'"},
      {focus:"Free time", instruction:"Give a short answer about free time.", question:"Che cosa fai nel tempo libero?", answerItalian:"Leggo, cammino e cucino.", answerEnglish:"I read, walk, and cook.", hint:"Three simple verbs are enough."}
    ]
  },
  {
    title: "Chapter 2: Articles",
    items: [
      {focus:"Definite article", instruction:"Choose the correct article for a masculine noun ending in -o.", question:"___ libro", answerItalian:"Il libro.", answerEnglish:"The book.", hint:"Most masculine -o nouns use il."},
      {focus:"Definite article", instruction:"Choose the correct article for a feminine noun ending in -a.", question:"___ casa", answerItalian:"La casa.", answerEnglish:"The house.", hint:"Most feminine -a nouns use la."},
      {focus:"Vowel noun", instruction:"Choose the correct article before a vowel.", question:"___ insegnante", answerItalian:"L'insegnante.", answerEnglish:"The teacher.", hint:"Before a vowel, il/la often become l'."},
      {focus:"LO nouns", instruction:"Choose the correct article before z.", question:"___ zaino", answerItalian:"Lo zaino.", answerEnglish:"The backpack.", hint:"Use lo before z."},
      {focus:"LO nouns", instruction:"Choose the correct article before s + consonant.", question:"___ studente", answerItalian:"Lo studente.", answerEnglish:"The student.", hint:"Use lo before s + consonant."},
      {focus:"Plural articles", instruction:"Make the article and noun plural.", question:"Il libro. Come si dice al plurale?", answerItalian:"I libri.", answerEnglish:"The books.", hint:"il becomes i; -o becomes -i."},
      {focus:"Plural articles", instruction:"Make the article and noun plural.", question:"La casa. Come si dice al plurale?", answerItalian:"Le case.", answerEnglish:"The houses.", hint:"la becomes le; -a becomes -e."},
      {focus:"Plural LO nouns", instruction:"Make the article and noun plural.", question:"Lo zaino. Come si dice al plurale?", answerItalian:"Gli zaini.", answerEnglish:"The backpacks.", hint:"lo becomes gli."},
      {focus:"Plural vowel nouns", instruction:"Make the article and noun plural.", question:"L'amica. Come si dice al plurale?", answerItalian:"Le amiche.", answerEnglish:"The friends.", hint:"A feminine noun uses le in plural."},
      {focus:"Indefinite article", instruction:"Choose un or una.", question:"___ penna", answerItalian:"Una penna.", answerEnglish:"A pen.", hint:"Penna is feminine."}
    ]
  },
  {
    title: "Chapter 3: Singular to Plural",
    items: [
      {focus:"Noun plural", instruction:"Change the noun to plural.", question:"Il gatto", answerItalian:"I gatti.", answerEnglish:"The cats.", hint:"-o becomes -i."},
      {focus:"Noun plural", instruction:"Change the noun to plural.", question:"La tazza", answerItalian:"Le tazze.", answerEnglish:"The cups.", hint:"-a becomes -e."},
      {focus:"Noun plural", instruction:"Change the noun to plural.", question:"Il cane", answerItalian:"I cani.", answerEnglish:"The dogs.", hint:"-e becomes -i."},
      {focus:"Essere plural", instruction:"Change the full sentence to plural.", question:"Il gatto è nero.", answerItalian:"I gatti sono neri.", answerEnglish:"The cats are black.", hint:"è becomes sono; nero becomes neri."},
      {focus:"Essere plural", instruction:"Change the full sentence to plural.", question:"La tazza è rossa.", answerItalian:"Le tazze sono rosse.", answerEnglish:"The cups are red.", hint:"rossa becomes rosse."},
      {focus:"Essere plural", instruction:"Change the full sentence to plural.", question:"La finestra è aperta.", answerItalian:"Le finestre sono aperte.", answerEnglish:"The windows are open.", hint:"Everything agrees with finestre."},
      {focus:"Essere plural", instruction:"Change the full sentence to plural.", question:"Il libro è interessante.", answerItalian:"I libri sono interessanti.", answerEnglish:"The books are interesting.", hint:"Adjectives ending in -e become -i in plural."},
      {focus:"Negative plural", instruction:"Change the full sentence to plural.", question:"La borsa non è cara.", answerItalian:"Le borse non sono care.", answerEnglish:"The bags are not expensive.", hint:"non stays before the verb."},
      {focus:"Article + plural", instruction:"Change this to plural.", question:"Il coltello bello", answerItalian:"I coltelli belli.", answerEnglish:"The beautiful knives.", hint:"-o becomes -i for both noun and adjective."},
      {focus:"Article + plural", instruction:"Change this to plural.", question:"La scuola italiana", answerItalian:"Le scuole italiane.", answerEnglish:"The Italian schools.", hint:"-a becomes -e for both noun and adjective."}
    ]
  },
  {
    title: "Chapter 4: Adjective Agreement",
    items: [
      {focus:"Adjective agreement", instruction:"Complete the sentence with the correct adjective form.", question:"La casa è ___. bello / bella", answerItalian:"La casa è bella.", answerEnglish:"The house is beautiful.", hint:"Casa is feminine singular."},
      {focus:"Adjective agreement", instruction:"Complete the sentence with the correct adjective form.", question:"Il libro è ___. nero / nera", answerItalian:"Il libro è nero.", answerEnglish:"The book is black.", hint:"Libro is masculine singular."},
      {focus:"Plural adjectives", instruction:"Change the sentence to plural.", question:"Il vestito è corto.", answerItalian:"I vestiti sono corti.", answerEnglish:"The outfits are short.", hint:"corto becomes corti."},
      {focus:"Plural adjectives", instruction:"Change the sentence to plural.", question:"La porta è aperta.", answerItalian:"Le porte sono aperte.", answerEnglish:"The doors are open.", hint:"aperta becomes aperte."},
      {focus:"E adjective", instruction:"Change the sentence to plural.", question:"Il libro è interessante.", answerItalian:"I libri sono interessanti.", answerEnglish:"The books are interesting.", hint:"interessante becomes interessanti."},
      {focus:"E adjective", instruction:"Choose the correct form.", question:"La lezione è ___. interessante / interessanta", answerItalian:"La lezione è interessante.", answerEnglish:"The lesson is interesting.", hint:"Some adjectives end in -e for both masculine and feminine singular."},
      {focus:"Color", instruction:"Make the noun and adjective plural.", question:"Il vino bianco", answerItalian:"I vini bianchi.", answerEnglish:"The white wines.", hint:"bianco becomes bianchi to keep the hard c sound."},
      {focus:"Color", instruction:"Make the noun and adjective plural.", question:"La penna rossa", answerItalian:"Le penne rosse.", answerEnglish:"The red pens.", hint:"rossa becomes rosse."},
      {focus:"Agreement", instruction:"Complete the phrase.", question:"Le tazze sono ___. bianco / bianche", answerItalian:"Le tazze sono bianche.", answerEnglish:"The cups are white.", hint:"Tazze is feminine plural."},
      {focus:"Agreement", instruction:"Complete the phrase.", question:"I bambini sono ___. buono / buoni", answerItalian:"I bambini sono buoni.", answerEnglish:"The children are good.", hint:"Bambini is masculine plural."}
    ]
  },
  {
    title: "Chapter 5: Possessives",
    items: [
      {focus:"Possessive", instruction:"Say 'my book.'", question:"Il libro belongs to me.", answerItalian:"Il mio libro.", answerEnglish:"My book.", hint:"Libro is masculine singular: il mio."},
      {focus:"Possessive", instruction:"Say 'my pen.'", question:"La penna belongs to me.", answerItalian:"La mia penna.", answerEnglish:"My pen.", hint:"Penna is feminine singular: la mia."},
      {focus:"Possessive plural", instruction:"Change to plural.", question:"Il mio libro.", answerItalian:"I miei libri.", answerEnglish:"My books.", hint:"il mio becomes i miei."},
      {focus:"Possessive plural", instruction:"Change to plural.", question:"La mia amica.", answerItalian:"Le mie amiche.", answerEnglish:"My friends.", hint:"la mia becomes le mie."},
      {focus:"Possessive", instruction:"Answer the question from the other person's point of view.", question:"Quale spazzolino è mio?", answerItalian:"Questo spazzolino è tuo.", answerEnglish:"This toothbrush is yours.", hint:"You ask 'mine'; I answer 'yours.'"},
      {focus:"Possessive plural", instruction:"Answer the question from the other person's point of view.", question:"Quali spazzolini sono i miei?", answerItalian:"Questi spazzolini sono i tuoi.", answerEnglish:"These toothbrushes are yours.", hint:"Plural subject: questi spazzolini sono."},
      {focus:"Possessive", instruction:"Change the sentence to plural.", question:"La tua scuola è italiana.", answerItalian:"Le tue scuole sono italiane.", answerEnglish:"Your schools are Italian.", hint:"tua becomes tue; è becomes sono."},
      {focus:"Possessive", instruction:"Change the sentence to plural.", question:"Il suo gatto è nero.", answerItalian:"I suoi gatti sono neri.", answerEnglish:"His/her cats are black.", hint:"suo becomes suoi."},
      {focus:"Possessive", instruction:"Change the sentence to plural.", question:"La sua tazza è bianca.", answerItalian:"Le sue tazze sono bianche.", answerEnglish:"His/her cups are white.", hint:"sua becomes sue."},
      {focus:"Possessive", instruction:"Say the plural form.", question:"Il tuo compito è corto.", answerItalian:"I tuoi compiti sono corti.", answerEnglish:"Your assignments are short.", hint:"tuo becomes tuoi."}
    ]
  },
  {
    title: "Chapter 6: Essere, Avere, Fare",
    items: [
      {focus:"Essere", instruction:"Answer with essere.", question:"Sei americana?", answerItalian:"Sì, sono americana.", answerEnglish:"Yes, I am American.", hint:"sono = I am."},
      {focus:"Avere", instruction:"Answer with avere.", question:"Hai una penna?", answerItalian:"Sì, ho una penna.", answerEnglish:"Yes, I have a pen.", hint:"ho = I have."},
      {focus:"Avere", instruction:"Answer with avere.", question:"Hai un gatto?", answerItalian:"Sì, ho un gatto.", answerEnglish:"Yes, I have a cat.", hint:"Keep it simple: un gatto, not dei gatti for now."},
      {focus:"Fare", instruction:"Answer what work you do.", question:"Che lavoro fai?", answerItalian:"Faccio la product designer.", answerEnglish:"I am a product designer.", hint:"For jobs, Italian often uses fare: faccio la..."},
      {focus:"Fare", instruction:"Answer what she does for work.", question:"Lei che lavoro fa?", answerItalian:"Fa l'infermiera.", answerEnglish:"She is a nurse.", hint:"fa = he/she does."},
      {focus:"Fare", instruction:"Answer the cooking question.", question:"Fai gli spaghetti al ragù?", answerItalian:"Sì, faccio gli spaghetti al ragù.", answerEnglish:"Yes, I make spaghetti with meat sauce.", hint:"Question: fai. Answer about yourself: faccio."},
      {focus:"Lavorare", instruction:"Answer where you work.", question:"Dove lavori?", answerItalian:"Lavoro nell'EdTech.", answerEnglish:"I work in EdTech.", hint:"lavoro = I work."},
      {focus:"Studiare", instruction:"Answer what you study.", question:"Che cosa studi?", answerItalian:"Studio italiano.", answerEnglish:"I study Italian.", hint:"studio = I study."},
      {focus:"Avere", instruction:"Answer with we have.", question:"Avete i passaporti?", answerItalian:"Sì, abbiamo i passaporti.", answerEnglish:"Yes, we have the passports.", hint:"abbiamo = we have."},
      {focus:"Essere", instruction:"Answer with we are.", question:"Siamo a Roma?", answerItalian:"Sì, siamo a Roma.", answerEnglish:"Yes, we are in Rome.", hint:"siamo = we are."}
    ]
  },
  {
    title: "Chapter 7: Questions & Requests",
    items: [
      {focus:"Question word", instruction:"Answer what this is.", question:"Che cos'è questo?", answerItalian:"È un libro.", answerEnglish:"It is a book.", hint:"questo for masculine nouns."},
      {focus:"Question word", instruction:"Answer what this is.", question:"Che cos'è questa?", answerItalian:"È una finestra.", answerEnglish:"It is a window.", hint:"questa for feminine nouns."},
      {focus:"Question word", instruction:"Answer who she is.", question:"Chi è lei?", answerItalian:"Lei è la mia insegnante.", answerEnglish:"She is my teacher.", hint:"chi = who."},
      {focus:"Request", instruction:"Ask for a coffee politely.", question:"At the bar: ask for one coffee.", answerItalian:"Vorrei un caffè, per favore.", answerEnglish:"I would like a coffee, please.", hint:"Vorrei = I would like."},
      {focus:"Request", instruction:"Ask for the check politely.", question:"At a restaurant: ask for the check.", answerItalian:"Vorrei il conto, per favore.", answerEnglish:"I would like the check, please.", hint:"il conto = the check."},
      {focus:"Travel", instruction:"Ask for two train tickets politely.", question:"At the station: ask for two train tickets.", answerItalian:"Vorrei due biglietti del treno, per favore.", answerEnglish:"I would like two train tickets, please.", hint:"due biglietti = two tickets."},
      {focus:"Preference", instruction:"Answer what you would like.", question:"Tè o caffè?", answerItalian:"Vorrei un caffè, per favore.", answerEnglish:"I would like a coffee, please.", hint:"A complete polite answer is useful."},
      {focus:"Reservation", instruction:"Answer that you have a reservation.", question:"Hai una prenotazione?", answerItalian:"Sì, ho una prenotazione.", answerEnglish:"Yes, I have a reservation.", hint:"prenotazione is feminine."},
      {focus:"Place", instruction:"Answer where the children are.", question:"Dove sono i bambini?", answerItalian:"I bambini sono a scuola.", answerEnglish:"The children are at school.", hint:"a scuola = at school."},
      {focus:"Place", instruction:"Answer where you walk.", question:"Dove cammini?", answerItalian:"Cammino nel parco.", answerEnglish:"I walk in the park.", hint:"nel = in + il."}
    ]
  },
  {
    title: "Chapter 8: Mixed Review",
    items: [
      {focus:"Mixed", instruction:"Answer naturally.", question:"Come stai?", answerItalian:"Sto bene, grazie. E tu?", answerEnglish:"I am well, thank you. And you?", hint:"A good automatic phrase."},
      {focus:"Mixed", instruction:"Change the sentence to plural.", question:"La bottiglia è piena di vino.", answerItalian:"Le bottiglie sono piene di vino.", answerEnglish:"The bottles are full of wine.", hint:"bottiglia becomes bottiglie."},
      {focus:"Mixed", instruction:"Choose the correct article.", question:"___ zoo", answerItalian:"Lo zoo.", answerEnglish:"The zoo.", hint:"z uses lo."},
      {focus:"Mixed", instruction:"Say the plural.", question:"Lo studente", answerItalian:"Gli studenti.", answerEnglish:"The students.", hint:"lo becomes gli."},
      {focus:"Mixed", instruction:"Change to plural.", question:"Il mio numero di telefono è lungo.", answerItalian:"I miei numeri di telefono sono lunghi.", answerEnglish:"My phone numbers are long.", hint:"numero becomes numeri; lungo becomes lunghi."},
      {focus:"Mixed", instruction:"Answer with the correct person of avere.", question:"Loro hanno i coltelli vecchi?", answerItalian:"Sì, hanno i coltelli vecchi.", answerEnglish:"Yes, they have the old knives.", hint:"hanno = they have."},
      {focus:"Mixed", instruction:"Answer with the correct person of fare.", question:"Voi fate il vino rosso?", answerItalian:"Sì, facciamo il vino rosso.", answerEnglish:"Yes, we make red wine.", hint:"Question to you all: fate. Answer as us: facciamo."},
      {focus:"Mixed", instruction:"Answer why you study Italian.", question:"Perché studi italiano?", answerItalian:"Studio italiano perché amo l'Italia.", answerEnglish:"I study Italian because I love Italy.", hint:"amo = I love."},
      {focus:"Mixed", instruction:"Answer the job question.", question:"Che lavoro fa?", answerItalian:"Fa l'infermiera.", answerEnglish:"She is a nurse.", hint:"Use fare for jobs."},
      {focus:"Mixed", instruction:"Make the phrase plural.", question:"La mia valigia", answerItalian:"Le mie valigie.", answerEnglish:"My suitcases.", hint:"valigia becomes valigie."}
    ]
  }
];
