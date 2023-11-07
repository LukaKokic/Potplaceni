CREATE TABLE Clinic(
	ClinicID bigserial primary key,
	clinicName varchar(90),
	clinicAddress varchar (95),
	latitude decimal(8,6),
	longitude decimal(9,6),
	TownID foreign key (Town)
),

CREATE TABLE Town(
	TownID bigserial primary key,
	townName varchar(35)
),

CREATE TABLE AdminUser(
	UserID bigserial primary key,
	PIN int,
	firstname varchar(30),
	surname varchar(30),
	phone varchar(20),
	email varchar(60)
),

CREATE TABLE Credentials(
	username varchar(50),
	pass BINARY(64),
	UserID foreign key (AdminUser)
),

CREATE TABLE Patient(
	PatientID bigserial primary key,
	PIN int,
	firstname varchar(30),
	surname varchar(30),
	phone varchar(20),
	email varchar(60),
	redidenceAddress varchar(95),
	AccomodationID foreign key(Accomodation)
),

CREATE TABLE Accomodation(
	AccomodationID bigserial primary key,
	address varchar(95),
	latitude decimal(9,6),
	longitude decimal(9,6),
	active bit,
	TypeID foreign key(AccomodationType),
	EquippedID foreign key(Equipped),
	TownID foreign key(Town)
),

CREATE TABLE AccomodationType(
	TypeID smallint primary key,
	desciption text
),

CREATE TABLE Equipped(
	EquippedID smallint primary key,
	equipment text
),

CREATE TABLE AccomodationAvaliability(
	since date,
	till date,
	AccomodationID foreign key (Accomodation)
),

CREATE TABLE Transporter(
	TransporterID bigserial primary key,
	organisationName varchar(70),
	phone varchar(20),
	address varchar(95),
	active bit
),

CREATE TABLE Vehicle(
	VehicleID bigserial primary key,
	typeOf varchar(20),
	capacity smallint,
	active bit,
	TransporterID foreign key (Transporter)
),

CREATE TABLE VehicleOccupied(
	timeStart time,
	timeEnd time,
	PatientID foreign key (Patient),
	VaehicleID foreign key (Vehicle)
),

CREATE TABLE VehicleAvaliability(
	DOW smallint,
	timeStart time,
	timeEnd time,
	VehicleID foreign key (Vehicle)
)