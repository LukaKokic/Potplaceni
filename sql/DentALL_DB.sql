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

--create users and groups
CREATE ROLE app_api WITH
	NOLOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1;

GRANT app_api TO auth;

CREATE ROLE auth_api WITH
	NOLOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	INHERIT
	NOREPLICATION
	CONNECTION LIMIT -1;

GRANT auth_api TO auth;

--create schemas
CREATE SCHEMA api
    AUTHORIZATION postgres;

GRANT USAGE ON SCHEMA api TO app_api;

GRANT USAGE ON SCHEMA api TO auth_api;

GRANT ALL ON SCHEMA api TO postgres;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA api
GRANT INSERT, SELECT, UPDATE ON TABLES TO app_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA api
GRANT SELECT ON TABLES TO auth_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA api
GRANT ALL ON SEQUENCES TO app_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA api
GRANT EXECUTE ON FUNCTIONS TO app_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA api
GRANT EXECUTE ON FUNCTIONS TO auth_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA api
GRANT USAGE ON TYPES TO app_api;

CREATE SCHEMA auth
    AUTHORIZATION postgres;

GRANT USAGE ON SCHEMA auth TO app_api;

GRANT USAGE ON SCHEMA auth TO auth_api;

GRANT ALL ON SCHEMA auth TO postgres;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA auth
GRANT INSERT, SELECT, UPDATE ON TABLES TO app_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA auth
GRANT SELECT ON TABLES TO auth_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA auth
GRANT ALL ON SEQUENCES TO app_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA auth
GRANT EXECUTE ON FUNCTIONS TO app_api;

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA auth
GRANT USAGE ON TYPES TO app_api;