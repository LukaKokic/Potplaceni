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
	('Klinika za psihijatriju Vrapče', 45.8168437, 15.900269, 'Bolnička cesta 32', 41),
	('Magdalena - Klinika za kardiovaskularne bolesti Med.fakulteta u Osijeku', 46.09340995, 15.8382063713707, 'Ljudevita Gaja 2', 31),
	('Opća bolnica "Dr. Ivo Pedišić Sisak"', 45.4767035828169, 16.3692756747487, 'J.J. Strossmayera 59', 30),
	('Opća bolnica "Dr. Josip Benčević" Slavonski Brod', 45.1585156, 18.0234087, 'Andrije Štampara 42', 3),
	('Opća bolnica "Dr. Tomislav Bardek" Koprivnica', 46.1633602, 16.8407022, 'Željka Selingera bb', 14),
	('Opća bolnica "Hrvatski ponos" Knin', 44.05200465, 16.2152233791619, 'Svetoslava Suronje 12', 13),
	('Opća bolnica Bjelovar', 45.9031527408774, 16.8466636699247, 'Mihanovićeva 8', 2),
	('Opća bolnica Dubrovnik', 42.6477608, 18.0759532, 'Roka Mišetića 2', 9),
	('Opća bolnica Gospić', 44.545226, 15.3726139, 'Kaniška 111', 10),
	('Opća bolnica Karlovac', 45.4768653, 15.541137, 'Andrije Štampara 3', 12),
	('Opća bolnica Ogulin', 45.2562116, 15.2341186, 'Bolnička 38', 21),
	('Opća bolnica Pula', 44.86013855, 13.8373702904261, 'Aldo Negri 6', 25),
	('Opća bolnica Šibensko-kninske županije', 43.7334808, 15.9002109, 'Stjepana Radića 83', 29),
	('Opća bolnica Varaždin', 46.3026211100715, 16.3251549950154, 'I. Meštrovića bb', 35),
	('Opća bolnica Vinkovci', 45.2886242, 18.8186984, 'Zvonarska 57', 36),
	('Opća bolnica Virovitica', 45.8020223, 17.500889, 'Ljudevita Gaja 21', 37),
	('Opća bolnica Zabok', 46.01776865, 15.9404695692508, 'Bračak 8', 39),
	('Opća bolnica Zadar', 44.1069260999999, 15.2345375204142, 'Bože Peričića 5', 40),
	('Opća županijska bolnica Našice', 45.5137843, 18.0601611, 'Bana Jelačića 10', 20),
	('Opća županijska bolnica Požega', 45.3436663, 17.6994105599533, 'Osječka 107', 23),
	('Opća županijska bolnica Vukovar', 45.3574758, 18.9957104, 'Županijska 35', 38),
	('Županijska bolnica Čakovec', 46.3943019200017, 16.4338440753624, 'I. G. Kovačića 1E', 4),
	('Biokovka specijalna bolnica za medicinsku rehabilitaciju - Makarska', 43.3021983, 17.0093983, 'Put Cvitačke 9', 18),
	('Kalos Specijalna bolnica za medicinsku rehabilitaciju Vela Luka', 42.9612713, 16.7168095, 'Obala 3 br. 3', 17),
	('Bolnica za ortopedsku kirurgiju i rehabilitaciju "Prim.dr. Martin Horvat" Rovinj', 45.09869785, 13.6363734011176, 'Ulica Luigi Monti 2', 28),
	('Dječja bolnica Srebrnjak', 45.8251291, 15.9930483, 'Srebrnjak 100', 41),
	('Neuropsihijatrijska bolnica "Dr. Ivan Barbot" Popovača', 45.5900452, 16.6738206, 'Jelengradska 1', 23),
	('Psihijatrijska bolnica "Sveti Ivan"', 45.80670985, 15.8769874785713, 'Jankomir 11', 41),
	('Psihijatrijska bolnica "Sveti Rafael" Strmac', 45.3172977, 17.3942959, 'Šumetlica 87', 5),
	('Psihijatrijska bolnica Lopača', 45.3780550855666, 14.4409633226207, 'Lopača 11', 8),
	('Psihijatrijska bolnica Rab', 44.7768332, 14.7279432, 'Kampor 224', 26),
	('Psihijatrijska bolnica Ugljan', 44.112250677138, 15.1000059999076, 'Otočkih dragovoljaca 42', 34),
	('Psihijatrijska bolnica za djecu i mladež', 45.8149159, 15.9630560411439, 'Ivana Kukuljevića 11', 41),
	('Specijalna bolnica za kronične bolesti dječje dobi Gornja Bistra', 45.91679125, 15.9042815863824, 'Bolnička 21', 1),
	('Specijalna bolnica za medicinsku rehabilitaciju "Naftalan" Ivanić Grad', 45.7079624, 16.3878311, 'Omladinska 23a', 11),
	('Specijalna bolnica za medicinsku rehabilitaciju Daruvarske Toplice', 45.5975227737725, 17.2282597903022, 'Julijev park 1', 7),
	('Specijalna bolnica za medicinsku rehabilitaciju Krapinske Toplice', 46.0932831563495, 15.837873569274, 'Gajeva 2', 31),
	('Specijalna bolnica za medicinsku rehabilitaciju Lipik', 45.4128526, 17.1623100188203, 'Marije Terezije 13', 15),
	('Specijalna bolnica za medicinsku rehabilitaciju Stubičke Toplice', 45.9777318648046, 15.935502298646, 'Park Matije Gupca 1', 32),
	('Specijalna bolnica za medicinsku rehabilitaciju Varaždinske Toplice', 46.21082495, 16.4184849336697, 'Trg Slobode 1', 33),
	('Specijalna bolnica za ortopediju Biograd na moru', 43.9489433, 15.4439629, 'Zadarska 62', 19),
	('Specijalna bolnica za plućne bolesti', 45.8295573, 15.9821747, 'Rockefellerova 3', 41),
	('Specijalna bolnica za produženo liječenje - Duga Resa', 45.4521991, 15.5000057, 'Jozefa Jeruzalema 7', 27),
	('Specijalna bolnica za zaštitu djece s neurorazvojnim i motoričkim smetnjama', 45.8191614, 15.9640656, 'Goljak 2', 41),
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