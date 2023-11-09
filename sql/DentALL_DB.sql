CREATE TABLE Clinic( --table
	ClinicID bigserial primary key,
	clinicName varchar(90),
	latitude decimal(8,6),
	longitude decimal(9,6),
	clinicAddress varchar (95),
	foreign key (TownID) references Town(TownID)
),

CREATE TABLE clinicAccomodation( --relation
	foreign key (ClinicID) references Clinic(ClinicID),
	foreign key (AccomodationID) references Accomodation(AccomodationID)
),

CREATE TABLE clinicTransporter( --relation
	foreign key (ClinicID) references Clinic(ClinicID),
	foreign key (TransporterID) references Transporter(TransporterID)
),

CREATE TABLE Town( --table
	TownID bigserial primary key,
	townName varchar(35)
),

CREATE TABLE AdminUser( --table
	UserID bigserial primary key,
	PIN int,
	firstname varchar(30),
	lastname varchar(30),
	phone varchar(20),
	email varchar(60)
),

CREATE TABLE Credentials( --table
	username varchar(50),
	pass BINARY(64),
	foreign key (UserID) references AdminUser(UserID)
),

CREATE TABLE assignedRole( --relation
	foreign key(UserID) references AdminUser(UserID),
	foreign key(RoleID) references Role(RoleID)
),

CREATE TABLE UserRole( --table
	RoleID smallint primary key,
	roleName varchar(30)
),

CREATE TABLE Patient( --table
	PatientID bigserial primary key,
	PIN int,
	firstname varchar(30),
	lastname varchar(30),
	phone varchar(20),
	email varchar(60),
	redidenceAddress varchar(95),
),

CREATE TABLE Treatment( --table
	TreatmentID bigserial primary key,
	description text
),

CREATE TABLE assigned( --realtion
	foreign key (TreatmentID) references Treatment(TreatmentID),
	foreign key (PatientID) references Patient(PatiendID)
),

CREATE TABLE PatientPlan( --relation
	foreign key (TreatmentID) references Treatment(TreatmentID),
	foreign key	(ClinicID) references Clinic(ClinicID),
	foreign key (PatientID) references Patient(PatientID)
),

CREATE TABLE PatientPreferences( --table
	foreign key (PatientID) references Patient(PatientID),
	foreign key (TyepID) references AccomodationType(TypeID),
	foreign key (EquippedID) references Equipped(EquippedID)
),

CREATE TABLE Accomodation( --table
	AccomodationID bigserial primary key,
	foreign key (TypeID) references AccomodationType(TypeID),
	foreign key (EquippedID) references Equipped(EquippedID),
	latitude decimal(9,6),
	longitude decimal(9,6),
	address varchar(95),
	foreign key (TownID) references Town(TownID),
	active bit
),

CREATE TABLE AccomodationType( --table
	TypeID smallint primary key,
	desciption text
),

CREATE TABLE Equipped( --table
	EquippedID smallint primary key,
	description text
),

CREATE TABLE AccomodationOccupied( --table
	foreign key (PatientID) references Patient(PatientID),
	foreign key (AccomodationID) references Accomodation(AccomodationID),
	datoFrom date,
	dateTo date
),

CREATE TABLE Transporter( --table
	TransporterID bigserial primary key,
	organisationName varchar(70),
	phone varchar(20),
	address varchar(95),
	foreign key(TownID) references Town(TownID),
	active bit
),

CREATE TABLE Vehicle( --table
	VehicleID bigserial primary key,
	capacity smallint,
	foreign key (TypeID) references VehicleType(TypeID),
	foreign key (TransporterID) references Transporter(TransporterID),
	active bit	
),

CREATE TABLE VehicleType( --table
	TypeID smallint primary key,
	description text
),

CREATE TABLE VehicleOccupied( --table
	foreign key (VehicleID) references Vehicle(VehicleID),
	foreign key (PatiendID) references Patient(PatientID),
	timeStart time,
	timeEnd time
),

CREATE TABLE VehicleAvaliability( --table
	foreign key (VehicleID) references Vehicle(VehicleID),
	DOW smallint,
	timeStart time,
	timeEnd time	
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