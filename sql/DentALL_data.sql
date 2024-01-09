--Dodavanje administratora u sustav
INSERT INTO public.adminuser(
	pin, firstname, lastname, phone, email)
	VALUES ('12345678', 'John', 'Doe', '+1234567890', 'john.doe@example.com'),
	('98765432', 'Alice', 'Smith', '+9876543210', 'alice.smith@example.com'),
	('23456789', 'Bob', 'Johnson', '+2345678901', 'bob.johnson@example.com'),
	('34567890', 'Eva', 'Brown', '+3456789012', 'eva.brown@example.com'),
	('45678901', 'Michael', 'Williams', '+4567890123', 'michael.williams@example.com'),
	('56789012', 'Karlo', 'Baljak', '+7890123456', 'kb53813@fer.hr'),
	('55883960', 'Mislav', 'Matić', '+5598741358', 'mm46587@fer.hr');
	
	
--Dodavanje gradova u RH s klinikama
INSERT INTO Town (townName, postalCode)
	 VALUES ('Gornja Bistra', '10298'), 
	('Bjelovar', '43000'), 
	('Slavonski Brod', '35000'), 
	('Čakovec', '40000'), 
	('Cernik', '35404'), 
	('Crikvenica', '51260'), 
	('Daruvar', '43500'), 
	('Dražice', '51218'), 
	('Dubrovnik', '20000'), 
	('Gospić', '53000'), 
	('Ivanić Grad', '10310'), 
	('Karlovac', '47000'), 
	('Knin', '22300'), 
	('Koprivnica', '48000'), 
	('Lipik', '34551'), 
	('Lovran', '51415'), 
	('Vela Luka', '20270'), 
	('Makarska', '21300 '), 
	('Bio grad moru', '23210'), 
	('Našice', '31500'), 
	('Ogulin', '47300'), 
	('Opatija', '51410'), 
	('Popovača', '44317'), 
	('Požega', '34000'), 
	('Pula', '52100'), 
	('Rab', '51280'), 
	('Duga Resa', '47250'), 
	('Rovinj', '52210'), 
	('Šibenik', '22000'), 
	('Sisak', '44000'), 
	('Krapinske Toplice', '49217'), 
	('Stubičke toplice', '49244'), 
	('Varaždinske Toplice', '42223'), 
	('Ugljan', '23275'), 
	('Varaždin', '42000'), 
	('Vinkovci', '32100'), 
	('Virovitica', '33000'), 
	('Vukovar', '32000'), 
	('Zabok', '49210'), 
	('Zadar', '23000'), 
	('Zagreb', '10000');
	
	
--Dodavanje klinika u sustav
INSERT INTO Clinic (clinicName, latitude, longitude, clinicAddress, TownID)
	VALUES ('Klinička bolnica "Dubrava"', 45.8346959999999, 16.0353560055485, 'Avenija Gojka Šuška 6', 41),
	('Klinička bolnica "Sveti Duh"', 45.8204813, 15.9392521715245, 'Sveti Duh 64', 41),
	('Klinička bolnica "Merkur"', 45.8204723, 15.9974095969862, 'Zajčeva 19', 41),
	('Klinika za dječje bolesti', 45.809275, 15.9650594, 'Klaićeva 16', 41),
	('Klinika za infektivne bolesti "Dr. Fran Mihaljević"', 45.8306009, 15.9807703, 'Mirogojska 8', 41),
	('Klinika za ortopediju Lovran', 45.2991600999999, 14.27838097141, 'Šetalište Maršala Tita 1', 16),
	('Magdalena - Klinika za kardiovaskularne bolesti Med.fakulteta u Osijeku', 46.09340995, 15.8382063713707, 'Ljudevita Gaja 2', 31),
	('Biokovka specijalna bolnica za medicinsku rehabilitaciju - Makarska', 43.3021983, 17.0093983, 'Put Cvitačke 9', 18),
	('Kalos Specijalna bolnica za medicinsku rehabilitaciju Vela Luka', 42.9612713, 16.7168095, 'Obala 3 br. 3', 17),
	('Bolnica za ortopedsku kirurgiju i rehabilitaciju "Prim.dr. Martin Horvat" Rovinj', 45.09869785, 13.6363734011176, 'Ulica Luigi Monti 2', 28),
	('Specijalna bolnica za kronične bolesti dječje dobi Gornja Bistra', 45.91679125, 15.9042815863824, 'Bolnička 21', 1),
	('Specijalna bolnica za medicinsku rehabilitaciju "Naftalan" Ivanić Grad', 45.7079624, 16.3878311, 'Omladinska 23a', 11),
	('Specijalna bolnica za medicinsku rehabilitaciju Daruvarske Toplice', 45.5975227737725, 17.2282597903022, 'Julijev park 1', 7),
	('Specijalna bolnica za medicinsku rehabilitaciju Krapinske Toplice', 46.0932831563495, 15.837873569274, 'Gajeva 2', 31),
	('Specijalna bolnica za medicinsku rehabilitaciju Lipik', 45.4128526, 17.1623100188203, 'Marije Terezije 13', 15),
	('Specijalna bolnica za medicinsku rehabilitaciju Stubičke Toplice', 45.9777318648046, 15.935502298646, 'Park Matije Gupca 1', 32),
	('Specijalna bolnica za medicinsku rehabilitaciju Varaždinske Toplice', 46.21082495, 16.4184849336697, 'Trg Slobode 1', 33),
	('Specijalna bolnica za ortopediju Biograd na moru', 43.9489433, 15.4439629, 'Zadarska 62', 19),
	('Specijalna bolnica za produženo liječenje - Duga Resa', 45.4521991, 15.5000057, 'Jozefa Jeruzalema 7', 27),
	('Thalassotherapia Crikvenica, Specijalna bolnica za medicinsku rehabilitaciju Primorsko-goranske županije', 45.1877418, 14.6739838, 'Gajevo šetalište 1', 6),
	('Thalassotherapija Opatija - Specijalna bolnica za medicinsku rehabilitaciju bolesti srca, pluća i reumatizma', 45.329049, 14.3007085031163, 'Maršala Tita 188/1', 22);
	
