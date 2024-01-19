--Dodavanje administratora u sustav
INSERT INTO public.adminuser(
	pin, firstname, lastname, phone, email)
	VALUES ('12345678', 'Luka', 'Kokić', '+1234567890', 'luka.kokic@fer.hr'),
	('98765432', 'Ian', 'Marković', '+9876543210', 'ian.markovic@fer.hr'),
	('23456789', 'Mateo', 'Martić', '+2345678901', 'mateo.martic@fer.hr'),
	('34567890', 'Teo', 'Musa', '+3456789012', 'teo.musa@fer.hr'),
	('45678901', 'Bruno', 'Milaković', '+4567890123', 'bruno.milakovic@fer.hr'),
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
	('Biograd na moru', '23210'), 
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
	('Zagreb', '10000'),
	('Sveti Martin na Muri', '40313'),
	('Veli Lošinj', '51550'),
	('Vodice', '22211'),
	('Umag', '52470');
	
	
--Dodavanje klinika u sustav
INSERT INTO Clinic (clinicName, latitude, longitude, clinicAddress, TownID)
	VALUES ('Klinika za ortopediju Lovran', 45.2991600999999, 14.27838097141, 'Šetalište Maršala Tita 1', 16),
	('Biokovka specijalna bolnica za medicinsku rehabilitaciju - Makarska', 43.3021983, 17.0093983, 'Put Cvitačke 9', 18),
	('Kalos Specijalna bolnica za medicinsku rehabilitaciju Vela Luka', 42.9612713, 16.7168095, 'Obala 3 br. 3', 17),
	('Bolnica za ortopedsku kirurgiju i rehabilitaciju "Prim.dr. Martin Horvat" Rovinj', 45.09869785, 13.6363734011176, 'Ulica Luigi Monti 2', 28),
	('Specijalna bolnica za kronične bolesti dječje dobi Gornja Bistra', 45.91679125, 15.9042815863824, 'Bolnička 21', 1),
	('Specijalna bolnica za medicinsku rehabilitaciju "Naftalan" Ivanić Grad', 45.7079624, 16.3878311, 'Omladinska 23a', 11),
	('Specijalna bolnica za medicinsku rehabilitaciju Daruvarske Toplice', 45.5975227737725, 17.2282597903022, 'Julijev park 13', 7),
	('Specijalna bolnica za medicinsku rehabilitaciju Krapinske Toplice', 46.0932831563495, 15.837873569274, 'Gajeva 2', 31),
	('Specijalna bolnica za medicinsku rehabilitaciju Lipik', 45.4128526, 17.1623100188203, 'Marije Terezije 13', 15),
	('Specijalna bolnica za medicinsku rehabilitaciju Stubičke Toplice', 45.9777318648046, 15.935502298646, 'Park Matije Gupca 1', 32),
	('Specijalna bolnica za medicinsku rehabilitaciju Varaždinske Toplice', 46.21082495, 16.4184849336697, 'Trg Slobode 1', 33),
	('Specijalan bolnica za medicinsku rehabiliraciju Sveti Martin na Muri', 46.49478468546016, 16.3372180095144, 'Izvorska 1', 42),
	('Specijalna bolnica za ortopediju Biograd na moru', 43.9489433, 15.4439629, 'Zadarska 62', 19),
	('Specijalna bolnica za produženo liječenje - Duga Resa', 45.4521991, 15.5000057, 'Jozefa Jeruzalema 7', 27),
	('Thalassotherapia Crikvenica, Specijalna bolnica za medicinsku rehabilitaciju Primorsko-goranske županije', 45.1877418, 14.6739838, 'Gajevo šetalište 1', 6),
	('Thalassotherapija Opatija - Specijalna bolnica za medicinsku rehabilitaciju bolesti srca, pluća i reumatizma', 45.329049, 14.3007085031163, 'Maršala Tita 188/1', 22),
	('Privatna ordinacija dentalne medicine dr. Ida Sapun Bažant', 44.11221022338561, 15.240209013399271, 'Savarska ulica 11b', 40),
	('Ordinacija dentalne medicine dr. Peđa Mišljenović', 44.864619479809505, 13.85201225574788, 'Mutilska ul. 4', 25),
	('Poliklinika Ars Salutaris', 45.79523074125956, 16.00266067259073, 'Ul. Otona Župančića 16', 41),
	('Dentalna klinika Adriatic Dent', 45.08090008333597, 13.643762102804796, 'Istarska 18', 28),
	('Implant centre Martinko', 45.80586067194379, 15.922221256467198, 'Zagrebačka cesta 126', 41),
	('Lječilište Veli Lošinj', 44.517603646336894, 14.501786143985157, 'Podjavori 27', 43),
	('Dentalna poliklinika Poliklinika Smile', 45.33035889203971, 14.302000249176341, 'Ul. Maršala Tita 129', 22),
	('Specijalna bolnica Arithera', 42.65462328513299, 18.07145753853951, 'Masarykov put 1A', 9),
	('Poliklinika Aviva', 45.81265996696458, 16.014575885302925, 'Trpinjska ul. 7', 41),
	('Specijalna bolnica Sveta Katarina', 45.80939286293386, 16.00264521413848, 'Ul. kneza Branimira 71E', 41),
	('Dental Centar Dubravica', 43.764903008782575, 15.794825357087495, 'Magistrala 59', 44),
	('Energy clinic - Hotel Coral Plava Laguna', 45.460634225637286, 13.514405141119902, 'Katoro 20', 45);	
	
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
	(6, 'SUV');
	
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
	VALUES (1, 'Administrator smještaja'),
	(2, 'Administrator prijevoza'),
	(3, 'Korisnički administrator');