--Dodavanje AccommodationType u sustav
INSERT INTO AccommodationType (TypeID, description)
	VALUES (1, 'iznajmljena kuća'),
	(2, 'iznajmljen stan'),
	(3, 'iznajmljena soba'),
	(4, 'kupljena kuća'),
	(5, 'kupljen stan');
--Dodavanje Equipped u sustav	
INSERT INTO Equipped (EquippedID, description)
	VALUES (1, 'poptuno opremljen'),
	(2, 'neopremljen'),
	(3, 'djelomično opremljen');

--Dodavanje VehicleType u sustav
INSERT INTO VehicleType (typeid, description)
	VALUES (1, 'Mini automobili'),
	(2, 'Mali automobili'),
	(3, 'Srednji automobili'),
	(4, 'Veliki automobili'),
	(5, 'Višenamjenski automobili'),
	(6, 'SUV')
	
--Izrada vjerodajnica za dodane administratore	
INSERT INTO auth.credentials(
	username, pass, userid)
	select
		left(firstname, 1) || left(lastname, 1) || right(pin::varchar,4) as username,
		left(MD5(pin::varchar), 8) as pass,
		userid
	from public.adminuser;
	
--Popunjavanje tablice ulogama u aplikaciji
INSERT INTO public.userrole(
	roleid, rolename)
	VALUES (1, 'accomodation_admin'),
	(2, 'transporter_admin'),
	(3, 'user_admin');
	
--TEST pridjeljivanja, driver query
/*
SELECT userid, roleId
FROM (
    SELECT 
        au.userid,
        r.roleId,
        ROW_NUMBER() OVER (PARTITION BY au.userid ORDER BY RANDOM()) as RowNum
    FROM adminuser au
    CROSS JOIN userrole r
) AS RandomizedRoles
WHERE RowNum = 1;
*/

--Pridjeljivanje random uloga administratorima u sustavu
INSERT INTO public.assignedrole(
	userid, roleid)
	select userid, roleId
		from (
    		select
        		au.userid,
        		ur.roleId,
        		ROW_NUMBER() OVER (PARTITION BY au.userid ORDER BY RANDOM()) as RowNum
    		from adminuser au
    cross join userrole ur
) AS randomroles
WHERE RowNum = 1;

--Dodavanje tretmana za zdravstveni turizam
INSERT INTO Treatment (treatmentname, description)
	VALUES ('Liječenje akni', 'Kreme ili lijekovi na recept mogu pomoći u smanjenju akni'),
	('Akupunktura', 'Akupunktura je praksa probadanja kože iglama u svrhu liječenja stanja poput artritisa ili bolova u leđima'),
	('Vlažna makularna degeneracija povezana sa starenjem (AMD)', 'Injekcije u oči'),
	('Vlažna makularna degeneracija povezana sa starenjem (AMD)', 'Fotodinamička terapija (PDT) – posebna svjetlost usmjerena je na makulu kako bi se uništile abnormalne krvne žile koje uzrokuju vlažni AMD'),
	('Alergije i zarazne bolesti', 'Dijagnostika i liječenje uobičajenih alergija'),
	('Alergološko testiranje', 'Jednostavni testovi za određivanje imate li alergijske reakcije'),
	('Liječenje angine', 'Koronarna angioplastika ili Operacija premosnice srca'),
	('Artroskopija gležnja', 'Kirurški zahvat'),
	('Zamjena gležnja', 'Zamjena gležnja je operacija kojom se uklanjaju bolesni i oštećeni dijelovi gležnja i nadomještaju umjetnim zglobom'),
	('Liječenje ozljeda prednjeg križnog ligamenta (ACL)', 'Rekonstrukcija ACL-a, Artroskopija koljena (kirurgija ključanice) posebna vrsta operacije rekonstrukcije ACL-a'),
	('Injekcijski tretman protiv bora', 'Sredstva za opuštanje mišića, Dermalni fileri'),
	('Estetski tretman ruku', 'Uklanjanje viška masnoće i opuštene kože'),
	('Artroskopija', 'Postupak za dijagnosticiranje i liječenje problema sa zglobovima'),
	('Operacija želučanog rukavca', 'Kirurški zahvat za smanjenje želuca'),
	('Povećanje grudi', 'Povećanje grudi pomoću različitih silikonskih ili fizioloških implantata koji odgovaraju željenom obliku i veličini'),
	('Tretmani za pretilost', 'Orlistat, operacija mršavljenja (barijatrijska) kao što je želučana premosnica ili želučani rukav'),
	('Zubni implantati', 'Zubni implantati nadomještaju zub ili zube koji su izvađeni zbog infekcije, karijesa ili nezgode'),
	('Dentalna kirurgija', 'Plombe, Sinus lift, Proteza, Izbjeljivanje, Krunice'),
	('Selektivna foto-ionska terapija', 'Trajno uklanjanje dlačica'),
	('Masažna terapija', 'Pomaže pri oblikovanju tijala te ostavlja uzdignutu i zdravu kožu'),
	('Termodniamička terapija', 'Pomaže pri oblikovanju tijala te ostavlja uzdignutu i zdravu kožu'),
	('Parodontalni tretmani', 'Liječenje bolesti desni i potpornog tkiva oko zuba'),
	('Endodoncija', 'Tretmani kanala korijena zbog spašavanja oštećenih zubiju'),
	('Kirurško uklanjanje umnjaka', 'Kirurško uklanjanje umnjaka'),
	('Detoksikacijski tretmani', 'Programi čišćenja organizma od toksina'),
	('Fitnes programi', 'Personalizirani programi vježbanja uz stručni nadzor'),
	('Nutricionističko savjetovanje', 'Individualizirane prehrambene smjernice za poboljšanje zdravlja'),
	('Spa i wellness tretmani', 'Masaže, hidroterapija, sauna za opuštanje i obnavljanje tijela'),
	('Mentalno wellness savjetovanje', 'Psihoterapijski i savjetodavni tretmani za mentalno zdravlje'),
	('Lasersko uklanjanje madeža', 'Sigurno uklanjanje neželjenih madeža'),
	('Dermatološki tretmani za pomlađivanje kože', 'Kemijski piling, mikrodermoabrazija'),
	('Tretmani za rosaceu', 'Posebni postupci za kontrolu simptoma ove kožne bolesti'),
	('Laser terapija za uklanjanje ožiljaka', 'Korištenje lasera za smanjenje vidljivosti ožiljaka'),
	('Zamjena kuka', 'Kirurška zamjena oštećenog zgloba kuka umjetnim zglobom'),
	('Zamjena koljena', 'Kirurški zahvat za zamjenu oštećenog zgloba koljena'),
	('Fizioterapija za rehabilitaciju nakon operacija', 'Programi rehabilitacije i jačanja mišića'),
	('Terapija udarnim valovima', 'Postupci za liječenje bolova u mišićima i zglobovima'),
	('Ortopedski tretmani za sportske ozljede', 'Posebne terapije za ozljede uzrokovane sportskim aktivnostima'),
	('Rinoplastika', 'Kirurška korekcija oblika nosa'),
    ('Lifting lica', 'Postupci za zatezanje i pomlađivanje kože lica'),
    ('Liposukcija', 'Uklanjanje viška masnog tkiva iz određenih dijelova tijela'),
    ('Abdominoplastika', 'Kirurško uklanjanje viška kože i masnog tkiva iz trbuha'),
    ('Blefaroplastika', 'Kirurško poboljšanje izgleda kapaka'),
    ('Dermalni fileri', 'Injekcije za popunjavanje bora i oblikovanje lica'),
    ('Botulinum toksin (Botox) tretmani', 'Za smanjenje dinamičkih bora'),
    ('Thread lifting', 'Neinvazivna metoda zatezanja kože pomoću niti'),
    ('Ginekomastija kirurgija', 'Korekcija povećanih dojki kod muškaraca'),
    ('Karboxiterapija', 'Injekcije ugljičnog dioksida za poboljšanje elastičnosti kože'),
    ('Kemijski piling', 'Uklanjanje gornjeg sloja kože radi poboljšanja teksture'),
    ('Mikrodermoabrazija', 'Mehanički piling kože radi obnavljanja'),
    ('Laser terapija za uklanjanje dlaka', 'Trajno uklanjanje dlačica'),
    ('Tretmani za akne ožiljke', 'Laserski tretmani ili dermalni fileri za popunjavanje ožiljaka'),
    ('Estetska kirurgija vrata', 'Kirurški zahvati za poboljšanje izgleda vrata i brade'),
    ('Intimna estetska kirurgija', 'Estetski zahvati na genitalnom području'),
    ('Korekcija usana', 'Povećanje ili oblikovanje usana filerima'),
    ('Tretmani za celulit', 'Različite tehnike za smanjenje izgleda celulita'),
    ('Otoplastika', 'Korekcija oblika ušiju'),
    ('Postizanje oblika tijela', 'Kirurški ili nekirurški postupci za oblikovanje tijela prema željama pacijenta')