--Iniijalno popunjavanje tablice accommodation
INSERT INTO public.accommodation(
	realestateid, typeid, equippedid, latitude, longitude, address, townid, clinicid, active)
	VALUES ('IS-00001', 1, 3, 45.29091054182104, 14.272556522227912, 'Rezine 29', 16, 1, 1::bit),
	('IS-00002', 2, 1, 45.29400383284759, 14.274646870698282, 'Ul. 26. divizije 9-1', 16, 1, 1::bit),
	('IS-00003', 2, 1, 45.296809367155255, 14.273877027490299, 'Ul. dr. Nilo cara 13', 16, 1, 1::bit),
	('IS-00004', 5, 1, 45.29116520209938, 14.275861980524189, 'Brajdice 54', 16, 1, 1::bit),
	('IS-00005', 4, 2, 45.29313843624951, 14.269852458642179, 'Zaheji ul. 19-13', 16, 1, 0::bit),
	
	('IS-00006', 3, 1, 43.30452316537205, 17.00689946540609, 'Ul. Rosseto Degli Abruzzi', 18, 2, 1::bit),
	('IS-00007', 3, 1, 43.30452316537205, 17.00689946540609, 'Ul. Rosseto Degli Abruzzi', 18, 2, 1::bit),
	('IS-00008', 3, 1, 43.30452316537205, 17.00689946540609, 'Ul. Rosseto Degli Abruzzi', 18, 2, 1::bit),
	('IS-00009', 3, 3, 43.30452316537205, 17.00689946540609, 'Ul. Rosseto Degli Abruzzi', 18, 2, 1::bit),
	('IS-00010', 3, 1, 43.30452316537205, 17.00689946540609, 'Ul. Rosseto Degli Abruzzi', 18, 2, 1::bit),
	
	('IS-00011', 3, 1, 42.96130094618754, 16.714979330042787, 'Obala 3 3', 17, 3, 1::bit),
	('IS-00012', 1, 1, 42.956901199427634, 16.692275668106017, 'Gabrica 7', 17, 3, 1::bit),
	('IS-00013', 3, 1, 42.96130094618754, 16.714979330042787, 'Obala 3 3', 17, 3, 0::bit),
	('IS-00014', 3, 3, 42.96130094618754, 16.714979330042787, 'Obala 3 3', 17, 3, 1::bit),
	('IS-00015', 3, 1, 42.96130094618754, 16.714979330042787, 'Obala 3 3', 17, 3, 1::bit),
	
	('IS-00016', 2, 1, 45.083480652559054, 13.642659751726347, 'Ul. Vijenac Franje Glavinića 5-9', 28, 4, 1::bit),
	('IS-00017', 2, 3, 45.07849413827555, 13.648974259373478, 'Buzetska ul.', 28, 4, 1::bit),
	('IS-00018', 3, 3, 45.07353848143964, 13.645020209233014, 'Ul. Vijenac Franje Glavinića 5-9', 28, 4, 1::bit),
	('IS-00019', 2, 1, 45.083480652559054, 13.642659751726347, 'Ul. Kresinskih žrtava 9', 28, 4, 1::bit),
	('IS-00020', 3, 1, 45.08266169722993, 13.63795506231981, 'Fontera ul. 7', 28, 4, 1::bit),
	
	('IS-00021', 4, 1, 45.9149071642882, 15.903486972691049, 'Bajzećeva ul. 15-5', 1, 5, 1::bit),
	('IS-00022', 4, 2, 45.9161890699171, 15.901848461874701, 'Sljemenska ul. 20-34', 1, 5, 0::bit),
	('IS-00023', 4, 1, 45.92121192606106, 15.89977815639558, 'Kružna ul. 4', 1, 5, 1::bit),
	('IS-00024', 1, 1, 45.92226438110191, 15.895864504850653, 'Zelengaj ul. 14', 1, 5, 1::bit),
	('IS-00025', 1, 3, 45.918085267553934, 15.895458644083588, 'Zagrebačka ul. 36', 1, 5, 1::bit),
	
	('IS-00026', 3, 1, 45.706122802636195, 16.386436785683138, 'Omladinska ul.', 11, 6, 1::bit),
	('IS-00027', 3, 1, 45.706122802636195, 16.386436785683138, 'Omladinska ul.', 11, 6, 1::bit),
	('IS-00028', 1, 1, 45.70442231485897, 16.391936664323072, 'Basaričekova ul. 18', 11, 6, 1::bit),
	('IS-00029', 2, 1, 45.70692308734254, 16.394581471330564, 'Ul. kralja Petra Krešimira IV 8', 11, 6, 1::bit),
	('IS-00030', 2, 1, 45.701398254271744, 16.38855106822215, 'Poljanska ul. 8', 11, 6, 1::bit),
	
	('IS-00031', 1, 1, 45.59763813670639, 17.228214469957507, 'Julijev park 13', 7, 7, 1::bit),
	('IS-00032', 1, 1, 45.59763813670639, 17.228214469957507, 'Julijev park 13', 7, 7, 1::bit),
	('IS-00033', 1, 3, 45.59763813670639, 17.228214469957507, 'Julijev park 13', 7, 7, 1::bit),
	('IS-00034', 1, 1, 45.59763813670639, 17.228214469957507, 'Julijev park 13', 7, 7, 0::bit),
	('IS-00035', 1, 1, 45.59763813670639, 17.228214469957507, 'Julijev park 13', 7, 7, 1::bit),
	
	('IS-00036', 1, 1, 45.59763813670639, 17.228214469957507, 'Gajeva 2,49217', 31, 8, 1::bit),
	('IS-00037', 1, 1, 45.59763813670639, 17.228214469957507, 'Gajeva 2,49217', 31, 8, 1::bit),
	('IS-00038', 1, 3, 45.59763813670639, 17.228214469957507, 'Gajeva 2,49217', 31, 8, 1::bit),
	('IS-00039', 1, 1, 45.59763813670639, 17.228214469957507, 'Gajeva 2,49217', 31, 8, 1::bit),
	('IS-00040', 1, 1, 45.59763813670639, 17.228214469957507, 'Gajeva 2,49217', 31, 8, 1::bit),
	
	('IS-00041', 1, 1, 45.59763813670639, 17.228214469957507, 'Marije Terezije 13', 15, 9, 1::bit),
	('IS-00042', 1, 1, 45.59763813670639, 17.228214469957507, 'Marije Terezije 13', 15, 9, 1::bit),
	('IS-00043', 1, 3, 45.59763813670639, 17.228214469957507, 'Marije Terezije 13', 15, 9, 1::bit),
	('IS-00044', 1, 1, 45.59763813670639, 17.228214469957507, 'Marije Terezije 13', 15, 9, 1::bit),
	('IS-00045', 1, 3, 45.59763813670639, 17.228214469957507, 'Marije Terezije 13', 15, 9, 1::bit),
	
	('IS-00046', 1, 1, 45.59763813670639, 17.228214469957507, 'Park Matije Gupca 1', 32, 10, 1::bit),
	('IS-00047', 1, 1, 45.59763813670639, 17.228214469957507, 'Park Matije Gupca 1', 32, 10, 1::bit),
	('IS-00048', 1, 3, 45.59763813670639, 17.228214469957507, 'Park Matije Gupca 1', 32, 10, 1::bit),
	('IS-00049', 1, 1, 45.59763813670639, 17.228214469957507, 'Park Matije Gupca 1', 32, 10, 1::bit),
	('IS-00050', 1, 1, 45.59763813670639, 17.228214469957507, 'Park Matije Gupca 1', 32, 10, 1::bit),
	
	('IS-00051', 1, 1, 45.59763813670639, 17.228214469957507, 'Trg Slobode 1', 33, 11, 1::bit),
	('IS-00052', 1, 3, 45.59763813670639, 17.228214469957507, 'Trg Slobode 1', 33, 11, 0::bit),
	('IS-00053', 1, 3, 45.59763813670639, 17.228214469957507, 'Trg Slobode 1', 33, 11, 1::bit),
	('IS-00054', 1, 1, 45.59763813670639, 17.228214469957507, 'Trg Slobode 1', 33, 11, 1::bit),
	('IS-00055', 1, 1, 45.59763813670639, 17.228214469957507, 'Trg Slobode 1', 33, 11, 1::bit),
	
	('IS-00056', 1, 1, 45.59763813670639, 17.228214469957507, 'Izvorska 1', 42, 12, 1::bit),
	('IS-00057', 1, 1, 45.59763813670639, 17.228214469957507, 'Izvorska 1', 42, 12, 1::bit),
	('IS-00058', 1, 1, 45.59763813670639, 17.228214469957507, 'Izvorska 1', 42, 12, 1::bit),
	('IS-00059', 1, 1, 45.59763813670639, 17.228214469957507, 'Izvorska 1', 42, 12, 1::bit),
	('IS-00060', 1, 1, 45.59763813670639, 17.228214469957507, 'Izvorska 1', 42, 12, 1::bit),
	
	('IS-00061', 1, 1, 43.94513156080463, 15.447551138033218, 'Ul. Ivana Meštrovića 32', 19, 13, 1::bit),
	('IS-00062', 1, 3, 43.94513156080463, 15.447551138033218, 'Ul. Ivana Meštrovića 32', 19, 13, 1::bit),
	('IS-00063', 2, 1, 43.94776223343589, 15.454739100378806, 'Bračka ul. 17', 19, 13, 1::bit),
	('IS-00064', 2, 3, 43.93872890579131, 15.454259053097475, 'Dubrovačka ul. 49', 19, 13, 1::bit),
	('IS-00065', 2, 1, 43.94159788244405, 15.448759706183022, 'Zadarska ul. 2D', 19, 13, 1::bit),
	
	('IS-00066', 2, 1, 45.45119865272949, 15.498131354940393, 'Kasar ul. 13', 27, 14, 1::bit),
	('IS-00067', 4, 1, 45.4495086943897, 15.495597284480379, 'Ul. Andrije Palmovića 3', 27, 14, 1::bit),
	('IS-00068', 5, 1, 45.45047620659231, 15.49800281160174, 'Ul. bana Josipa Jelačića 17', 27, 14, 1::bit),
	('IS-00069', 2, 1, 45.44828511829301, 15.501936953799179, 'Jozefinska ul. 43', 27, 14, 1::bit),
	('IS-00070', 2, 3, 45.44561611752581, 15.495829951192727, 'Ul. Slavka Kolara 7', 27, 14, 1::bit),
	
	('IS-00071', 3, 1, 45.18644647573641, 14.679061090611032, 'Ul. Miroslava Krleže 24', 6, 15, 1::bit),
	('IS-00072', 3, 1, 45.18644647573641, 14.679061090611032, 'Ul. Miroslava Krleže 24', 6, 15, 1::bit),
	('IS-00073', 1, 1, 45.186770143015536, 14.67936101720734, 'Ul. Julija Klovića 35', 6, 15, 1::bit),
	('IS-00074', 1, 3, 45.18419155770093, 14.68122247024881, 'Ul. Miroslava Krleže 7', 6, 15, 1::bit),
	('IS-00075', 4, 1, 45.187560775468754, 14.677935548010876, 'Ul. Marije Styskalove 7', 6, 15, 1::bit),
	
	('IS-00076', 3, 1, 45.32916923974375, 14.299119238978495, 'Ulica dr. Maxa Josepha Örthela 19', 22, 16, 1::bit),
	('IS-00077', 3, 1, 45.32916923974375, 14.299119238978495, 'Ulica dr. Maxa Josepha Örthela 19', 22, 16, 1::bit),
	('IS-00078', 3, 1, 45.32916923974375, 14.299119238978495, 'Ulica dr. Maxa Josepha Örthela 19', 22, 16, 1::bit),
	('IS-00079', 3, 3, 45.32916923974375, 14.299119238978495, 'Ulica dr. Maxa Josepha Örthela 19', 22, 16, 1::bit),
	('IS-00080', 3, 1, 45.3280163711674, 14.298365696327531, 'Dr. M. J. Oertla 11', 22, 16, 1::bit),
	
	('IS-00081', 3, 1, 44.116400536938436, 15.236538705705815, 'Ul. bana Josipa Jelačića 4A', 40, 17, 1::bit),
	('IS-00082', 3, 1, 44.116400536938436, 15.236538705705815, 'Ul. bana Josipa Jelačića 4A', 40, 17, 1::bit),
	('IS-00083', 5, 1, 44.117324590795064, 15.257409031486937, 'Bokokotorska ul. 2', 40, 17, 1::bit),
	('IS-00084', 2, 3, 44.119428144849316, 15.255469031750549, 'Ul. Svete Marije', 40, 17, 1::bit),
	('IS-00085', 4, 1, 44.10958315588179, 15.255646427712, 'Pakoštanska ul. 12', 40, 17, 1::bit),
	
	('IS-00086', 1, 1, 44.861786676716974, 13.84792919494659, 'Ul. Dinka Vitezića 7', 25, 18, 1::bit),
	('IS-00087', 2, 3, 44.85736318543905, 13.84825066498223, 'Heiningerova ul. 60', 25, 18, 1::bit),
	('IS-00088', 2, 1, 44.863135712503706, 13.846855585851058, 'Radićeva ul. 27', 25, 18, 1::bit),
	('IS-00089', 1, 1, 44.859870633411944, 13.84539476238475, 'Ul. Ivana Mažuranića 7', 25, 18, 1::bit),
	('IS-00090', 3, 1, 44.85831421105319, 13.848517234749842, 'Nazorova ul. 68', 25, 18, 1::bit),
	
	('IS-00091', 2, 1, 45.79436084104682, 16.003397010152977, 'Ul. Janka Polića Kamova 7', 41, 19, 1::bit),
	('IS-00092', 2, 1, 45.79861047674189, 16.003274111451393, 'Murterska ul. 35', 41, 19, 1::bit),
	('IS-00093', 2, 1, 45.79281290916148, 16.0075064781345, 'Ul. Dubravka Dujšina 16', 41, 19, 1::bit),
	('IS-00094', 2, 3, 45.79333360677785, 15.997980807881031, 'Ul. Ljerke Šram 18', 41, 19, 1::bit),
	('IS-00095', 1, 1, 45.79003337453917, 16.018824782618385, 'Španovička ul. 6', 41, 19, 1::bit),
	
	('IS-00096', 2, 1, 45.08149539140665, 13.64519745966489, '35, Ul. 43. istarske divizije', 28, 20, 1::bit),
	('IS-00097', 2, 3, 45.08149539140665, 13.64519745966489, '35, Ul. 43. istarske divizije', 28, 20, 1::bit),
	('IS-00098', 2, 1, 45.08149539140665, 13.64519745966489, '35, Ul. 43. istarske divizije', 28, 20, 1::bit),
	('IS-00099', 4, 1, 45.08128653313627, 13.642119147649607, 'Ul. 43. istarske divizije 1', 28, 20, 1::bit),
	('IS-00100', 1, 1, 45.078445862897844, 13.64293806076675, 'Ul. Stjepana Radića 1', 28, 20, 1::bit),
	
	('IS-00101', 1, 1, 45.80885168044855, 15.919681614915987, 'Bunjevačka ul. 22', 41, 21, 1::bit),
	('IS-00102', 1, 3, 45.80835629774797, 15.915875818104007, 'Poljski put 17', 41, 21, 1::bit),
	('IS-00103', 4, 1, 45.807367140244565, 15.912936782883714, 'Lepavinski put 9', 41, 21, 1::bit),
	('IS-00104', 2, 1, 45.79775046371012, 15.931755165471236, 'Fruškogorska ul. 23', 41, 21, 1::bit),
	('IS-00105', 1, 1, 45.79603435202725, 15.929463829193528, 'Trebevićka ul. 15', 41, 21, 1::bit),
	
	('IS-00106', 3, 1, 44.51683743773808, 14.501613891646652, 'Podjavori 27, 51551', 43, 22, 1::bit),
	('IS-00107', 3, 1, 44.51683743773808, 14.501613891646652, 'Podjavori 27, 51551', 43, 22, 1::bit),
	('IS-00108', 3, 1, 44.51683743773808, 14.501613891646652, 'Podjavori 27, 51551', 43, 22, 1::bit),
	('IS-00109', 3, 1, 44.51683743773808, 14.501613891646652, 'Podjavori 27, 51551', 43, 22, 1::bit),
	('IS-00110', 3, 1, 44.51683743773808, 14.501613891646652, 'Podjavori 27, 51551', 43, 22, 1::bit),
	
	('IS-00111', 1, 1, 45.33102311132158, 14.29824287139044, 'Put za Plahuti 23', 22, 23, 1::bit),
	('IS-00112', 3, 1, 45.32634960760347, 14.298832964226893, 'Ul. Maršala Tita 200', 22, 23, 1::bit),
	('IS-00113', 3, 1, 45.32634960760347, 14.298832964226893, 'Ul. Maršala Tita 200', 22, 23, 1::bit),
	('IS-00114', 3, 1, 45.32634960760347, 14.298832964226893, 'Ul. Maršala Tita 200', 22, 23, 1::bit),
	('IS-00115', 3, 1, 45.32634960760347, 14.298832964226893, 'Ul. Maršala Tita 200', 22, 23, 1::bit),
	
	('IS-00116', 3, 1, 42.653223369381315, 18.07747159205682, 'Ul. Josipa Pupačića 7', 9, 24, 1::bit),
	('IS-00117', 3, 1, 42.653223369381315, 18.07747159205682, 'Ul. Josipa Pupačića 7', 9, 24, 1::bit),
	('IS-00118', 3, 1, 42.653223369381315, 18.07747159205682, 'Ul. Josipa Pupačića 7', 9, 24, 1::bit),
	('IS-00119', 2, 1, 42.65754764220067, 18.072518299773016, 'Dubravkina ul. 11', 9, 24, 1::bit),
	('IS-00120', 1, 1, 42.656603440213516, 18.07911484131339, 'Ul. Eugena Kumičića', 9, 24, 1::bit),
	
	('IS-00121', 1, 3, 45.811627791764124, 16.02097212090257, 'Šimunovićeva ul. 10', 41, 25, 1::bit),
	('IS-00122', 1, 1, 45.808608830423616, 16.019641117882408, 'Kutinska ul. 9', 41, 25, 1::bit),
	('IS-00123', 4, 1, 45.80740643473152, 16.015080597709566, 'Ščitarjevska ul. 44', 41, 25, 1::bit),
	('IS-00124', 2, 1, 45.806739704087384, 16.02264699238048, 'Zapoljska Ul. 26', 41, 25, 1::bit),
	('IS-00125', 1, 1, 45.81079240730058, 16.024126942234137, 'Ul. Janka Leskovara 28', 41, 25, 1::bit),
	
	('IS-00126', 2, 1, 45.81298576266106, 16.001714282111287, 'Ulica Ferde Rusana 12', 41, 26, 1::bit),
	('IS-00127', 2, 1, 45.81298576266106, 16.001714282111287, 'Ulica Ferde Rusana 12', 41, 26, 1::bit),
	('IS-00128', 2, 3, 45.81001918889088, 15.995459244859045, 'Ulica Natka Nodila 8', 41, 26, 1::bit),
	('IS-00129', 2, 1, 45.81066308943929, 15.999453773518313, 'Ul. Frana Vrbanića 35', 41, 26, 1::bit),
	('IS-00130', 1, 1, 45.81275803207375, 16.003964791038193, 'Ul. kralja Zvonimira 92', 41, 26, 1::bit),
	
	('IS-00131', 1, 1, 43.7616253129153, 15.79224385634226, 'Stablinac ul. 35', 44, 27, 1::bit),
	('IS-00132', 1, 1, 43.7616253129153, 15.79224385634226, 'Stablinac ul. 35', 44, 27, 1::bit),
	('IS-00133', 1, 1, 43.7616253129153, 15.79224385634226, 'Stablinac ul. 35', 44, 27, 1::bit),
	('IS-00134', 1, 3, 43.7616253129153, 15.79224385634226, 'Stablinac ul. 35', 44, 27, 1::bit),
	('IS-00135', 1, 1, 43.7616253129153, 15.79224385634226, 'Stablinac ul. 35', 44, 27, 1::bit),
	
	('IS-00136', 1, 1, 45.46064927602611, 13.514501700736666, 'Katoro 20', 45, 28, 1::bit),
	('IS-00137', 1, 1, 45.46064927602611, 13.514501700736666, 'Katoro 20', 45, 28, 1::bit),
	('IS-00138', 1, 1, 45.46064927602611, 13.514501700736666, 'Katoro 20', 45, 28, 1::bit),
	('IS-00139', 1, 1, 45.46064927602611, 13.514501700736666, 'Katoro 20', 45, 28, 1::bit),
	('IS-00140', 1, 1, 45.46064927602611, 13.514501700736666, 'Katoro 20', 45, 28, 1::bit);

--Inicijalno popunjavanja tablice transporter
INSERT INTO public.transporter(
	orgcode, organisationname, phone, email, address, townid, active)
	VALUES ('ORG-7df25d', 'Požuri polako d.o.o', '+3859157934', 'pozuripolako.zg@pp.hr', 'Ulica Vladimira Nazora 5' , 41, 1::bit),
	('ORG-30cc99', 'Bottom gear d.o.o', '+3859957846', 'bttgear@gmail.com', 'Kvaternikov trg 8', 41, 1::bit),
	('ORG-359e42', 'Brzi i oprezni d.o.o', '+3859970289', 'brziop@gmail.com', 'Grđevačka ulica 25', 41, 1::bit),
	('ORG-004997', 'Legero Transport d.o.o', '+3859823971', 'legeroTrans@zd.hr', 'Put Dikla 54', 40, 1::bit),
	('ORG-23e02f', 'Samo u prvoj d.o.o', '+3859844952', 'samoprva@yahoo.com', 'Ulica Rižanske skupštine 4', 25, 1::bit);

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
    ('Postizanje oblika tijela', 'Kirurški ili nekirurški postupci za oblikovanje tijela prema željama pacijenta');